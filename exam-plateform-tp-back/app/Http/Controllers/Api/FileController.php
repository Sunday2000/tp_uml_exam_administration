<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Throwable;

class FileController extends Controller
{
    /**
     * Download a file from the specified disk.
     *
     * @return StreamedResponse|Response
     */
    public function download(Request $request)
    {
        $validated = $request->validate([
            'path' => ['required', 'string', 'max:4096'],
            'disk' => ['nullable', 'string', 'in:private,public,local,s3'],
        ]);

        $path = $validated['path'];
        $disk = $validated['disk'] ?? 'private';

        try {
            $storage = Storage::disk($disk);

            if (!$storage->exists($path)) {
                return response()->json([
                    'message' => 'File not found.',
                ], 404);
            }

            // Prevent path traversal attacks
            if (strpos(realpath($path) ?: $path, '..') !== false) {
                return response()->json([
                    'message' => 'Invalid file path.',
                ], 403);
            }

            $content = $storage->get($path);
            $mimeType = $storage->mimeType($path) ?? 'application/octet-stream';
            $filename = basename($path);

            return response($content, 200)
                ->header('Content-Type', $mimeType)
                ->header('Content-Disposition', "attachment; filename=\"{$filename}\"");
        } catch (Throwable $exception) {
            return response()->json([
                'message' => 'Error retrieving file: ' . $exception->getMessage(),
            ], 500);
        }
    }
}
