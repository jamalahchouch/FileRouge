<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Role::insert([
        ['name' => 'admin'],
        ['name' => 'doctor'],
        ['name' => 'secretaire'],
        ['name' => 'patient'],
    ]);
    }
}
