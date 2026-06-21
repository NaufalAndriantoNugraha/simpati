import StudentLayout from '@/layouts/student/student-layout';
import { Link, useForm, usePage } from '@inertiajs/react';
import { BookOpen, Calendar, Users, X } from 'lucide-react';
import { useState } from 'react';

interface StudyProgram {
    id: number; name: string; description: string;
    student_quota: number; remaining_quota: number; price: number;
    registration_open: string; registration_close: string; status: string;
}

interface PageProps {
    programs: StudyProgram[];
    registeredProgramIds: number[];
    [key: string]: unknown;
}

function ConfirmModal({ program, onConfirm, onCancel, processing }: {
    program: StudyProgram; onConfirm: () => void; onCancel: () => void; processing: boolean;
}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-md bg-white shadow-2xl">
                <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                    <h2 className="text-base font-bold text-gray-900">Konfirmasi Pendaftaran</h2>
                    <button onClick={onCancel} className="p-1.5 text-gray-400 hover:bg-gray-100 transition"><X size={18} /></button>
                </div>
                <div className="p-6">
                    <p className="mb-1 text-sm text-gray-500">Anda akan mendaftar ke program:</p>
                    <p className="mb-5 font-semibold text-gray-900">{program.name}</p>
                    <div className="mb-5 space-y-2 bg-gray-50 p-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Harga</span>
                            <span className="font-semibold text-emerald-700">Rp {Number(program.price).toLocaleString('id-ID')}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Sisa Kuota</span>
                            <span className="font-semibold text-gray-800">{program.remaining_quota} orang</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Ditutup</span>
                            <span className="font-semibold text-gray-800">{program.registration_close}</span>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={onCancel} disabled={processing}
                            className="flex-1 border border-gray-200 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition">
                            Batal
                        </button>
                        <button onClick={onConfirm} disabled={processing}
                            className="flex-1 bg-emerald-600 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50 transition">
                            {processing ? 'Mendaftar...' : 'Konfirmasi'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ProgramCard({ program, isRegistered }: { program: StudyProgram; isRegistered: boolean }) {
    const [showModal, setShowModal] = useState(false);
    const { post, processing } = useForm({ program_id: program.id });

    function handleConfirm() {
        post('/student/register-program', { onSuccess: () => setShowModal(false) });
    }

    const isFull = program.remaining_quota <= 0;

    return (
        <>
            {showModal && <ConfirmModal program={program} onConfirm={handleConfirm} onCancel={() => setShowModal(false)} processing={processing} />}

            <div className="flex flex-col border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition">
                <div className="mb-3 flex items-start justify-between gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-emerald-50">
                        <BookOpen size={18} className="text-emerald-600" />
                    </div>
                    <span className="inline-flex items-center bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
                        Buka
                    </span>
                </div>

                <h2 className="mb-2 text-base font-bold text-gray-900">{program.name}</h2>
                <p className="mb-4 line-clamp-2 text-sm text-gray-500 flex-1">{program.description}</p>

                <div className="mb-4 grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 px-3 py-2">
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                            <Users size={11} /> Sisa Kuota
                        </div>
                        <p className="mt-0.5 text-sm font-semibold text-gray-800">{program.remaining_quota} orang</p>
                    </div>
                    <div className="bg-gray-50 px-3 py-2">
                        <p className="text-xs text-gray-400">Harga</p>
                        <p className="mt-0.5 text-sm font-semibold text-emerald-700">Rp {Number(program.price).toLocaleString('id-ID')}</p>
                    </div>
                    <div className="col-span-2 bg-gray-50 px-3 py-2">
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                            <Calendar size={11} /> Periode Pendaftaran
                        </div>
                        <p className="mt-0.5 text-xs font-medium text-gray-700">{program.registration_open} — {program.registration_close}</p>
                    </div>
                </div>

                <Link href={'/student/dashboard/programs/' + program.id}
                    className="mb-2 block w-full border border-gray-200 py-2 text-center text-sm font-semibold text-gray-700 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 transition">
                    Lihat Detail
                </Link>

                {isRegistered ? (
                    <button disabled className="w-full cursor-not-allowed bg-gray-100 py-2 text-sm font-semibold text-gray-400">
                        Sudah Terdaftar
                    </button>
                ) : isFull ? (
                    <button disabled className="w-full cursor-not-allowed bg-gray-100 py-2 text-sm font-semibold text-gray-400">
                        Kuota Penuh
                    </button>
                ) : (
                    <button onClick={() => setShowModal(true)}
                        className="w-full bg-emerald-600 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition">
                        Daftar Sekarang
                    </button>
                )}
            </div>
        </>
    );
}

export default function Programs() {
    const { programs, registeredProgramIds } = usePage<PageProps>().props;

    return (
        <StudentLayout active="programs">
            <div className="mb-6">
                <h1 className="text-xl font-bold text-gray-900">Program Studi</h1>
                <p className="text-sm text-gray-500">Pilih program studi independen yang tersedia dan sesuai minat Anda.</p>
            </div>

            {programs.length === 0 ? (
                <div className="border border-gray-100 bg-white p-12 text-center shadow-sm">
                    <BookOpen size={32} className="mx-auto mb-3 text-gray-300" />
                    <p className="text-sm text-gray-400">Belum ada program studi yang tersedia.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {programs.map((program) => (
                        <ProgramCard key={program.id} program={program} isRegistered={registeredProgramIds?.includes(program.id)} />
                    ))}
                </div>
            )}
        </StudentLayout>
    );
}
