<?php
use App\Http\Controllers\User\SubLevelController;
use Illuminate\Support\Facades\Route;

Route::get('list', [SubLevelController::class, 'index']);
Route::get('sub_level/{id}', [SubLevelController::class, 'sub_level']);