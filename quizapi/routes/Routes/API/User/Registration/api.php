<?php
use App\Http\Controllers\User\RegistrationController;
use Illuminate\Support\Facades\Route;


Route::post('create', [RegistrationController::class, 'store']);
