<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Availability;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PatientController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
       
    }
    private function authorizeSecretary()
    {
        $user = Auth::user();
        if (!$user || $user->role->name !== 'patient') {
            abort(403, 'Accès refusé. Vous devez être secrétaire.');
        }
    }

    // Créer un rendez-vous
    public function createAppointment(Request $request)
    {
        $this->authorizeSecretary();
        
        $request->validate([
            'doctor_id' => 'required|exists:users,id',
            'start_at' => 'required|date',
            'end_at' => 'required|date|after:start_at',
            'type' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $appointment = Appointment::create([
            'patient_id' => Auth::id(),
            'doctor_id' => $request->doctor_id,
            'start_at' => $request->start_at,
            'end_at' => $request->end_at,
            'type' => $request->type,
            'notes' => $request->notes,
            'status' => 'pending',
        ]);

        return response()->json([
            'message' => 'Rendez-vous créé avec succès',
            'appointment' => $appointment
        ], 201);
    }

    // Lister ses rendez-vous
    public function listAppointments()
    {
        $appointments = Appointment::where('patient_id', Auth::id())
            ->with(['doctor'])
            ->orderBy('start_at', 'asc')
            ->get();

        return response()->json($appointments);
    }

    // Modifier un rendez-vous
    public function updateAppointment(Request $request, $id)
    {
        $appointment = Appointment::where('patient_id', Auth::id())->findOrFail($id);

        $request->validate([
            'start_at' => 'nullable|date',
            'end_at' => 'nullable|date|after:start_at',
            'type' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $appointment->update($request->only(['start_at', 'end_at', 'type', 'notes']));

        return response()->json([
            'message' => 'Rendez-vous mis à jour',
            'appointment' => $appointment
        ]);
    }

    // Annuler un rendez-vous
    public function deleteAppointment($id)
    {
        $appointment = Appointment::where('patient_id', Auth::id())->findOrFail($id);
        $appointment->update(['status' => 'cancelled']);

        return response()->json(['message' => 'Rendez-vous annulé']);
    }

    // Lister les créneaux disponibles des médecins
    public function listAvailabilities()
    {
        $availabilities = Availability::with('doctor')
            ->where('start_at', '>', now())
            ->orderBy('start_at', 'asc')
            ->get();

        return response()->json($availabilities);
    }
}
