<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Barber extends Authenticatable
{
    use HasApiTokens, HasFactory;

    protected $fillable = [
        'name',
        'email', 
        'phone',
        'password',
        'is_busy'
    ];

    protected $hidden = [
        'password',
    ];

    public function shop()
    {
        return $this->hasOne(Shop::class);
    }
}