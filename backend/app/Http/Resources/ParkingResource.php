<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ParkingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user' => UserResource::make($this->whenLoaded('user')),
            'vehicle' => VehicleResource::make($this->whenLoaded('vehicle')),
            'zone' => ZoneResource::make($this->whenLoaded('zone')),
            'start_time' => (string) $this->start_time,
            'stop_time' => (string) $this->stop_time,
            'total_price' => $this->total_price,
            'format_total_price' => number_format($this->total_price / 100, 2),
        ];
    }
}
