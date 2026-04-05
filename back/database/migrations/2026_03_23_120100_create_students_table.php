<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('code');
            $table->string('guardian_name')->nullable();
            $table->string('guardian_surname')->nullable();
            $table->string('guardian_phone')->nullable();
            $table->foreignId('exam_school_id')->constrained('exam_schools')->cascadeOnDelete();
            $table->timestamps();
            $table->softDeletes();

            $table->unique(['exam_school_id', 'code']);
            $table->unique(['exam_school_id', 'user_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
