<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\LoaController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\StudyProgramController;
use App\Http\Middleware\IsAdmin;
use App\Http\Middleware\IsStudent;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('guest')->group(function () {
    Route::get('landing-page', [AuthController::class,'landingPage']);

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
        $programs = \App\Models\StudyProgram::where('status', 'open')
            ->withCount([
                'registrations' => function ($query) {
                    $query->where('status', '!=', 'rejected');
                }
            ])
            ->get()
            ->map(function ($program) {
                $program->remaining_quota = $program->student_quota - $program->registrations_count;
                return $program;
            });

        $registeredProgramIds = \App\Models\Registration::where('student_id', Auth::id())
            ->whereIn('status', ['pending', 'accepted'])
            ->pluck('program_id')
            ->toArray();

        return Inertia::render('customer/study-programs', [
            'programs' => $programs,
            'registeredProgramIds' => $registeredProgramIds,
        ]);
    });

    Route::get('student/dashboard/programs/{id}', function ($id) {
        $program = \App\Models\StudyProgram::withCount([
            'registrations' => function ($query) {
                $query->where('status', '!=', 'rejected');
            }
        ])->findOrFail($id);

        $program->remaining_quota = $program->student_quota - $program->registrations_count;

        $isRegistered = \App\Models\Registration::where('student_id', Auth::id())
            ->where('program_id', $id)
            ->whereIn('status', ['pending', 'accepted'])
            ->exists();

        return Inertia::render('customer/program-detail', [
            'program' => $program,
            'isRegistered' => $isRegistered,
        ]);
    });

    Route::post('student/register-program', [RegistrationController::class, 'store']);

    Route::get('student/dashboard/payment', [PaymentController::class, 'index']);
    Route::post('student/dashboard/payment', [PaymentController::class, 'store']);


    Route::get('student/dashboard/contact', function () {
        return Inertia::render('customer/contact');
    });

    Route::get('student/dashboard/email-password', function () {
        return Inertia::render('customer/email-password');
    });

    Route::put('student/dashboard/email-password/email', [AuthController::class, 'updateEmail']);
    Route::put('student/dashboard/email-password/password', [AuthController::class, 'updatePassword']);

    Route::get('student/dashboard/loa', [LoaController::class, 'studentIndex']);

    Route::post('student/logout', [AuthController::class, 'studentLogout']);
    Route::delete('student/register-program/{registration}', [RegistrationController::class, 'destroy']);
});

Route::middleware(['auth', IsAdmin::class])->group(function () {
    Route::get('admin/dashboard', function () {
        return redirect('/admin/dashboard/profile');
    });

    Route::get('admin/dashboard/profile', function () {
        return Inertia::render('admin/profile', [
            'auth' => [
                'user' => [
                    'username' => Auth::user()->username,
                    'email' => Auth::user()->email,
                ]
            ]
        ]);
    });

    Route::post('admin/logout', [AuthController::class, 'adminLogout']);

    Route::get('/admin/dashboard/study-program', [StudyProgramController::class, 'index']);
    Route::post('/admin/dashboard/study-program', [StudyProgramController::class, 'store']);
    Route::put('/admin/dashboard/study-program/{studyProgram}', [StudyProgramController::class, 'update']);
    Route::delete('/admin/dashboard/study-program/{studyProgram}', [StudyProgramController::class, 'destroy']);

    Route::get('/admin/dashboard/contact', function () {
        return Inertia::render('admin/contact');
    });

    Route::get('/admin/dashboard/payment', [PaymentController::class, 'adminIndex']);
    Route::put('/admin/dashboard/payment/{payment}', [PaymentController::class, 'verify']);

    Route::get('/admin/dashboard/email-password', function () {
        return Inertia::render('admin/email-password');
    });

    Route::put('/admin/dashboard/email-password/email', [AuthController::class, 'updateEmail']);
    Route::put('/admin/dashboard/email-password/password', [AuthController::class, 'updatePassword']);

    Route::get('/admin/dashboard/loa', [LoaController::class, 'adminIndex']);
    Route::post('/admin/dashboard/loa', [LoaController::class, 'store']);
    Route::delete('/admin/dashboard/loa/{loa}', [LoaController::class, 'destroy']);
});
