<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // ── Admin ────────────────────────────────────────────────────
        $adminId = DB::table('users')->insertGetId([
            'username'   => 'admin',
            'email'      => 'admin@simpati.com',
            'password'   => Hash::make('admin123'),
            'role'       => 'admin',
            'created_at' => now()->subMonths(6),
            'updated_at' => now()->subMonths(6),
        ]);

        // ── Study Programs ───────────────────────────────────────────
        $programs = [
            [
                'name'               => 'Data Science & Machine Learning',
                'description'        => 'Program intensif belajar analisis data, statistik, dan machine learning menggunakan Python dan tools modern.',
                'student_quota'      => 30,
                'price'              => 2500000,
                'registration_open'  => '2026-06-01',
                'registration_close' => '2026-06-30',
                'status'             => 'open',
            ],
            [
                'name'               => 'Full Stack Web Development',
                'description'        => 'Belajar pengembangan web dari frontend hingga backend menggunakan React, Laravel, dan database modern.',
                'student_quota'      => 25,
                'price'              => 2000000,
                'registration_open'  => '2026-06-01',
                'registration_close' => '2026-06-25',
                'status'             => 'open',
            ],
            [
                'name'               => 'UI/UX Design Fundamentals',
                'description'        => 'Kuasai desain antarmuka dan pengalaman pengguna menggunakan Figma, riset pengguna, dan prinsip desain.',
                'student_quota'      => 20,
                'price'              => 1750000,
                'registration_open'  => '2026-05-01',
                'registration_close' => '2026-05-31',
                'status'             => 'closed',
            ],
            [
                'name'               => 'Cyber Security Essentials',
                'description'        => 'Pengenalan keamanan siber, ethical hacking, dan perlindungan sistem informasi secara menyeluruh.',
                'student_quota'      => 15,
                'price'              => 3000000,
                'registration_open'  => '2026-07-01',
                'registration_close' => '2026-07-31',
                'status'             => 'draft',
            ],
            [
                'name'               => 'Mobile App Development (Flutter)',
                'description'        => 'Membangun aplikasi mobile lintas platform dengan Flutter dan Dart, dari desain hingga publikasi.',
                'student_quota'      => 20,
                'price'              => 2250000,
                'registration_open'  => '2026-06-15',
                'registration_close' => '2026-07-15',
                'status'             => 'open',
            ],
        ];

        $programIds = [];
        foreach ($programs as $program) {
            $programIds[] = DB::table('study_programs')->insertGetId(array_merge($program, [
                'admin_id'   => $adminId,
                'created_at' => now()->subMonths(2),
                'updated_at' => now()->subMonths(2),
            ]));
        }

        // ── Students ─────────────────────────────────────────────────
        $students = [
            ['username' => 'budi_santoso',    'email' => 'budi@student.com',    'full_name' => 'Budi Santoso',           'gender' => 'male',   'city' => 'Surabaya',   'institution' => 'Universitas Airlangga',    'major' => 'Teknik Informatika',    'semester' => 5],
            ['username' => 'siti_rahayu',     'email' => 'siti@student.com',    'full_name' => 'Siti Rahayu',            'gender' => 'female', 'city' => 'Bandung',    'institution' => 'Universitas Padjadjaran',  'major' => 'Sistem Informasi',      'semester' => 4],
            ['username' => 'andi_pratama',    'email' => 'andi@student.com',    'full_name' => 'Andi Pratama',           'gender' => 'male',   'city' => 'Jakarta',    'institution' => 'Universitas Indonesia',    'major' => 'Ilmu Komputer',         'semester' => 6],
            ['username' => 'dewi_lestari',    'email' => 'dewi@student.com',    'full_name' => 'Dewi Lestari',           'gender' => 'female', 'city' => 'Yogyakarta', 'institution' => 'Universitas Gadjah Mada',  'major' => 'Matematika',            'semester' => 5],
            ['username' => 'reza_firmansyah', 'email' => 'reza@student.com',    'full_name' => 'Reza Firmansyah',        'gender' => 'male',   'city' => 'Malang',     'institution' => 'Universitas Brawijaya',    'major' => 'Teknik Elektro',        'semester' => 3],
            ['username' => 'nur_azizah',      'email' => 'nur@student.com',     'full_name' => 'Nur Azizah',             'gender' => 'female', 'city' => 'Semarang',   'institution' => 'Universitas Diponegoro',   'major' => 'Statistika',            'semester' => 4],
            ['username' => 'fajar_hidayat',   'email' => 'fajar@student.com',   'full_name' => 'Fajar Hidayat',          'gender' => 'male',   'city' => 'Medan',      'institution' => 'Universitas Sumatera Utara','major' => 'Teknik Komputer',      'semester' => 6],
            ['username' => 'maya_putri',      'email' => 'maya@student.com',    'full_name' => 'Maya Putri Andini',      'gender' => 'female', 'city' => 'Makassar',   'institution' => 'Universitas Hasanuddin',   'major' => 'Desain Komunikasi Visual','semester' => 3],
            ['username' => 'ilham_nugraha',   'email' => 'ilham@student.com',   'full_name' => 'Ilham Nugraha',          'gender' => 'male',   'city' => 'Bogor',      'institution' => 'Institut Pertanian Bogor', 'major' => 'Teknologi Informasi',   'semester' => 5],
            ['username' => 'ratna_sari',      'email' => 'ratna@student.com',   'full_name' => 'Ratna Sari Dewi',        'gender' => 'female', 'city' => 'Solo',       'institution' => 'Universitas Sebelas Maret','major' => 'Manajemen Informatika', 'semester' => 4],
            ['username' => 'dimas_arya',      'email' => 'dimas@student.com',   'full_name' => 'Dimas Arya Wibowo',      'gender' => 'male',   'city' => 'Depok',      'institution' => 'Universitas Gunadarma',    'major' => 'Teknik Informatika',    'semester' => 7],
            ['username' => 'fitri_amalia',    'email' => 'fitri@student.com',   'full_name' => 'Fitri Amalia Putri',     'gender' => 'female', 'city' => 'Bekasi',     'institution' => 'Universitas Mercu Buana',  'major' => 'Sistem Informasi',      'semester' => 5],
        ];

        $studentIds = [];
        $provinces = ['Jawa Timur', 'Jawa Barat', 'DKI Jakarta', 'DI Yogyakarta', 'Jawa Timur', 'Jawa Tengah', 'Sumatera Utara', 'Sulawesi Selatan', 'Jawa Barat', 'Jawa Tengah', 'Jawa Barat', 'Jawa Barat'];
        $phones = ['081234567890', '082345678901', '083456789012', '084567890123', '085678901234', '086789012345', '087890123456', '088901234567', '089012345678', '081123456789', '082234567890', '083345678901'];

        foreach ($students as $i => $s) {
            $uid = DB::table('users')->insertGetId([
                'username'   => $s['username'],
                'email'      => $s['email'],
                'password'   => Hash::make('password'),
                'role'       => 'student',
                'created_at' => now()->subDays(rand(30, 90)),
                'updated_at' => now()->subDays(rand(1, 29)),
            ]);
            $studentIds[] = $uid;

            DB::table('student_profiles')->insert([
                'student_id'       => $uid,
                'full_name'        => $s['full_name'],
                'gender'           => $s['gender'],
                'birth_date'       => '200' . rand(1, 4) . '-' . str_pad(rand(1, 12), 2, '0', STR_PAD_LEFT) . '-' . str_pad(rand(1, 28), 2, '0', STR_PAD_LEFT),
                'birth_place'      => $s['city'],
                'address'          => 'Jl. ' . ['Merdeka', 'Sudirman', 'Diponegoro', 'Ahmad Yani', 'Gajah Mada'][rand(0, 4)] . ' No. ' . rand(1, 99),
                'city'             => $s['city'],
                'province'         => $provinces[$i],
                'phone_number'     => $phones[$i],
                'institution_name' => $s['institution'],
                'major'            => $s['major'],
                'semester'         => $s['semester'],
                'created_at'       => now()->subDays(rand(30, 90)),
                'updated_at'       => now()->subDays(rand(1, 29)),
            ]);
        }

        // ── Registrations ────────────────────────────────────────────
        // Format: [student_index, program_index, status]
        $regs = [
            [0,  0, 'accepted'],
            [1,  0, 'pending'],
            [2,  0, 'rejected'],
            [3,  1, 'accepted'],
            [4,  1, 'pending'],
            [5,  1, 'accepted'],
            [6,  2, 'accepted'],
            [7,  2, 'accepted'],
            [8,  4, 'pending'],
            [9,  4, 'accepted'],
            [10, 0, 'pending'],
            [11, 1, 'rejected'],
            [3,  4, 'accepted'],
            [6,  0, 'pending'],
        ];

        $registrationIds = [];
        foreach ($regs as [$si, $pi, $status]) {
            $registrationIds[] = DB::table('registrations')->insertGetId([
                'student_id' => $studentIds[$si],
                'program_id' => $programIds[$pi],
                'admin_id'   => $status !== 'pending' ? $adminId : null,
                'status'     => $status,
                'description' => $status === 'rejected' ? 'Berkas tidak lengkap atau tidak memenuhi syarat.' : null,
                'created_at' => now()->subDays(rand(5, 40)),
                'updated_at' => now()->subDays(rand(1, 4)),
            ]);
        }

        // ── Payments (for accepted & some pending registrations) ─────
        // registrations index 0,3,5,6,7,9,12 = accepted; also add pending payments for index 1,4,8,10,13
        $paymentEntries = [
            ['reg_index' => 0,  'status' => 'accepted'],
            ['reg_index' => 1,  'status' => 'pending'],
            ['reg_index' => 3,  'status' => 'accepted'],
            ['reg_index' => 4,  'status' => 'pending'],
            ['reg_index' => 5,  'status' => 'accepted'],
            ['reg_index' => 6,  'status' => 'accepted'],
            ['reg_index' => 7,  'status' => 'accepted'],
            ['reg_index' => 8,  'status' => 'pending'],
            ['reg_index' => 9,  'status' => 'accepted'],
            ['reg_index' => 10, 'status' => 'pending'],
            ['reg_index' => 12, 'status' => 'accepted'],
            ['reg_index' => 13, 'status' => 'rejected'],
        ];

        $paymentIds = [];
        foreach ($paymentEntries as $entry) {
            $paymentIds[] = DB::table('payments')->insertGetId([
                'registration_id' => $registrationIds[$entry['reg_index']],
                'admin_id'        => $entry['status'] !== 'pending' ? $adminId : null,
                'file'            => 'payments/dummy-bukti-' . ($entry['reg_index'] + 1) . '.pdf',
                'status'          => $entry['status'],
                'created_at'      => now()->subDays(rand(3, 20)),
                'updated_at'      => now()->subDays(rand(1, 2)),
            ]);
        }

        // ── LOAs (for accepted registrations) ───────────────────────
        $loaEntries = [0, 2, 4, 5, 6, 8, 10]; // accepted payment indices
        foreach ($loaEntries as $pi) {
            if (!isset($paymentEntries[$pi])) continue;
            $regIdx = $paymentEntries[$pi]['reg_index'];
            DB::table('loas')->insert([
                'registration_id' => $registrationIds[$regIdx],
                'admin_id'        => $adminId,
                'file'            => 'loas/LOA-' . str_pad($regIdx + 1, 4, '0', STR_PAD_LEFT) . '.pdf',
                'created_at'      => now()->subDays(rand(1, 7)),
                'updated_at'      => now()->subDays(1),
            ]);
        }
    }
}
