<?php

namespace App\Http\Controllers;

use App\Models\Loa;
use App\Models\Registration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoaController extends Controller
{
    function adminIndex()
    {
        $registrations = Registration::where('status', 'accepted')
            ->with(['program', 'student.studentProfile', 'loa'])
            ->get();

        return Inertia::render('admin/loa', [
            'registrations' => $registrations,
        ]);
    }

    function store(Request $request)
    {
        $request->validate([
            'registration_id' => 'required|exists:registrations,id',
            'file' => 'required|file|mimes:pdf|max:5120',
        ]);

        $registration = Registration::findOrFail($request->registration_id);

        if ($registration->loa) {
            $registration->loa->delete();
        }

        $path = $request->file('file')->store('loas', 'public');

        Loa::create([
            'registration_id' => $registration->id,
            'admin_id' => Auth::id(),
            'file' => $path,
        ]);

        return back()->with('success', 'LOA berhasil diupload.');
    }

    function destroy(Loa $loa)
    {
        $loa->delete();
        return back()->with('success', 'LOA berhasil dihapus.');
    }

    function studentIndex()
    {
        $registrations = Registration::where('student_id', Auth::id())
            ->where('status', 'accepted')
            ->with(['program', 'loa'])
            ->get();

        return Inertia::render('customer/loa', [
            'registrations' => $registrations,
        ]);
    }
}