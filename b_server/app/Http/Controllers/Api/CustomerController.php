<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\CustomerPreference;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class CustomerController extends Controller
{
    // Register new customer
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'phone' => 'nullable|string',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Customer registered successfully',
            'user' => $user,
            'token' => $token
        ], 201);
    }

    // Login customer
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'user' => $user,
            'token' => $token
        ]);
    }

    // Google login (simplified - you'll need Google OAuth setup)
    public function googleLogin(Request $request)
    {
        $request->validate([
            'google_id' => 'required',
            'name' => 'required',
            'email' => 'required|email',
        ]);

        $user = User::where('google_id', $request->google_id)
                   ->orWhere('email', $request->email)
                   ->first();

        if (!$user) {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'google_id' => $request->google_id,
            ]);
        } else {
            $user->update(['google_id' => $request->google_id]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Google login successful',
            'user' => $user,
            'token' => $token
        ]);
    }

    // Save customer preferences for a shop
    public function savePreferences(Request $request)
    {
        $request->validate([
            'shop_id' => 'required|exists:shops,id',
            'hair_cut_style' => 'nullable|string',
            'beard_style' => 'nullable|string',
            'notes' => 'nullable|string',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $user = auth('sanctum')->user();

        $preference = CustomerPreference::updateOrCreate(
            [
                'user_id' => $user->id,
                'shop_id' => $request->shop_id
            ],
            [
                'hair_cut_style' => $request->hair_cut_style,
                'beard_style' => $request->beard_style,
                'notes' => $request->notes,
            ]
        );

        // Handle photo upload
        if ($request->hasFile('photo')) {
            // Delete old photo if exists
            if ($preference->photo_path) {
                Storage::delete($preference->photo_path);
            }

            $path = $request->file('photo')->store('customer_photos', 'public');
            $preference->update(['photo_path' => $path]);
        }

        return response()->json([
            'message' => 'Preferences saved successfully',
            'preference' => $preference
        ]);
    }

    // Get customer preferences for a shop
    public function getPreferences($shopId)
    {
        $user = auth('sanctum')->user();

        $preference = CustomerPreference::where('user_id', $user->id)
                                       ->where('shop_id', $shopId)
                                       ->first();

        return response()->json([
            'preference' => $preference
        ]);
    }

    // Get all customers for a barber (to see preferences)
    public function getShopCustomers()
    {
        $barber = auth('sanctum')->user();
        $shop = $barber->shop;

        if (!$shop) {
            return response()->json([
                'message' => 'No shop found'
            ], 404);
        }

        $customers = CustomerPreference::where('shop_id', $shop->id)
                                      ->with('user:id,name,email,phone')
                                      ->orderBy('updated_at', 'desc')
                                      ->get();

        return response()->json([
            'customers' => $customers
        ]);
    }

    // Search customers by name for barber
    public function searchCustomers(Request $request)
    {
        $request->validate([
            'search' => 'required|string|min:2',
        ]);

        $barber = auth('sanctum')->user();
        $shop = $barber->shop;

        if (!$shop) {
            return response()->json([
                'message' => 'No shop found'
            ], 404);
        }

        $customers = CustomerPreference::where('shop_id', $shop->id)
                                      ->whereHas('user', function($query) use ($request) {
                                          $query->where('name', 'like', '%' . $request->search . '%')
                                                ->orWhere('email', 'like', '%' . $request->search . '%');
                                      })
                                      ->with('user:id,name,email,phone')
                                      ->get();

        return response()->json([
            'customers' => $customers
        ]);
    }

    // Get customer profile
    public function profile()
    {
        $user = auth('sanctum')->user();
        
        return response()->json([
            'user' => $user
        ]);
    }

    // Logout customer
    public function logout()
    {
        auth('sanctum')->user()->currentAccessToken()->delete();
        
        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }
}