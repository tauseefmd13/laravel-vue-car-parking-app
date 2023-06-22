<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\ZoneResource;
use App\Models\Zone;

class ZoneController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ZoneResource::collection(Zone::all());
    }

    /**
     * Display the specified resource.
     */
    public function show(Zone $zone)
    {
        return ZoneResource::make($zone);
    }
}
