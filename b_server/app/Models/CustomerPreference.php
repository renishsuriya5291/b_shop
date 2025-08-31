<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomerPreference extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'shop_id',
        'hair_cut_style',
        'beard_style', 
        'notes',
        'photo_path'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function shop()
    {
        return $this->belongsTo(Shop::class);
    }
}