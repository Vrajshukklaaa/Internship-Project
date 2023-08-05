<?php
use App\Http\Controllers\User\LevelController;
use Illuminate\Support\Facades\Route;

Route::get('levelList', [LevelController::class, 'index']);
Route::get('subjectLevel/{id}', [LevelController::class, 'subject_level']);