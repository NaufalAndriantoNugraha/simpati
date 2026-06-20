<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    if (Auth::check()) {
        if (Auth::user()->role === 'admin') {
            return redirect('/admin/dashboard/profile');
        }

        if (!Auth::user()->studentProfile) {
            return redirect('/fill-biodata');
        }

        return redirect('/student/dashboard/profile');
    }
    return redirect('/landing-page');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
