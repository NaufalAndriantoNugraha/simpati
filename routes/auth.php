<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('guest')->group(function () {
    // Customer route
    Route::get('register', [AuthController::class, 'customerRegisterView']);
    Route::post('register', [AuthController::class, 'customerRegister']);

    Route::get('login', [AuthController::class, 'customerLoginView']);
    Route::post('login', [AuthController::class, 'customerLogin']);

    Route::get('forgot-password', [AuthController::class, 'forgotPasswordView']);

    // Untuk sementara dapat dikases publik,
    // nanti akan diganti setelah pembuatan UI, dan back-endnya selesai.
    Route::get('fill-biodata', function () {
        return Inertia::render('customer/fill-biodata');
    });

    // Admin route
    Route::get('admin/register', [AuthController::class, 'adminRegisterView']);
    Route::post('admin/register', [AuthController::class, 'adminRegister']);
});

Route::middleware('auth')->group(function () {
});
