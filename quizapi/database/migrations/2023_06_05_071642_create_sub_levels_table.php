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
        Schema::create('sub_levels', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('level_id')->index();
            $table->string('title');
            $table->timestamps();

            $table->foreign('level_id')
            ->references('id')
            ->on('levels')
            ->onDelete('cascade')
            ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sub_levels');
    }
};
