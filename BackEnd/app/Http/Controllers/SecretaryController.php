<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SecretaryController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    // Vérifie que l'utilisateur est secrétaire
     
    private function authorizeSecretary()
    {
        $user = Auth::user();
        if (!$user || $user->role->name !== 'secretaire') {
            abort(403, 'Accès refusé. Vous devez être secrétaire.');
        }
    }

public function createPatient(Request $request)
{
    $this->authorizeSecretary();

    $request->validate([
        'name'     => 'required|string|max:255',
        'email'    => 'required|email|unique:users,email',
        'age'      => 'required|integer|min:0',
        'phone'    => 'required|string|max:20',
        'gender'   => 'required|in:male,female',
        'password' => 'required|string|min:6',
    ]);

    // Création du patient
    $patient = \App\Models\User::create([
        'name'     => $request->name,
        'email'    => $request->email,
        'age'      => $request->age,
        'phone'    => $request->phone,
        'gender'   => $request->gender,
        'password' => \Hash::make($request->password),
        'role_id'  => 3, // rôle patient
    ]);

    return response()->json([
        'message' => 'Patient créé avec succès',
        'patient' => $patient,
    ], 201);
}

public function listDoctors()
{
    $doctors = \App\Models\User::whereHas('role', fn($q) => $q->where('name', 'doctor'))
               ->get();

    return response()->json($doctors);
}

    //  Créer un nouveau rendez-vous pour un patient et un médecin
    public function createAppointment(Request $request)
    {
        $this->authorizeSecretary();

        $request->validate([
            'patient_id' => 'required|exists:users,id',
            'doctor_id'  => 'required|exists:users,id',
            'start_at'   => 'required|date',
            'end_at'     => 'required|date|after:start_at',
            'type'       => 'nullable|string',
            'notes'      => 'nullable|string',
        ]);

        $appointment = Appointment::create([
            'patient_id' => $request->patient_id,
            'doctor_id'  => $request->doctor_id,
            'start_at'   => $request->start_at,
            'end_at'     => $request->end_at,
            'type'       => $request->type,
            'notes'      => $request->notes,
            'status'     => 'pending',
        ]);

        return response()->json([
            'message' => 'Rendez-vous créé avec succès',
            'appointment' => $appointment,
        ], 201);
    }

    // Lister tous les rendez-vous (avec filtres optionnels)
     
    public function listAppointments(Request $request)
    {
        $this->authorizeSecretary();

        $query = Appointment::with(['doctor', 'patient']);

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('doctor_id')) {
            $query->where('doctor_id', $request->doctor_id);
        }

        if ($request->has('patient_id')) {
            $query->where('patient_id', $request->patient_id);
        }

        $appointments = $query->orderBy('start_at', 'asc')->get();

        return response()->json($appointments);
    }

    //  Modifier un rendez-vouS
    public function updateAppointment(Request $request, $id)
    {
        $this->authorizeSecretary();

        $appointment = Appointment::findOrFail($id);

        $request->validate([
            'start_at' => 'nullable|date',
            'end_at'   => 'nullable|date|after:start_at',
            'status'   => 'nullable|in:pending,confirmed,cancelled,completed',
            'type'     => 'nullable|string',
            'notes'    => 'nullable|string',
        ]);

        $appointment->update($request->only(['start_at', 'end_at', 'status', 'type', 'notes']));

        return response()->json([
            'message' => 'Rendez-vous mis à jour avec succès',
            'appointment' => $appointment
        ]);
    }

    // Supprimer un rendez-vous
     
    public function deleteAppointment($id)
    {
        $this->authorizeSecretary();

        $appointment = Appointment::findOrFail($id);
        $appointment->delete();

        return response()->json(['message' => 'Rendez-vous supprimé avec succès']);
    }

    //  Statistiques simples 

    public function stats()
    {
        $this->authorizeSecretary();

        return response()->json([
            'total'     => Appointment::count(),
            'pending'   => Appointment::where('status', 'cancelled')->count(),
            'pending'   => Appointment::where('status', 'pending')->count(),
            'confirmed' => Appointment::where('status', 'confirmed')->count(),
            'completed' => Appointment::where('status', 'completed')->count(),
        ]);
    }
}
