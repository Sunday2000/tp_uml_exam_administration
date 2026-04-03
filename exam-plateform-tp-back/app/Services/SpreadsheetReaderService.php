<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use RuntimeException;
use SimpleXMLElement;
use ZipArchive;

class SpreadsheetReaderService
{
    /**
     * @return array<int, array<string, string|null>>
     */
    public function readRows(UploadedFile $file): array
    {
        $extension = strtolower((string) $file->getClientOriginalExtension());

        if (in_array($extension, ['csv', 'txt'], true)) {
            return $this->readCsvRows($file->getRealPath());
        }

        if ($extension === 'xlsx') {
            return $this->readXlsxRows($file->getRealPath());
        }

        throw new RuntimeException('Unsupported file format.');
    }

    /**
     * @return array<int, array<string, string|null>>
     */
    private function readCsvRows(string $path): array
    {
        $handle = fopen($path, 'r');
        if (! $handle) {
            throw new RuntimeException('Unable to read CSV file.');
        }

        $headers = null;
        $rows = [];

        while (($line = fgetcsv($handle)) !== false) {
            if ($headers === null) {
                $headers = array_map(fn ($h) => $this->normalizeKey((string) $h), $line);
                continue;
            }

            if ($this->lineIsEmpty($line)) {
                continue;
            }

            $row = [];
            foreach ($headers as $index => $header) {
                $row[$header] = isset($line[$index]) ? trim((string) $line[$index]) : null;
            }
            $rows[] = $row;
        }

        fclose($handle);

        return $rows;
    }

    /**
     * @return array<int, array<string, string|null>>
     */
    private function readXlsxRows(string $path): array
    {
        $zip = new ZipArchive();
        if ($zip->open($path) !== true) {
            throw new RuntimeException('Unable to open XLSX file.');
        }

        try {
            $sharedStrings = $this->readSharedStrings($zip);
            $sheetXml = $zip->getFromName('xl/worksheets/sheet1.xml');

            if ($sheetXml === false) {
                throw new RuntimeException('sheet1.xml is missing in XLSX file.');
            }

            $sheet = new SimpleXMLElement($sheetXml);

            // Extract images and build mapping for rows
            $imageMap = $this->extractXlsxImages($zip);

            $rows = [];
            $headers = null;

            $rowNodes = $sheet->xpath('//*[local-name()="sheetData"]/*[local-name()="row"]') ?: [];

            foreach ($rowNodes as $rowNode) {
                $cells = [];
                $excelRowNumber = (int) ($rowNode['r'] ?? 0);
                $cellNodes = $rowNode->xpath('./*[local-name()="c"]') ?: [];

                foreach ($cellNodes as $cellNode) {
                    $cell = $this->extractXlsxCellValue($cellNode, $sharedStrings);
                    $cells[] = $cell;
                }

                if ($headers === null) {
                    $headers = array_map(fn ($h) => $this->normalizeKey((string) $h), $cells);
                    continue;
                }

                if ($this->lineIsEmpty($cells)) {
                    continue;
                }

                $row = [];
                foreach ($headers as $index => $header) {
                    $row[$header] = isset($cells[$index]) ? trim((string) $cells[$index]) : null;
                }

                // Attach profile picture path if available for this row
                if ($excelRowNumber > 0 && isset($imageMap[$excelRowNumber])) {
                    $row['profile_picture_path'] = $imageMap[$excelRowNumber];
                }

                $rows[] = $row;
            }

            return $rows;
        } finally {
            $zip->close();
        }
    }

    /**
     * @return array<int, string>
     */
    private function readSharedStrings(ZipArchive $zip): array
    {
        $xml = $zip->getFromName('xl/sharedStrings.xml');
        if ($xml === false) {
            return [];
        }

        $doc = new SimpleXMLElement($xml);

        $values = [];
        $nodes = $doc->xpath('//*[local-name()="si"]') ?: [];
        foreach ($nodes as $node) {
            $texts = $node->xpath('.//*[local-name()="t"]') ?: [];
            $value = '';
            foreach ($texts as $text) {
                $value .= (string) $text;
            }
            $values[] = $value;
        }

        return $values;
    }

    /**
     * @param array<int, string> $sharedStrings
     */
    private function extractXlsxCellValue(SimpleXMLElement $cellNode, array $sharedStrings): string
    {
        $type = (string) ($cellNode['t'] ?? '');

        if ($type === 'inlineStr') {
            $inlineTextNodes = $cellNode->xpath('./*[local-name()="is"]//*[local-name()="t"]') ?: [];
            if ($inlineTextNodes === []) {
                return '';
            }

            $inlineText = '';
            foreach ($inlineTextNodes as $node) {
                $inlineText .= (string) $node;
            }

            return $inlineText;
        }

        $valueNodes = $cellNode->xpath('./*[local-name()="v"]') ?: [];
        $value = isset($valueNodes[0]) ? (string) $valueNodes[0] : '';

        if ($type === 's' && $value !== '') {
            $index = (int) $value;
            return $sharedStrings[$index] ?? '';
        }

        if ($type === 'b') {
            return $value === '1' ? 'true' : 'false';
        }

        return $value;
    }

    /**
     * Extract images from XLSX and save them to private disk.
     * Returns mapping of row numbers to image paths.
     *
     * How it works:
     * 1. Reads drawing1.xml to find image anchors
     * 2. Maps each image to its row position
     * 3. Extracts image files from xl/media/ folder
     * 4. Saves images to private disk with UUID filenames
     * 5. Returns mapping: [rowNum => 'profiles/uuid.ext', ...]
     *
     * If extraction fails for any image, silently skips it and continues.
     *
     * @return array<int, string>
     */
    private function extractXlsxImages(ZipArchive $zip): array
    {
        $imageMap = [];

        try {
            // Get the drawing XML to find image anchors
            $drawingXml = $zip->getFromName('xl/drawings/drawing1.xml');
            if ($drawingXml === false) {
                return $imageMap;
            }

            // Read relationships once and index them by rId
            $relsXml = $zip->getFromName('xl/drawings/_rels/drawing1.xml.rels');
            if ($relsXml === false) {
                return $imageMap;
            }

            $rels = new SimpleXMLElement($relsXml);
            $relationships = [];
            $relNodes = $rels->xpath('//*[local-name()="Relationship"]') ?: [];
            foreach ($relNodes as $relNode) {
                $id = (string) ($relNode['Id'] ?? '');
                $target = (string) ($relNode['Target'] ?? '');
                if ($id !== '' && $target !== '') {
                    $relationships[$id] = $target;
                }
            }

            $drawing = new SimpleXMLElement($drawingXml);
            // Find all anchor elements that reference images
            // Both oneCellAnchor and twoCellAnchor elements can contain images
            $anchors = array_merge(
                $drawing->xpath('//*[local-name()="oneCellAnchor"]') ?: [],
                $drawing->xpath('//*[local-name()="twoCellAnchor"]') ?: []
            );

            foreach ($anchors as $anchor) {
                // Get the row number from blipFill/blip
                $blips = $anchor->xpath('.//*[local-name()="blip"]') ?: [];
                if (empty($blips)) {
                    continue;
                }

                // Get relationship ID
                $embedAttr = $blips[0]->attributes('http://schemas.openxmlformats.org/officeDocument/2006/relationships');
                $relId = (string) ($embedAttr['embed'] ?? '');
                if (!$relId) {
                    continue;
                }

                // Get row position from anchor
                $fromRow = $anchor->xpath('.//*[local-name()="from"]/*[local-name()="row"]');
                if (empty($fromRow)) {
                    continue;
                }

                // Excel uses 0-based row indexing in drawing anchors.
                // Convert it to 1-based Excel row numbers to match row@r in sheet XML.
                $rowNum = (int) ((string) $fromRow[0]) + 1;

                // Get image target from relationships
                if (!isset($relationships[$relId])) {
                    continue;
                }

                $target = $relationships[$relId];
                $imagePath = ltrim($target, '/');
                if (!str_starts_with($imagePath, 'xl/')) {
                    $imagePath = 'xl/drawings/' . $imagePath;
                }

                // Extract image from ZIP
                $imageData = $zip->getFromName($imagePath);
                if ($imageData === false) {
                    continue;
                }

                // Save image to private disk
                $extension = pathinfo($target, PATHINFO_EXTENSION) ?: 'bin';
                $filename = 'profiles/' . Str::uuid() . '.' . $extension;
                Storage::disk('private')->put($filename, $imageData);

                $imageMap[$rowNum] = $filename;
            }
        } catch (\Throwable $exception) {
            // Silently fail if image extraction encounters issues
            // The import will continue without auto-populated images
        }

        return $imageMap;
    }
    /**
     * @param array<int, mixed> $line
     */
    private function lineIsEmpty(array $line): bool
    {
        foreach ($line as $value) {
            if (trim((string) $value) !== '') {
                return false;
            }
        }

        return true;
    }

    private function normalizeKey(string $key): string
    {
        $key = trim(strtolower($key));
        $key = str_replace([' ', '-', '.'], '_', $key);

        return preg_replace('/[^a-z0-9_]/', '', $key) ?? '';
    }
}
