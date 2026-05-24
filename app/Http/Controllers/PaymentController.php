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

        $path = $request->file('file')->store('payments', 'public');

        if ($registration->payment) {
            // Update payment yang sudah ada
            $registration->payment->update([
                'file' => $path,
                'status' => 'pending',
                'admin_id' => null,
            ]);
        } else {
            Payment::create([
                'registration_id' => $registration->id,
                'file' => $path,
                'status' => 'pending',
            ]);
        }

        // Reset status registrasi ke pending
        $registration->update(['status' => 'pending']);

        return back()->with('success', 'Bukti pembayaran berhasil diupload.');
    }

    function adminIndex()
    {
        $payments = Payment::with(['registration.program', 'registration.student.studentProfile'])
            ->get();

        return Inertia::render('admin/payment', [
            'payments' => $payments,
        ]);
    }

    function verify(Request $request, Payment $payment)
    {
        $request->validate([
            'status' => 'required|in:accepted,rejected',
        ]);

        $payment->update([
            'status' => $request->status,
            'admin_id' => Auth::id(),
        ]);

        if ($request->status === 'accepted') {
            $payment->registration->update([
                'status' => 'accepted',
                'admin_id' => Auth::id(),
            ]);
        } elseif ($request->status === 'rejected') {
            $payment->registration->update([
                'status' => 'rejected',
                'admin_id' => Auth::id(),
            ]);
        }

        return back()->with('success', 'Status pembayaran berhasil diperbarui.');
    }
}
