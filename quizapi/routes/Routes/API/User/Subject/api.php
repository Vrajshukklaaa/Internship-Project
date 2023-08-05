<?php
use App\Http\Controllers\User\SubjectController;
use Illuminate\Support\Facades\Route;

Route::get('subjectList', [SubjectController::class, 'index']);
