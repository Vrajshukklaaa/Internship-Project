<?php
use App\Http\Controllers\QuestionController;
use Illuminate\Support\Facades\Route;


Route::post('create', [QuestionController::class, 'store']);

Route::get('index', [QuestionController::class, 'index']);
   
Route::get('show/{id}', [QuestionController::class, 'show']);

Route::put('update', [QuestionController::class, 'update']);

Route::delete('delete/{id}', [QuestionController::class, 'destroy']);