<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id',
        'speciality',
        'description',
        'city',
        'image',
        'phone',
        'age',
        'gender', 
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];
    public function role()
    {
        return $this->belongsTo(Role::class);
    }
    public function appointmentsAsPatient()
{
    return $this->hasMany(Appointment::class, 'patient_id');
}

public function appointmentsAsDoctor()
{
    return $this->hasMany(Appointment::class, 'doctor_id');
}

public function availabilities()
{
    return $this->hasMany(Availability::class, 'doctor_id');
}
}
