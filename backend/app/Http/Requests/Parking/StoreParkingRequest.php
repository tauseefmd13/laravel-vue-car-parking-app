<?php

namespace App\Http\Requests\Parking;

use App\Models\Vehicle;
use App\Models\Zone;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class StoreParkingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'vehicle_id' => ['required', Rule::exists(Vehicle::class, 'id')],
            'zone_id' => ['required', Rule::exists(Zone::class, 'id')],
            // 'start_time' => ['sometimes', 'date'],
            // 'stop_time' => ['sometimes', 'date', 'after:start_time'],
            // 'total_price' => ['sometimes', 'integer'],
        ];
    }
}
