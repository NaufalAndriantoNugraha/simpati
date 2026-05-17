<?php

namespace App\Http\Controllers;

use App\Models\StudyProgram;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class StudyProgramController extends Controller
{
    function index()
    {
        $programs = StudyProgram::all();
        return Inertia::render('admin/study-program', [
            'programs' => $programs,
        ]);
    }

    function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'student_quota' => 'required|integer',
            'price' => 'required|numeric',
            'registration_open' => 'required|date',
            'registration_close' => 'required|date|after:registration_open',
            'status' => 'required|in:draft,open,closed',
        ]);

        StudyProgram::create([
            'admin_id' => Auth::id(),
            'name' => $request->name,
            'description' => $request->description,
            'student_quota' => $request->student_quota,
            'price' => $request->price,
            'registration_open' => $request->registration_open,
            'registration_close' => $request->registration_close,
            'status' => $request->status,
        ]);

        return back()->with('success', 'Program berhasil ditambahkan.');
    }

    function update(Request $request, StudyProgram $studyProgram)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'student_quota' => 'required|integer',
            'price' => 'required|numeric',
            'registration_open' => 'required|date',
            'registration_close' => 'required|date|after:registration_open',
            'status' => 'required|in:draft,open,closed',
        ]);

        $studyProgram->update($request->all());

        return back()->with('success', 'Program berhasil diperbarui.');
    }

    function destroy(StudyProgram $studyProgram)
    {
        $studyProgram->delete();
        return back()->with('success', 'Program berhasil dihapus.');
    }
}
