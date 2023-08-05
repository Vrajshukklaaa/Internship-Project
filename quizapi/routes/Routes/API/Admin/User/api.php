<?php
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::post('create', [UserController::class, 'store']);
Route::get('index', [UserController::class, 'index']);
Route::get('show/{id}', [UserController::class, 'show']);
Route::put('update', [UserController::class, 'update']);
Route::delete('delete/{id}', [UserController::class, 'destroy']);
    
