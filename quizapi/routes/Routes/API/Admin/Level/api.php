<?php
use App\Http\Controllers\LevelController;
use Illuminate\Support\Facades\Route;


Route::post('create', [LevelController::class, 'store']);

Route::get('index', [LevelController::class, 'index']);
   
Route::get('show/{id}', [LevelController::class, 'show']);

Route::put('update', [LevelController::class, 'update']);

Route::delete('delete/{id}', [LevelController::class, 'destroy']);

