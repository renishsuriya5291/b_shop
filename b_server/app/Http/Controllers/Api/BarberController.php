<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Barber;
use App\Models\Shop;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class BarberController extends Controller
{
    // Register new barber
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:barbers',
            'phone' => 'required|string',
            'password' => 'required|string|min:6',
        ]);

        $barber = Barber::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
        ]);

        $token = $barber->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Barber registered successfully',
            'barber' => $barber,
            'token' => $token
        ], 201);
    }

    // Login barber
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $barber = Barber::where('email', $request->email)->first();

        if (!$barber || !Hash::check($request->password, $barber->password)) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        $token = $barber->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'barber' => $barber,
            'token' => $token
        ]);
    }

    // Update barber busy status
    public function updateStatus(Request $request)
    {
        $request->validate([
            'is_busy' => 'required|boolean',
        ]);

        $barber = auth('sanctum')->user();
        $barber->update(['is_busy' => $request->is_busy]);

        return response()->json([
            'message' => 'Status updated successfully',
            'is_busy' => $barber->is_busy
        ]);
    }

    // Get barber profile
    public function profile()
    {
        $barber = auth('sanctum')->user();
        $shop = $barber->shop;

        return response()->json([
            'barber' => $barber,
            'shop' => $shop
        ]);
    }

    // Logout barber
    public function logout()
    {
        auth('sanctum')->user()->currentAccessToken()->delete();
        
        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }
}