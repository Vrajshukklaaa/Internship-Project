<?php
use App\Http\Controllers\SessionController;
use Illuminate\Support\Facades\Route;

Route::post('login', [SessionController::class, 'login'])
    ->name('login');

Route::middleware('auth:sanctum')
    ->post('logout',[SessionController::class, 'logout']);
