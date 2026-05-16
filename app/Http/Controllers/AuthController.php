<?php

namespace App\Http\Controllers;

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
}
