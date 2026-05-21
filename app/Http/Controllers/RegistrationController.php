<?php

namespace App\Http\Controllers;

use App\Models\Registration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RegistrationController extends Controller
{
    function store(Request $request)
    {
        $program = \App\Models\StudyProgram::withCount('registrations')
            ->findOrFail($request->program_id);

        if ($program->registrations_count >= $program->student_quota) {
            return back()->withErrors([
                'program_id' => 'Kuota program ini sudah penuh.',
            ]);
        }

        $alreadyRegistered = Registration::where('student_id', Auth::id())
            ->where('program_id', $request->program_id)
            ->exists();

        if ($alreadyRegistered) {
            return back()->withErrors([
                'program_id' => 'Anda sudah mendaftar ke program ini.',
            ]);
        }

        Registration::create([
            'student_id' => Auth::id(),
            'program_id' => $request->program_id,
            'status' => 'pending',
        ]);

        return back()->with('success', 'Pendaftaran berhasil!');
    }
}
