<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
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
            'role' => 'required',
        ]);

        try {
            $user = new User();
            $user->username = $request->username;
            $user->email = $request->email;
            $user->password = Hash::make($request->password);
            $user->role = $request->role;
            $user->save();

            return redirect()->route('/login')->with('success', 'Registration Successful');
        } catch (Exception $error) {
            return redirect()->route('/login')->with('error', $error->getMessage());
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
}
