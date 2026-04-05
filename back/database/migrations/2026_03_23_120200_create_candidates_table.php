<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('candidates', function (Blueprint $table) {
            $table->id();
            $table->string('matricule')->unique();
            $table->foreignId('test_center_id')->nullable()->constrained('test_centers')->nullOnDelete();
            $table->foreignId('speciality_id')->constrained()->cascadeOnDelete();
            $table->double('exam_average')->nullable();
            $table->foreignId('jury_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('deliberation')->nullable();
            $table->dateTime('deliberation_date')->nullable();
            $table->string('table_number')->nullable();
            $table->string('deliberation_status')->nullable();
            $table->string('mention')->nullable();
            $table->foreignId('student_id')->unique()->constrained('students')->cascadeOnDelete();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('candidates');
    }
};
