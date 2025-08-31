<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shop extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'address',
        'phone', 
        'barber_id',
        'current_token'
    ];

    public function barber()
    {
        return $this->belongsTo(Barber::class);
    }

    public function tokens()
    {
        return $this->hasMany(Token::class);
    }

    public function customerPreferences()
    {
        return $this->hasMany(CustomerPreference::class);
    }
}