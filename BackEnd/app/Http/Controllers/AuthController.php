<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Storage; 

class AuthController extends Controller
{
    /**
     * Enregistrement d'un patient
     */
    public function registerPatient(Request $request)
    {
        return $this->registerWithRole($request, 'patient');
    }

    /**
     * Enregistrement d'un médecin
     */
    public function registerDoctor(Request $request)
    {
        return $this->registerWithRole($request, 'doctor');
    }

    /**
     * Enregistrement d'une secrétaire
     */
    public function registerSecretaire(Request $request)
    {
        return $this->registerWithRole($request, 'secretaire');
    }
     
    /**
     * Enregistrement d'un administrateur
     */
    public function registerAdmin(Request $request)
    {
        return $this->registerWithRole($request, 'admin');
    }

    /**
     * Méthode privée pour gérer l'inscription selon le rôle
     */
    private function registerWithRole(Request $request, string $roleName)
    {
        // Validation de base
        $baseRules = [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ];

        // Champs spécifiques selon le rôle
        $extraRules = match ($roleName) {
            'doctor' => [
                'speciality' => 'nullable|string|max:255',
                'description' => 'nullable|string',
                'city' => 'nullable|string|max:255',
                'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            ],
            'patient' => [
                'phone' => 'nullable|string|max:20',
                'age' => 'nullable|integer|min:0|max:120',
                'genre' => 'nullable|string|in:male,female,other',
            ],
            default => [],
        };

        $validated = $request->validate(array_merge($baseRules, $extraRules));

        // Récupérer le rôle
        // This will throw a 404 (ModelNotFoundException) if the role doesn't exist, which is correct behavior.
        $role = Role::where('name', $roleName)->firstOrFail();

        // Préparer les données à enregistrer
        $userData = [
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role_id' => $role->id,
        ];

        // Ajout des champs spécifiques au médecin
        if ($roleName === 'doctor') {
            // Use the validated array data
            $userData['speciality'] = $validated['speciality'] ?? null;
            $userData['description'] = $validated['description'] ?? null;
            $userData['city'] = $validated['city'] ?? null;

            if ($request->hasFile('image')) {
                // Ensure the 'public' disk is configured correctly in config/filesystems.php
                $userData['image'] = $request->file('image')->store('doctors', 'public');
            }
        }

        // Ajout des champs spécifiques au patient
        if ($roleName === 'patient') {
            // Use the validated array data
            $userData['phone'] = $validated['phone'] ?? null;
            $userData['age'] = $validated['age'] ?? null;
            $userData['genre'] = $validated['genre'] ?? null;
        }

        
        $user = User::create($userData);

        return response()->json([
            'message' => ucfirst($roleName) . ' inscrit avec succès 🎉',
            'user' => $user,
        ], 201);
    }

    /**
     * 
     */
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $credentials['email'])->first();

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Email ou mot de passe incorrect.'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Connexion réussie ✅',
            'user' => $user,
            'role' => $user->role->name ?? null, // Added null coalescing for safety
            'token' => $token,
        ], 200);
    }

    /**
     * Déconnexion utilisateur
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Déconnexion réussie 👋',
        ], 200);
    }

    /**
     * Récupérer les infos du profil connecté
     */
    public function me(Request $request)
    {
        return response()->json([
            'user' => $request->user(),
        ]);
    }
}