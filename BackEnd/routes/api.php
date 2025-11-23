<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\SecretaryController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\AuthController;

// Infos utilisateur connecté (auth)
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// ------------------------
// Auth routes
// ------------------------
Route::post('/register/patient', [AuthController::class, 'registerPatient']);
Route::post('/register/doctor', [AuthController::class, 'registerDoctor']);
Route::post('/register/secretaire', [AuthController::class, 'registerSecretaire']);
Route::post('/register/admin', [AuthController::class, 'registerAdmin']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/doctors', [DoctorController::class, 'listDoctors']);

Route::post('/doctors', [DoctorController::class, 'listDoctors']);
// ------------------------
// Routes protégées (auth)
// ------------------------
Route::middleware('auth:sanctum')->group(function () {

    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/doctor/profile', function () {
    return Auth::user();
})->middleware(['auth:sanctum', 'role:doctor']);

Route::get('/availability', [DoctorController::class, 'getDoctorAvailability'])
    ->middleware('auth:sanctum');

    // Doctor routes
    Route::prefix('doctor')->group(function () {
        Route::post('/availability', [DoctorController::class, 'createAvailability']);
        Route::put('/availability/{id}', [DoctorController::class, 'updateAvailability']);
        Route::delete('/availability/{id}', [DoctorController::class, 'deleteAvailability']);
          Route::get('/availability', [DoctorController::class, 'listAvailability']);
        Route::get('/appointments', [DoctorController::class, 'listAppointments']);
        Route::put('/appointments/{id}', [DoctorController::class, 'updateAppointment']);
        Route::get('/stats', [DoctorController::class, 'stats']);
      
    });

    // Secretary routes
    Route::prefix('secretary')->group(function () {
        Route::post('/appointments', [SecretaryController::class, 'createAppointment']);
        Route::get('/appointments', [SecretaryController::class, 'listAppointments']);
        Route::put('/appointments/{id}', [SecretaryController::class, 'updateAppointment']);
        Route::delete('/appointments/{id}', [SecretaryController::class, 'deleteAppointment']);
        Route::get('/stats', [SecretaryController::class, 'stats']);
    });

    // Patient routes
    Route::prefix('patient')->group(function () {
        Route::post('/appointments', [PatientController::class, 'createAppointment']);
        Route::get('/appointments', [PatientController::class, 'listAppointments']);
        Route::put('/appointments/{id}', [PatientController::class, 'updateAppointment']);
        Route::delete('/appointments/{id}', [PatientController::class, 'deleteAppointment']);
        Route::get('/availabilities', [PatientController::class, 'listAvailabilities']);
    });

    Route::middleware('auth:sanctum')->put('/users/{id}', [AuthController::class, 'updateUser']);

    // Delete user
    Route::middleware('auth:sanctum')->delete('/users/{id}', [AuthController::class, 'deleteUser']);

});
