<?php

namespace App\Traits;

use App\Models\Parking;
use Illuminate\Database\Eloquent\Relations\HasMany;

trait HasManyParkings
{
    public function parkings(): HasMany
    {
        return $this->hasMany(Parking::class);
    }
}
