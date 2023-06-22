<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\ZoneController;
use App\Http\Controllers\Api\V1\ParkingController;
use App\Http\Controllers\Api\V1\ProfileController;
use App\Http\Controllers\Api\V1\VehicleController;
use App\Http\Controllers\Api\V1\ChangePasswordController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('v1')->group(function () {
    require __DIR__.'/auth.php';

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::get('profile', [ProfileController::class, 'show'])
            ->name('profile.show');
        Route::put('profile', [ProfileController::class, 'update'])
            ->name('profile.update');
        Route::put('change-password', [ChangePasswordController::class, 'update'])
            ->name('changePassword.update');

        Route::apiResource('zones', ZoneController::class)
            ->only(['index', 'show']);
        Route::apiResource('vehicles', VehicleController::class);
        Route::apiResource('parkings', ParkingController::class);
    });
});
