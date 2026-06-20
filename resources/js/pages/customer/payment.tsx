import StudentLayout from '@/layouts/student/student-layout';
import { useForm, usePage } from '@inertiajs/react';
import { AlertTriangle, CheckCircle2, Clock, ExternalLink, Upload, X } from 'lucide-react';
import React, { useState } from 'react';

interface Payment { id: number; file: string; status: 'pending' | 'accepted' | 'rejected' }
interface Registration {
    id: number; status: 'pending' | 'accepted' | 'rejected';
    program: { name: string; price: number };
    payment: Payment | null;
}
interface PageProps { registrations: Registration[]; [key: string]: unknown }

const statusConfig = {
    pending:  { label: 'Menunggu',  cls: 'bg-amber-50 text-amber-700 ring-amber-200',   icon: <Clock size={11} /> },
    accepted: { label: 'Diterima',  cls: 'bg-emerald-50 text-emerald-700 ring-emerald-200', icon: <CheckCircle2 size={11} /> },
    rejected: { label: 'Ditolak',   cls: 'bg-red-50 text-red-600 ring-red-200',         icon: <AlertTriangle size={11} /> },
};

function StatusBadge({ status }: { status: 'pending' | 'accepted' | 'rejected' }) {
    const c = statusConfig[status];
    return (
        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${c.cls}`}>
            {c.icon} {c.label}
        </span>
    );
}

function UploadModal({ registration, onClose }: { registration: Registration; onClose: () => void }) {
    const { setData, post, processing, errors } = useForm<{ registration_id: number; file: File | null }>({
        registration_id: registration.id, file: null,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/student/dashboard/payment', { forceFormData: true, onSuccess: () => onClose() });
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
                <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                    <h2 className="text-base font-bold text-gray-900">Upload Bukti Pembayaran</h2>
                    <button onClick={onClose} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 transition"><X size={18} /></button>
                </div>
                <div className="p-6">
                    <div className="mb-5 space-y-2 rounded-xl bg-gray-50 p-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Program</span>
                            <span className="font-semibold text-gray-800">{registration.program.name}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Total</span>
                            <span className="font-semibold text-emerald-700">Rp {Number(registration.program.price).toLocaleString('id-ID')}</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="mb-1 block text-xs font-semibold text-gray-600">File Bukti Pembayaran</label>
                            <input type="file" accept=".jpg,.jpeg,.png,.pdf"
                                onChange={(e) => setData('file', e.target.files?.[0] || null)}
                                className="block w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 file:mr-3 file:rounded-md file:border-0 file:bg-emerald-50 file:px-3 file:py-1 file:text-xs file:font-semibold file:text-emerald-700 hover:file:bg-emerald-100 transition" />
                            <p className="mt-1 text-xs text-gray-400">Format: JPG, PNG, PDF. Maks 2MB.</p>
                            {errors.file && <p className="mt-1 text-xs text-red-500">{errors.file}</p>}
                        </div>
                        <div className="flex gap-3 pt-1">
                            <button type="button" onClick={onClose} disabled={processing}
                                className="flex-1 rounded-lg border border-gray-200 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition">
                                Batal
                            </button>
                            <button type="submit" disabled={processing}
                                className="flex-1 rounded-lg bg-emerald-600 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50 transition">
                                {processing ? 'Mengupload...' : 'Upload'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

function CancelModal({ registration, onConfirm, onClose, processing }: {
    registration: Registration; onConfirm: () => void; onClose: () => void; processing: boolean;
}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-sm rounded-2xl bg-white shadow-2xl">
                <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                    <h2 className="text-base font-bold text-gray-900">Batalkan Pendaftaran</h2>
                    <button onClick={onClose} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 transition"><X size={18} /></button>
                </div>
                <div className="p-6">
                    <p className="mb-1 text-sm text-gray-500">Anda akan membatalkan pendaftaran ke:</p>
                    <p className="mb-4 font-semibold text-gray-900">{registration.program.name}</p>
                    <div className="mb-5 rounded-xl bg-red-50 px-4 py-3">
                        <p className="text-xs text-red-600">Tindakan ini tidak dapat dibatalkan. Anda harus mendaftar ulang jika ingin bergabung kembali.</p>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={onClose} disabled={processing}
                            className="flex-1 rounded-lg border border-gray-200 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition">
                            Kembali
                        </button>
                        <button onClick={onConfirm} disabled={processing}
                            className="flex-1 rounded-lg border border-red-200 bg-red-50 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-100 disabled:opacity-50 transition">
                            {processing ? 'Membatalkan...' : 'Ya, Batalkan'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Payment() {
    const { registrations } = usePage<PageProps>().props;
    const [selectedReg, setSelectedReg] = useState<Registration | null>(null);
    const [cancelReg, setCancelReg] = useState<Registration | null>(null);
    const { delete: destroy, processing: cancelling } = useForm({});

    function handleCancel(reg: Registration) {
        destroy('/student/register-program/' + reg.id, { onSuccess: () => setCancelReg(null) });
    }

    return (
        <StudentLayout active="payment">
            {selectedReg && <UploadModal registration={selectedReg} onClose={() => setSelectedReg(null)} />}
            {cancelReg && <CancelModal registration={cancelReg} onConfirm={() => handleCancel(cancelReg)} onClose={() => setCancelReg(null)} processing={cancelling} />}

            <div className="mb-6">
                <h1 className="text-xl font-bold text-gray-900">Pembayaran</h1>
                <p className="text-sm text-gray-500">Upload dan pantau status bukti pembayaran program studi Anda.</p>
            </div>

            {registrations.length === 0 ? (
                <div className="rounded-xl border border-gray-100 bg-white p-12 text-center shadow-sm">
                    <Upload size={32} className="mx-auto mb-3 text-gray-300" />
                    <p className="text-sm text-gray-400">Anda belum mendaftar ke program apapun.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {registrations.map((reg) => (
                        <div key={reg.id} className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex items-start justify-between gap-4">
                                <div>
                                    <h2 className="font-bold text-gray-900">{reg.program.name}</h2>
                                    <p className="mt-0.5 text-sm font-semibold text-emerald-700">
                                        Rp {Number(reg.program.price).toLocaleString('id-ID')}
                                    </p>
                                </div>
                                <div className="shrink-0">
                                    <p className="mb-1 text-xs text-gray-400">Status Pendaftaran</p>
                                    <StatusBadge status={reg.status} />
                                </div>
                            </div>

                            <div className="border-t border-gray-100 pt-4">
                                {reg.payment && reg.payment.status !== 'rejected' ? (
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-700">Bukti Pembayaran</p>
                                            <p className="text-xs text-gray-400">Sudah diupload</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <a href={'/storage/' + reg.payment.file} target="_blank" rel="noopener noreferrer"
                                                className="flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition">
                                                <ExternalLink size={12} /> Lihat
                                            </a>
                                            <StatusBadge status={reg.payment.status} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-gray-500">
                                            {reg.payment?.status === 'rejected'
                                                ? 'Pembayaran ditolak — silakan upload ulang'
                                                : 'Belum upload bukti pembayaran'}
                                        </p>
                                        <button onClick={() => setSelectedReg(reg)}
                                            className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 transition">
                                            <Upload size={12} />
                                            {reg.payment?.status === 'rejected' ? 'Upload Ulang' : 'Upload Bukti'}
                                        </button>
                                    </div>
                                )}
                            </div>

                            {reg.status !== 'accepted' && (
                                <button onClick={() => setCancelReg(reg)}
                                    className="mt-3 w-full rounded-lg border border-red-200 py-2 text-xs font-semibold text-red-500 hover:bg-red-50 transition">
                                    Batalkan Pendaftaran
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </StudentLayout>
    );
}
