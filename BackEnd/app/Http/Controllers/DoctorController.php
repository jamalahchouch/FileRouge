<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Models\Appointment;
use App\Models\Availability;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DoctorController extends Controller
{
    public function __construct(){
    $this->middleware('auth:sanctum')->except(['listDoctors']);
    $this->middleware('role:doctor')->except(['listDoctors']);
}
     public function listDoctors()
{
    // Récupérer tous les médecins avec toutes leurs infos
    $doctors = User::whereHas('role', function ($query) {
        $query->where('name', 'doctor');
    })->get();

    // Ajouter l'URL publique de l'image
    $doctors->transform(function ($doctor) {
        if ($doctor->image) {
            // storage/app/public/doctors/... → http://localhost:8000/storage/doctors/...
            $doctor->image = asset('storage/' . $doctor->image);
        }

        return $doctor;
    });

    return response()->json($doctors);
}
   

    //  Créer un créneau
    public function createAvailability(Request $request)
    {
        $request->validate([
            'start_at' => 'required|date',
            'end_at' => 'required|date|after:start_at',
        ]);

        $availability = Availability::create([
            'doctor_id' => Auth::id(),
            'start_at' => $request->start_at,
            'end_at' => $request->end_at,
        ]);

        return response()->json($availability, 201);
    }

    //  Modifier un créneau
    public function updateAvailability(Request $request, $id)
    {
        $availability = Availability::where('doctor_id', Auth::id())->findOrFail($id);

        $availability->update($request->only(['start_at', 'end_at']));

        return response()->json($availability);
    }

    // Supprimer un créneau
    public function deleteAvailability($id)
    {
        $availability = Availability::where('doctor_id', Auth::id())->findOrFail($id);
        $availability->delete();

        return response()->json(['message' => 'Créneau supprimé avec succès.']);
    }

    // Lister les rendez-vous du médecin
    public function listAppointments()
    {
        $appointments = Appointment::where('doctor_id', Auth::id())->orderBy('start_at', 'asc')->get();
        return response()->json($appointments);
    }

    // Modifier un rendez-vous
    public function updateAppointment(Request $request, $id)
    {
        $appointment = Appointment::where('doctor_id', Auth::id())->findOrFail($id);
        $appointment->update($request->only(['notes', 'status']));
        return response()->json($appointment);
    }

    //  Statistiques du médecin
    public function stats()
    {
        $total = Appointment::where('doctor_id', Auth::id())->count();
        $confirmed = Appointment::where('doctor_id', Auth::id())->where('status', 'confirmed')->count();
        $pending = Appointment::where('doctor_id', Auth::id())->where('status', 'pending')->count();

        return response()->json([
            'total' => $total,
            'confirmed' => $confirmed,
            'pending' => $pending,
        ]);
    }

     
}
