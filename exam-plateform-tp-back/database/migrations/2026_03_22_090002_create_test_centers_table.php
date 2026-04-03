<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('test_centers', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('code')->unique();
            $table->double('longitude')->nullable();
            $table->double('latitude')->nullable();
            $table->string('location_indication')->nullable();
            $table->string('phone')->nullable();
            $table->string('description')->nullable();
            $table->unsignedInteger('seating_capacity')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('test_centers');
    }
};
