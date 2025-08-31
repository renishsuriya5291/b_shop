<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Shop;
use App\Models\Token;
use Illuminate\Http\Request;

class ShopController extends Controller
{
    // Create shop for barber
    public function create(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string',
            'phone' => 'required|string',
        ]);

        $barber = auth('sanctum')->user();

        // Check if barber already has a shop
        if ($barber->shop) {
            return response()->json([
                'message' => 'You already have a shop registered'
            ], 400);
        }

        $shop = Shop::create([
            'name' => $request->name,
            'address' => $request->address,
            'phone' => $request->phone,
            'barber_id' => $barber->id,
            'current_token' => 0
        ]);

        return response()->json([
            'message' => 'Shop created successfully',
            'shop' => $shop
        ], 201);
    }

    // Get all shops for users to see
    public function index()
    {
        $shops = Shop::with('barber:id,name,is_busy')->get();

        return response()->json([
            'shops' => $shops
        ]);
    }

    // Get single shop details
    public function show($id)
    {
        $shop = Shop::with(['barber:id,name,is_busy', 'tokens' => function($query) {
            $query->where('status', '!=', 'completed')
                  ->orderBy('token_number', 'asc')
                  ->with('user:id,name');
        }])->find($id);

        if (!$shop) {
            return response()->json([
                'message' => 'Shop not found'
            ], 404);
        }

        return response()->json([
            'shop' => $shop
        ]);
    }

    // Update shop details
    public function update(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string',
            'phone' => 'required|string',
        ]);

        $barber = auth('sanctum')->user();
        $shop = $barber->shop;

        if (!$shop) {
            return response()->json([
                'message' => 'No shop found'
            ], 404);
        }

        $shop->update([
            'name' => $request->name,
            'address' => $request->address,
            'phone' => $request->phone,
        ]);

        return response()->json([
            'message' => 'Shop updated successfully',
            'shop' => $shop
        ]);
    }
}