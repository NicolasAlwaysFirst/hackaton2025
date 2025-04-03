<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Statement extends Model
{
    protected $fillable = [
        'name',
        'inn',
        'filepath',
        'date',
        'adress',
        'debt',
        'passport',
        'firm'
    ];
}
