<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Vehicle\StoreVehicleRequest;
use App\Http\Requests\Vehicle\UpdateVehicleRequest;
use App\Http\Resources\VehicleResource;
use App\Models\Vehicle;

class VehicleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', Vehicle::class);

        $vehicles = Vehicle::where('user_id', auth()->id())
            ->latest()
            ->get();

        return VehicleResource::collection($vehicles);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVehicleRequest $request)
    {
        $this->authorize('create', Vehicle::class);

        $validated = $request->validated();
        $validated['user_id'] = auth()->id();
        $vehicle = Vehicle::create($validated);

        return VehicleResource::make($vehicle)
            ->additional(['message' => 'Vehicle added successfully.']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Vehicle $vehicle)
    {
        $this->authorize('view', $vehicle);

        return VehicleResource::make($vehicle);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateVehicleRequest $request, Vehicle $vehicle)
    {
        $this->authorize('update', $vehicle);

        $vehicle->update($request->validated());

        return VehicleResource::make($vehicle)
            ->additional(['message' => 'Vehicle updated successfully.']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Vehicle $vehicle)
    {
        $this->authorize('delete', $vehicle);

        $vehicle->delete();

        return response()->noContent();
    }
}
