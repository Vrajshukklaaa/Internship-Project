<?php
use App\Http\Controllers\SubjectController;
use Illuminate\Support\Facades\Route;

Route::post('create', [SubjectController::class, 'store']);
    
Route::get('index', [SubjectController::class, 'index']);
   
Route::get('show/{id}', [SubjectController::class, 'show']);

Route::put('update', [SubjectController::class, 'update']);

Route::delete('delete/{id}', [SubjectController::class, 'destroy']);

// Route::middleware('auth:sanctum')
//     ->post('logout',[SessionController::class, 'logout']);
