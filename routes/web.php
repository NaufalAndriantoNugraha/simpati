<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    if (Auth::check()) {
        return redirect('dashboard');
    }
    return redirect('login');
});

// Untuk sementara dapat dikases publik,
// nanti akan diganti setelah pembuatan UI, dan back-endnya selesai.
Route::get('/fill-biodata', function () {
    return Inertia::render('fill-biodata');
});

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
