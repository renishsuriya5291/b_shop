<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\BarberController;
use App\Http\Controllers\Api\ShopController;
use App\Http\Controllers\Api\TokenController;
use App\Http\Controllers\Api\CustomerController;

// Public routes
Route::post('customer/register', [CustomerController::class, 'register']);
Route::post('customer/login', [CustomerController::class, 'login']);
Route::post('customer/google-login', [CustomerController::class, 'googleLogin']);

Route::post('barber/register', [BarberController::class, 'register']);
Route::post('barber/login', [BarberController::class, 'login']);

// Public shop routes
Route::get('shops', [ShopController::class, 'index']);
Route::get('shops/{id}', [ShopController::class, 'show']);
Route::get('shops/{shopId}/queue', [TokenController::class, 'queueStatus']);

// Protected customer routes
Route::middleware('auth:sanctum')->group(function () {
    // Customer routes
    Route::prefix('customer')->group(function () {
        Route::get('profile', [CustomerController::class, 'profile']);
        Route::post('logout', [CustomerController::class, 'logout']);
        Route::post('preferences', [CustomerController::class, 'savePreferences']);
        Route::get('preferences/{shopId}', [CustomerController::class, 'getPreferences']);
    });

    // Token routes for customers
    Route::prefix('tokens')->group(function () {
        Route::post('generate', [TokenController::class, 'generate']);
        Route::get('my-tokens', [TokenController::class, 'myTokens']);
    });
});

// Protected barber routes
Route::middleware('auth:sanctum')->group(function () {
    // Barber routes
    Route::prefix('barber')->group(function () {
        Route::get('profile', [BarberController::class, 'profile']);
        Route::post('logout', [BarberController::class, 'logout']);
        Route::post('update-status', [BarberController::class, 'updateStatus']);
        Route::get('customers', [CustomerController::class, 'getShopCustomers']);
        Route::get('customers/search', [CustomerController::class, 'searchCustomers']);
    });

    // Shop routes for barbers
    Route::prefix('shop')->group(function () {
        Route::post('create', [ShopController::class, 'create']);
        Route::post('update', [ShopController::class, 'update']);
    });

    // Token management for barbers
    Route::prefix('tokens')->group(function () {
        Route::post('call-next', [TokenController::class, 'callNext']);
    });
});