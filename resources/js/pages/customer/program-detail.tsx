import StudentLayout from '@/layouts/student/student-layout';
import { useForm, usePage } from '@inertiajs/react';
import { ArrowLeft, BookOpen, Calendar, Users, X } from 'lucide-react';
import { useState } from 'react';

interface StudyProgram {
    id: number; name: string; description: string;
    student_quota: number; remaining_quota: number; price: number;
    registration_open: string; registration_close: string; status: string;
}

interface PageProps { program: StudyProgram; isRegistered: boolean; [key: string]: unknown }

function ConfirmModal({ program, onConfirm, onCancel, processing }: {
    program: StudyProgram; onConfirm: () => void; onCancel: () => void; processing: boolean;
}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
                <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                    <h2 className="text-base font-bold text-gray-900">Konfirmasi Pendaftaran</h2>
                    <button onClick={onCancel} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 transition"><X size={18} /></button>
                </div>
                <div className="p-6">
                    <p className="mb-1 text-sm text-gray-500">Anda akan mendaftar ke:</p>
                    <p className="mb-5 font-semibold text-gray-900">{program.name}</p>
                    <div className="mb-5 space-y-2 rounded-xl bg-gray-50 p-4">
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
                            className="flex-1 rounded-lg border border-gray-200 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition">
                            Batal
                        </button>
                        <button onClick={onConfirm} disabled={processing}
                            className="flex-1 rounded-lg bg-emerald-600 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50 transition">
                            {processing ? 'Mendaftar...' : 'Konfirmasi'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ProgramDetail() {
    const { program, isRegistered } = usePage<PageProps>().props;
    const [showModal, setShowModal] = useState(false);
    const { post, processing } = useForm({ program_id: program.id });

    function handleConfirm() {
        post('/student/register-program', { onSuccess: () => setShowModal(false) });
    }

    return (
        <StudentLayout active="programs">
            {showModal && <ConfirmModal program={program} onConfirm={handleConfirm} onCancel={() => setShowModal(false)} processing={processing} />}

            <div className="mb-5">
                <a href="/student/dashboard/programs"
                    className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition">
                    <ArrowLeft size={14} /> Kembali ke Program
                </a>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
                {/* Header */}
                <div className="mb-6 flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
                            <BookOpen size={22} className="text-emerald-600" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">{program.name}</h1>
                            <span className="mt-1 inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
                                Pendaftaran Dibuka
                            </span>
                        </div>
                    </div>
                    <div className="shrink-0 text-right">
                        <p className="text-xs text-gray-400">Harga</p>
                        <p className="text-2xl font-bold text-emerald-700">Rp {Number(program.price).toLocaleString('id-ID')}</p>
                    </div>
                </div>

                {/* Description */}
                <p className="mb-6 text-sm leading-relaxed text-gray-600">{program.description}</p>

                {/* Stats */}
                <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[
                        { icon: <Users size={15} />, label: 'Kuota Awal', value: `${program.student_quota} orang` },
                        { icon: <Users size={15} />, label: 'Sisa Kuota', value: `${program.remaining_quota} orang` },
                        { icon: <Calendar size={15} />, label: 'Dibuka', value: program.registration_open },
                        { icon: <Calendar size={15} />, label: 'Ditutup', value: program.registration_close },
                    ].map((item) => (
                        <div key={item.label} className="rounded-xl bg-gray-50 p-4">
                            <div className="mb-1 flex items-center gap-1.5 text-xs text-gray-400">
                                {item.icon} {item.label}
                            </div>
                            <p className="text-sm font-semibold text-gray-800">{item.value}</p>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                {isRegistered ? (
                    <button disabled className="w-full cursor-not-allowed rounded-xl bg-gray-100 py-3 text-sm font-semibold text-gray-400">
                        Sudah Terdaftar di Program Ini
                    </button>
                ) : program.remaining_quota <= 0 ? (
                    <button disabled className="w-full cursor-not-allowed rounded-xl bg-gray-100 py-3 text-sm font-semibold text-gray-400">
                        Kuota Penuh
                    </button>
                ) : (
                    <button onClick={() => setShowModal(true)}
                        className="w-full rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white hover:bg-emerald-700 transition">
                        Daftar Sekarang
                    </button>
                )}
            </div>
        </StudentLayout>
    );
}
