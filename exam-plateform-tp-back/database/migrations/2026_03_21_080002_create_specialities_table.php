<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('specialities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('grade_id')->constrained()->cascadeOnDelete();
            $table->foreignId('serie_id')->constrained('series')->cascadeOnDelete();
            $table->string('code')->unique();
            $table->softDeletes();
            $table->timestamps();

            $table->unique(['grade_id', 'serie_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('specialities');
    }
};