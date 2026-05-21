<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StudyProgram extends Model
{
    protected $fillable = [
        'admin_id',
        'name',
        'description',
        'student_quota',
        'price',
        'registration_open',
        'registration_close',
        'status',
    ];

    public function admin(): BelongsTo
    {
        return $this->belongsTo(User::class, 'admin_id');
    }

    public function registrations()
    {
        return $this->hasMany(Registration::class, 'program_id');
    }
}
