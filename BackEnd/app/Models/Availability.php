<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class availability extends Model
{
    use HasFactory;
    
    protected $fillable = ['doctor_id', 'start_at', 'end_at'];

    public function doctor() {
        return $this->belongsTo(User::class, 'doctor_id');
    }
}
