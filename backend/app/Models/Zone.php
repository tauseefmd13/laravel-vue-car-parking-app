<?php

namespace App\Models;

use App\Traits\HasManyParkings;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Zone extends Model
{
    use HasFactory, HasManyParkings;

    protected $fillable = ['name', 'price_per_hour'];
}
