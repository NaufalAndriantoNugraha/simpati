<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Registration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PaymentController extends Controller
{
    function index()
    {
        $registrations = Registration::where('student_id', Auth::id())
            ->with(['program', 'payment'])
            ->get();

        return Inertia::render('customer/payment', [
            'registrations' => $registrations,
        ]);
    }

    function store(Request $request)
    {
        $request->validate([
            'registration_id' => 'required|exists:registrations,id',
            'file' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048',
        ]);

        $registration = Registration::where('id', $request->registration_id)
            ->where('student_id', Auth::id())
            ->firstOrFail();

        if ($registration->payment) {
            return back()->withErrors([
                'file' => 'Bukti pembayaran sudah pernah diupload.',
            ]);
        }

        $path = $request->file('file')->store('payments', 'public');

        Payment::create([
            'registration_id' => $registration->id,
            'file' => $path,
            'status' => 'pending',
        ]);

        return back()->with('success', 'Bukti pembayaran berhasil diupload.');
    }
}
