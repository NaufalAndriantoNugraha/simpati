<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StudentProfile extends Model
{
    protected $fillable = [
        'student_id',
        'full_name',
        'gender',
        'birth_date',
        'birth_place',
        'address',
        'city',
        'province',
        'phone_number',
        'institution_name',
        'major',
        'semester',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'student_id');
    }
}
