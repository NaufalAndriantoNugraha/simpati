<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\StudyProgramController;
use App\Http\Middleware\IsAdmin;
use App\Http\Middleware\IsStudent;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('guest')->group(function () {
    // Customer route
    Route::get('register', [AuthController::class, 'customerRegisterView']);
    Route::post('register', [AuthController::class, 'customerRegister']);

    Route::get('login', [AuthController::class, 'customerLoginView']);
    Route::post('login', [AuthController::class, 'customerLogin']);

    Route::get('forgot-password', [AuthController::class, 'forgotPasswordView']);

    // Admin route
    Route::get('admin', function () {
        return redirect('/admin/login');
    });

    Route::get('admin/register', [AuthController::class, 'adminRegisterView']);
    Route::post('admin/register', [AuthController::class, 'adminRegister']);

    Route::get('admin/login', [AuthController::class, 'adminLoginView']);
    Route::post('admin/login', [AuthController::class, 'adminLogin']);
});

Route::middleware(['auth', IsStudent::class])->group(function () {
    Route::get('fill-biodata', function () {
        return Inertia::render('customer/fill-biodata');
    });
    Route::post('fill-biodata', [AuthController::class, 'fillBiodata']);

    Route::get('student/dashboard', function () {
        return redirect('/student/dashboard/profile');
    });

    Route::get('student/dashboard/profile', function () {
        return Inertia::render('customer/profile', [
            'profile' => Auth::user()->studentProfile,
        ]);
    });

    Route::get('student/dashboard/programs', function () {
        $programs = \App\Models\StudyProgram::where('status', 'open')->get();
        return Inertia::render('customer/study-programs', [
            'programs' => $programs,
        ]);
    });

    Route::post('student/logout', [AuthController::class, 'studentLogout']);
});

Route::middleware(['auth', IsAdmin::class])->group(function () {
    Route::get('admin/dashboard', function () {
        return redirect('/admin/dashboard/profile');
    });

    Route::get('admin/dashboard/profile', function () {
        return Inertia::render('admin/profile');
    });

    Route::post('admin/logout', [AuthController::class, 'adminLogout']);

    Route::get('/admin/dashboard/study-program', [StudyProgramController::class, 'index']);
    Route::post('/admin/dashboard/study-program', [StudyProgramController::class, 'store']);
    Route::put('/admin/dashboard/study-program/{studyProgram}', [StudyProgramController::class, 'update']);
    Route::delete('/admin/dashboard/study-program/{studyProgram}', [StudyProgramController::class, 'destroy']);

    Route::get('/admin/dashboard/contact', function () {
        return Inertia::render('admin/contact');
    });
});
