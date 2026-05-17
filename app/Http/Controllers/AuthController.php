<?php

namespace App\Http\Controllers;

use App\Models\StudentProfile;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AuthController extends Controller
{
    function customerRegisterView()
    {
        return Inertia::render('customer/register');
    }

    function customerRegister(Request $request)
    {
        $request->validate([
            'username' => 'required|min:6|max:30',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6|max:30',
        ]);

        try {
            $user = new User();
            $user->username = $request->username;
            $user->email = $request->email;
            $user->password = Hash::make($request->password);
            $user->role = 'student';
            $user->save();

            return redirect('/login')->with('success', 'Registration Successful');
        } catch (Exception $error) {
            return redirect('/login')->with('error', $error->getMessage());
        }
    }

    function customerLoginView()
    {
        return Inertia::render('customer/login');
    }

    function customerLogin(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($request->only('email', 'password'))) {
            if (Auth::user()->role === 'admin') {
                Auth::logout();
                return back()->withErrors([
                    'email' => 'Silahkan login melalui halaman admin.',
                ]);
            }

            $request->session()->regenerate();

            if (!Auth::user()->studentProfile) {
                return redirect('/fill-biodata');
            }

            return redirect('/student/dashboard/profile');
        }

        return back()->withErrors([
            'email' => 'Email atau password salah.',
        ]);
    }

    function forgotPasswordView()
    {
        return Inertia::render('customer/forgot-password');
    }

    function adminRegisterView()
    {
        return Inertia::render('admin/register');
    }

    function adminRegister(Request $request)
    {
        $request->validate([
            'username' => 'required|min:6|max:30',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6|max:30',
        ]);

        $user = new User();
        $user->username = $request->username;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->role = 'admin';
        $user->save();

        return redirect('/admin/login')->with('success', 'Registration Successful');
    }

    function adminLoginView()
    {
        return Inertia::render('admin/login');
    }

    function adminLogin(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($request->only('email', 'password'))) {
            if (Auth::user()->role !== 'admin') {
                Auth::logout();
                return back()->withErrors([
                    'email' => 'Akun ini bukan akun admin.',
                ]);
            }

            $request->session()->regenerate();
            return redirect('/admin/dashboard');
        }

        return back()->withErrors([
            'email' => 'Email atau password salah.',
        ]);
    }

    function adminLogout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/admin/login');
    }

    function fillBiodata(Request $request)
    {
        $request->validate([
            'full_name' => 'required',
            'gender' => 'required|in:male,female',
            'birth_date' => 'required|date',
            'birth_place' => 'required',
            'address' => 'required',
            'city' => 'required',
            'province' => 'required',
            'phone_number' => 'required',
            'institution_name' => 'required',
            'major' => 'required',
            'semester' => 'required|integer',
        ]);

        StudentProfile::create([
            'student_id' => Auth::id(),
            'full_name' => $request->full_name,
            'gender' => $request->gender,
            'birth_date' => $request->birth_date,
            'birth_place' => $request->birth_place,
            'address' => $request->address,
            'city' => $request->city,
            'province' => $request->province,
            'phone_number' => $request->phone_number,
            'institution_name' => $request->institution_name,
            'major' => $request->major,
            'semester' => $request->semester,
        ]);

        return redirect('/student/dashboard/profile');
    }

    function studentLogout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/login');
    }
}
