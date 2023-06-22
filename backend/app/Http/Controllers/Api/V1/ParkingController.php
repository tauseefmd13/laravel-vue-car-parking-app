<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Parking;
use Illuminate\Support\Carbon;
use App\Http\Controllers\Controller;
use App\Http\Resources\ParkingResource;
use App\Http\Requests\Parking\StoreParkingRequest;
use App\Http\Requests\Parking\UpdateParkingRequest;
use App\Services\ParkingService;

class ParkingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', Parking::class);

        $parkings = Parking::with('user', 'vehicle', 'zone')
            ->where('user_id', auth()->id())
            ->latest()
            ->paginate();

        return ParkingResource::collection($parkings);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreParkingRequest $request)
    {
        $this->authorize('create', Parking::class);

        $validated = $request->validated();
        $validated['user_id'] = auth()->id();
        $validated['start_time'] = Carbon::now();
        $parking = Parking::create($validated);

        $parking->load('user', 'vehicle', 'zone');

        return ParkingResource::make($parking)
            ->additional(['message' => 'Parking started successfully.']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Parking $parking)
    {
        $this->authorize('view', $parking);

        $parking->load('user', 'vehicle', 'zone');

        return ParkingResource::make($parking);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateParkingRequest $request, Parking $parking)
    {
        $this->authorize('update', $parking);

        $stop_time = Carbon::now();
        $total_price = app(ParkingService::class)->calculateTotalPrice($parking, $stop_time);

        $validated = $request->validated();
        $validated['stop_time'] = $stop_time;
        $validated['total_price'] = $total_price;
        $parking->update($validated);

        $parking->load('user', 'vehicle', 'zone');

        return ParkingResource::make($parking)
            ->additional(['message' => 'Parking stpped successfully.']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Parking $parking)
    {
        $this->authorize('delete', $parking);

        $parking->delete();

        return response()->noContent();
    }
}
