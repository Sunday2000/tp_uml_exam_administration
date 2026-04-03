<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('candidate_subjects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('candidate_id')->constrained()->cascadeOnDelete();
            $table->foreignId('speciality_subject_id')->constrained()->cascadeOnDelete();
            $table->double('exam_grade')->nullable();
            $table->boolean('absent')->default(false);
            $table->json('speciality_subject')->nullable();
            $table->timestamps();

            $table->unique(['candidate_id', 'speciality_subject_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('candidate_subjects');
    }
};
