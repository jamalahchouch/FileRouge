<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    // --------------------------------
    // Register par rôle
    // --------------------------------
    public function registerPatient(Request $request)
    {
        return $this->registerWithRole($request, 'patient');
    }

    public function registerDoctor(Request $request)
    {
        return $this->registerWithRole($request, 'doctor');
    }

    public function registerSecretaire(Request $request)
    {
        return $this->registerWithRole($request, 'secretaire');
    }

    public function registerAdmin(Request $request)
    {
        return $this->registerWithRole($request, 'admin');
    }

    private function registerWithRole(Request $request, string $roleName)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $role = Role::where('name', $roleName)->firstOrFail();

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => $role->id,
        ]);

        return response()->json([
            'message' => ucfirst($roleName) . ' inscrit avec succès',
            'user' => $user
        ], 201);
    }

    // --------------------------------
    // Login
    // --------------------------------
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Identifiants incorrects'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Connexion réussie',
            'user' => $user,
            'role' => $user->role->name,
            'token' => $token,
        ]);
    }

    // --------------------------------
    // Logout
    // --------------------------------
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Déconnexion réussie']);
    }

    // --------------------------------
    // Infos utilisateur connecté
    // --------------------------------
    public function me(Request $request)
    {
        return response()->json($request->user());
    }
}
