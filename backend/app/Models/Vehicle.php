<?php

namespace App\Models;

use App\Traits\BelongsToUser;
use App\Traits\HasManyParkings;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    use HasFactory, HasManyParkings, BelongsToUser;

    protected $fillable = ['user_id', 'plate_number'];
}
