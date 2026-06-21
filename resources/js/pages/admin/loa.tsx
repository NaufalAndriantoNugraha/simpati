import { DataTable } from '@/components/admin/data-table';
import { PageHeader } from '@/components/admin/page-header';
import AdminLayout from '@/layouts/admin/admin-layout';
import { useForm, usePage } from '@inertiajs/react';
import { FileUp, X } from 'lucide-react';
import { useState } from 'react';

interface Loa { id: number; file: string }
interface StudentProfile { full_name: string }
interface Student { username: string; studentProfile: StudentProfile | null }
interface Program { name: string }
interface Registration { id: number; student: Student; program: Program; loa: Loa | null }
interface PageProps { registrations: Registration[];[key: string]: unknown }

function UploadLoaModal({ registration, onClose }: { registration: Registration; onClose: () => void }) {
    const { setData, post, processing, errors } = useForm<{ registration_id: number; file: File | null }>({
        registration_id: registration.id,
        file: null,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/admin/dashboard/loa', { forceFormData: true, onSuccess: () => onClose() });
    }

    const studentName = registration.student.studentProfile?.full_name ?? registration.student.username;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-md bg-white shadow-2xl">
                <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                    <h2 className="text-base font-bold text-gray-900">Upload LOA</h2>
                    <button onClick={onClose} className="p-1.5 text-gray-400 hover:bg-gray-100 transition">
                        <X size={18} />
                    </button>
                </div>

                <div className="px-6 py-4">
                    <div className="mb-5 space-y-2 bg-gray-50 p-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Mahasiswa</span>
                            <span className="font-semibold text-gray-800">{studentName}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Program</span>
                            <span className="font-semibold text-gray-800">{registration.program.name}</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="mb-1 block text-xs font-semibold text-gray-600">File LOA (PDF)</label>
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={(e) => setData('file', e.target.files?.[0] || null)}
                                className="block w-full border border-gray-200 px-3 py-2 text-sm text-gray-700 file:mr-3 file:border-0 file:bg-emerald-50 file:px-3 file:py-1 file:text-xs file:font-semibold file:text-emerald-700 hover:file:bg-emerald-100 transition"
                            />
                            <p className="mt-1 text-xs text-gray-400">Format: PDF. Maks 5MB.</p>
                            {errors.file && <p className="mt-1 text-xs text-red-500">{errors.file}</p>}
                        </div>

                        <div className="flex gap-3 pt-1">
                            <button type="button" onClick={onClose} disabled={processing}
                                className="flex-1 border border-gray-200 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition">
                                Batal
                            </button>
                            <button type="submit" disabled={processing}
                                className="flex-1 bg-emerald-600 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50 transition">
                                {processing ? 'Mengupload...' : 'Upload'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default function LoaPage() {
    const { registrations } = usePage<PageProps>().props;
    const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);
    const { delete: destroy, processing } = useForm({});

    const rows = registrations.map((reg) => ({
        ...reg,
        _name: reg.student.studentProfile?.full_name ?? reg.student.username,
        _program: reg.program.name,
        _loa_status: reg.loa ? 'uploaded' : 'pending',
    }));

    return (
        <AdminLayout active="loa">
            {selectedRegistration && (
                <UploadLoaModal registration={selectedRegistration} onClose={() => setSelectedRegistration(null)} />
            )}

            <PageHeader title="Kelola LOA" subtitle="Upload Letter of Acceptance untuk mahasiswa yang telah diterima" />

            <DataTable
                data={rows as unknown as Record<string, unknown>[]}
                searchKeys={['_name', '_program']}
                searchPlaceholder="Cari mahasiswa atau program..."
                filterKey="_loa_status"
                filterOptions={[
                    { label: 'Sudah Upload', value: 'uploaded' },
                    { label: 'Belum Upload', value: 'pending' },
                ]}
                emptyMessage="Belum ada mahasiswa yang perlu LOA."
                columns={[
                    { key: '_name', label: 'Mahasiswa', sortable: true },
                    { key: '_program', label: 'Program', sortable: true },
                    {
                        key: '_loa_status', label: 'Status LOA', align: 'center',
                        render: (row) => {
                            const r = row as typeof rows[0];
                            return r.loa ? (
                                <span className="inline-flex items-center bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
                                    Sudah Upload
                                </span>
                            ) : (
                                <span className="inline-flex items-center bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700 ring-1 ring-amber-200">
                                    Belum Upload
                                </span>
                            );
                        },
                    },
                ]}
                actions={(row) => {
                    const r = row as unknown as typeof rows[0];
                    return r.loa ? (
                        <div className="flex items-center justify-end gap-2">
                            <a
                                href={'/storage/' + r.loa.file}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gray-100 px-2.5 py-1.5 text-xs font-semibold text-gray-700 hover:bg-emerald-100 hover:text-emerald-700 transition"
                            >
                                Lihat
                            </a>
                            <button
                                onClick={() => setSelectedRegistration(r as unknown as Registration)}
                                className="bg-gray-100 px-2.5 py-1.5 text-xs font-semibold text-gray-700 hover:bg-emerald-100 hover:text-emerald-700 transition"
                            >
                                Ganti
                            </button>
                            <button
                                onClick={() => destroy('/admin/dashboard/loa/' + r.loa!.id)}
                                disabled={processing}
                                className="bg-gray-100 px-2.5 py-1.5 text-xs font-semibold text-gray-700 hover:bg-red-100 hover:text-red-600 disabled:opacity-50 transition"
                            >
                                Hapus
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setSelectedRegistration(r as unknown as Registration)}
                            className="flex items-center gap-1 bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 transition"
                        >
                            <FileUp size={12} /> Upload LOA
                        </button>
                    );
                }}
            />
        </AdminLayout>
    );
}
