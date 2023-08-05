<?php
use App\Http\Controllers\QuestionOptionController;
use Illuminate\Support\Facades\Route;


Route::post('create', [QuestionOptionController::class, 'store']);

Route::get('index', [QuestionOptionController::class, 'index']);
   
Route::get('show/{id}', [QuestionOptionController::class, 'show']);

Route::put('update', [QuestionOptionController::class, 'update']);

Route::delete('delete/{id}', [QuestionOptionController::class, 'destroy']);