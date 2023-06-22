<?php

namespace App\Services;

use App\Models\Parking;

class ParkingService
{
    public function calculateTotalPrice(Parking $parking, $stop_time)
    {
        if ($parking === null) {
            return 0;
        }

        $diff_in_minutes = $stop_time->diffInMinutes($parking->start_time);
        $diff_in_hours = $diff_in_minutes / 60;
        $total_price = $parking->zone->price_per_hour * $diff_in_hours;

        return round($total_price);
    }
}
