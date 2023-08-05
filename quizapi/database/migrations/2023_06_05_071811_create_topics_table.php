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
        Schema::create('topics', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('subject_id')->index();
            $table->unsignedBigInteger('level_id')->index();
            $table->unsignedBigInteger('sublevel_id')->index();
            $table->string('title');
            $table->timestamps();

            $table->foreign('subject_id')
            ->references('id')
            ->on('subjects')
            ->onDelete('cascade')
            ->onUpdate('cascade');

            $table->foreign('level_id')
            ->references('id')
            ->on('levels')
            ->onDelete('cascade')
            ->onUpdate('cascade');

            $table->foreign('sublevel_id')
            ->references('id')
            ->on('sub_levels')
            ->onDelete('cascade')
            ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('topics');
    }
};
