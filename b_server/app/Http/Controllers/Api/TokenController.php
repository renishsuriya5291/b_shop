<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Token;
use App\Models\Shop;
use Illuminate\Http\Request;

class TokenController extends Controller
{
    // Generate new token for user
    public function generate(Request $request)
    {
        $request->validate([
            'shop_id' => 'required|exists:shops,id',
        ]);

        $user = auth('sanctum')->user();
        $shop = Shop::find($request->shop_id);

        // Check if user already has waiting token for this shop
        $existingToken = Token::where('user_id', $user->id)
                             ->where('shop_id', $request->shop_id)
                             ->where('status', 'waiting')
                             ->first();

        if ($existingToken) {
            return response()->json([
                'message' => 'You already have a waiting token for this shop',
                'token' => $existingToken
            ], 400);
        }

        // Get next token number
        $lastToken = Token::where('shop_id', $request->shop_id)
                          ->whereDate('created_at', today())
                          ->orderBy('token_number', 'desc')
                          ->first();

        $tokenNumber = $lastToken ? $lastToken->token_number + 1 : 1;

        $token = Token::create([
            'token_number' => $tokenNumber,
            'user_id' => $user->id,
            'shop_id' => $request->shop_id,
            'status' => 'waiting'
        ]);

        return response()->json([
            'message' => 'Token generated successfully',
            'token' => $token->load('shop', 'user'),
            'queue_position' => $this->getQueuePosition($token)
        ], 201);
    }

    // Get user's active tokens
    public function myTokens()
    {
        $user = auth('sanctum')->user();
        $tokens = Token::where('user_id', $user->id)
                       ->where('status', '!=', 'completed')
                       ->with('shop')
                       ->orderBy('created_at', 'desc')
                       ->get();

        foreach ($tokens as $token) {
            $token->queue_position = $this->getQueuePosition($token);
        }

        return response()->json([
            'tokens' => $tokens
        ]);
    }

    // Barber calls next token
    public function callNext(Request $request)
    {
        $barber = auth('sanctum')->user();
        $shop = $barber->shop;

        if (!$shop) {
            return response()->json([
                'message' => 'No shop found'
            ], 404);
        }

        // Complete current token if exists
        $currentToken = Token::where('shop_id', $shop->id)
                             ->where('status', 'current')
                             ->first();

        if ($currentToken) {
            $currentToken->update([
                'status' => 'completed',
                'completed_at' => now()
            ]);
        }

        // Get next waiting token
        $nextToken = Token::where('shop_id', $shop->id)
                          ->where('status', 'waiting')
                          ->orderBy('token_number', 'asc')
                          ->first();

        if (!$nextToken) {
            return response()->json([
                'message' => 'No more tokens in queue',
                'current_token' => null
            ]);
        }

        // Set next token as current
        $nextToken->update(['status' => 'current']);
        $shop->update(['current_token' => $nextToken->token_number]);

        return response()->json([
            'message' => 'Next token called',
            'current_token' => $nextToken->load('user'),
            'queue_count' => $this->getQueueCount($shop->id)
        ]);
    }

    // Get shop queue status
    public function queueStatus($shopId)
    {
        $shop = Shop::find($shopId);
        
        if (!$shop) {
            return response()->json([
                'message' => 'Shop not found'
            ], 404);
        }

        $currentToken = Token::where('shop_id', $shopId)
                             ->where('status', 'current')
                             ->with('user:id,name')
                             ->first();

        $waitingTokens = Token::where('shop_id', $shopId)
                              ->where('status', 'waiting')
                              ->orderBy('token_number', 'asc')
                              ->with('user:id,name')
                              ->get();

        return response()->json([
            'shop' => $shop->load('barber:id,name,is_busy'),
            'current_token' => $currentToken,
            'waiting_tokens' => $waitingTokens,
            'queue_count' => $waitingTokens->count()
        ]);
    }

    // Helper function to get queue position
    private function getQueuePosition($token)
    {
        if ($token->status === 'current') {
            return 0;
        }

        return Token::where('shop_id', $token->shop_id)
                    ->where('status', 'waiting')
                    ->where('token_number', '<', $token->token_number)
                    ->count() + 1;
    }

    // Helper function to get total queue count
    private function getQueueCount($shopId)
    {
        return Token::where('shop_id', $shopId)
                    ->where('status', 'waiting')
                    ->count();
    }
}