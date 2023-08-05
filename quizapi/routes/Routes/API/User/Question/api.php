<?php
use App\Http\Controllers\User\QuestionController;
use Illuminate\Support\Facades\Route;


Route::get('index', [QuestionController::class, 'index']);
Route::get('questionTopic/{id}', [QuestionController::class, 'question_topic']);