<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('study_programs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('admin_id')->constrained('users')->onDelete('cascade');
            $table->string('name');
            $table->text('description');
            $table->integer('student_quota');
            $table->decimal('price', 10, 2);
            $table->date('registration_open');
            $table->date('registration_close');
            $table->enum('status', ['draft', 'open', 'closed'])->default('draft');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('study_programs');
    }
};
