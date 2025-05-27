<?php

use App\Http\Controllers\ArchiveController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::get('/user', [AuthController::class, 'user']);

Route::middleware(['auth:sanctum'])->group(function () {
    
    // Admin - semua akses
    Route::middleware('role:admin')->group(function () {
        Route::apiResource('users', UserController::class);
        Route::apiResource('categories', CategoryController::class);
        Route::delete('/archives/{id}', [ArchiveController::class, 'destroy']);
    });

    // Pengguna - hanya Create, Read, Update untuk categories, archives, dashboard
    Route::middleware('role:pengguna,admin')->group(function () {
        Route::get('/archives', [ArchiveController::class, 'index']);
        Route::get('/archives/{id}', [ArchiveController::class, 'show']);
        Route::post('/archives', [ArchiveController::class, 'store']);
        Route::put('/archives/{id}', [ArchiveController::class, 'update']);

        Route::get('/dashboard', [DashboardController::class, 'index']);
    });
});