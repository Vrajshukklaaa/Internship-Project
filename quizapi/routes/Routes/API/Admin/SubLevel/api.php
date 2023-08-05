<?php
use App\Http\Controllers\SubLevelController;
use Illuminate\Support\Facades\Route;


Route::post('create', [SubLevelController::class, 'store']);

Route::get('index', [SubLevelController::class, 'index']);
   
Route::get('show/{id}', [SubLevelController::class, 'show']);
// Route::get('showlevel/{id}', [SubLevelController::class, 'showlevel']);

Route::put('update', [SubLevelController::class, 'update']);

Route::delete('delete/{id}', [SubLevelController::class, 'destroy']);

