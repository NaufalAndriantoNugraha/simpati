import StudentLayout from '@/layouts/student/student-layout';
import { usePage } from '@inertiajs/react';

interface StudyProgram {
    id: number;
    name: string;
    description: string;
    student_quota: number;
    price: number;
    registration_open: string;
    registration_close: string;
    status: string;
}

interface PageProps {
    programs: StudyProgram[];
    [key: string]: unknown;
}

export default function Programs() {
    const { programs } = usePage<PageProps>().props;

    return (
        <StudentLayout active="programs">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Program Studi</h1>
                <p className="text-gray-500">Pilih program studi independen yang tersedia</p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {programs.length === 0 ? (
                    <p className="text-gray-400">Belum ada program studi yang tersedia.</p>
                ) : (
                    programs.map((program) => (
                        <div key={program.id} className="rounded-xl border bg-white p-6 shadow-sm">
                            <div className="mb-4 flex items-start justify-between">
                                <h2 className="text-lg font-bold">{program.name}</h2>
                                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">Open</span>
                            </div>

                            <p className="mb-4 text-sm text-gray-500">{program.description}</p>

                            <div className="mb-4 grid grid-cols-2 gap-2 text-sm">
                                <div>
                                    <p className="text-xs text-gray-400">Kuota</p>
                                    <p className="font-semibold">{program.student_quota} orang</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Harga</p>
                                    <p className="font-semibold">Rp {Number(program.price).toLocaleString('id-ID')}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Pendaftaran Dibuka</p>
                                    <p className="font-semibold">{program.registration_open}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Pendaftaran Ditutup</p>
                                    <p className="font-semibold">{program.registration_close}</p>
                                </div>
                            </div>

                            <button className="w-full rounded-md bg-black py-2 text-sm font-semibold text-white hover:bg-gray-800">Daftar</button>
                        </div>
                    ))
                )}
            </div>
        </StudentLayout>
    );
}
