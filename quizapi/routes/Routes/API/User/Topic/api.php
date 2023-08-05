<?php
use App\Http\Controllers\User\TopicController;
use Illuminate\Support\Facades\Route;


Route::get('index', [TopicController::class, 'index']);
Route::get('subjectTopic/{id}', [TopicController::class, 'subject_topic']);
Route::get('levelTopic/{id}', [TopicController::class, 'level_topic']);