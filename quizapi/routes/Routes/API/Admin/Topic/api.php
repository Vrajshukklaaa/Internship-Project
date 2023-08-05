<?php
use App\Http\Controllers\TopicController;
use Illuminate\Support\Facades\Route;


Route::post('create', [TopicController::class, 'store']);

Route::get('index', [TopicController::class, 'index']);
   
Route::get('show/{id}', [TopicController::class, 'show']);

Route::put('update', [TopicController::class, 'update']);

Route::delete('delete/{id}', [TopicController::class, 'destroy']);

