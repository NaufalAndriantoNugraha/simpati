<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('guest')->group(function () {
    Route::get('register', [AuthController::class, 'customerRegisterView']);
    Route::post('register', [AuthController::class, 'customerRegister']);

    Route::get('login', [AuthController::class, 'customerLoginView']);
    Route::post('login', [AuthController::class, 'customerLogin']);

    Route::get('forgot-password', [AuthController::class, 'forgotPasswordView']);
});

Route::middleware('auth')->group(function () {
    Route::get('fill-biodata', function () {
        return Inertia::render('customer/fill-biodata');
    });
});
