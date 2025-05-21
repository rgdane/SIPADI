<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Email atau password salah'], 401);
        }

        Auth::login($user); // login via cookie
        return response()->json(['message' => 'Login berhasil', 'user' => $user]);
    }

    public function logout(Request $request)
    {
        Auth::logout(); // untuk cookie-based login
        return response()->json(['message' => 'Logout berhasil']);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}
