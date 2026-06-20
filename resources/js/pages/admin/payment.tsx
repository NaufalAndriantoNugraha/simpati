import { StatusBadge } from '@/components/admin/badge';
import { DataTable } from '@/components/admin/data-table';
import { PageHeader } from '@/components/admin/page-header';
import AdminLayout from '@/layouts/admin/admin-layout';
import { useForm, usePage } from '@inertiajs/react';
import { ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface StudentProfile { full_name: string }
interface Student { username: string; studentProfile: StudentProfile | null }
interface Program { name: string; price: number }
interface Registration { id: number; status: string; student: Student; program: Program }
interface Payment { id: number; file: string; status: 'pending' | 'accepted' | 'rejected'; registration: Registration }
interface PageProps { payments: Payment[]; [key: string]: unknown }

function VerifyModal({ payment, onClose }: { payment: Payment; onClose: () => void }) {
    const acceptForm = useForm({ status: 'accepted' });
    const rejectForm = useForm({ status: 'rejected' });
    const processing = acceptForm.processing || rejectForm.processing;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
                <h2 className="mb-1 text-lg font-bold text-gray-900">Verifikasi Pembayaran</h2>
                <p className="mb-5 text-sm text-gray-500">Tinjau dan tentukan status pembayaran berikut.</p>

                <div className="mb-4 space-y-3 rounded-xl bg-gray-50 p-4">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Mahasiswa</span>
                        <span className="font-semibold text-gray-800">
                            {payment.registration.student.studentProfile?.full_name ?? payment.registration.student.username}
                        </span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Program</span>
                        <span className="font-semibold text-gray-800">{payment.registration.program.name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Total</span>
                        <span className="font-bold text-emerald-700">
                            Rp {Number(payment.registration.program.price).toLocaleString('id-ID')}
                        </span>
                    </div>
                </div>

                <a
                    href={'/storage/' + payment.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-5 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-700 hover:bg-emerald-100 transition"
                >
                    <ExternalLink size={15} />
                    Lihat Bukti Pembayaran
                </a>

                <div className="flex gap-3">
                    <button onClick={onClose} disabled={processing}
                        className="flex-1 rounded-lg border border-gray-200 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition">
                        Batal
                    </button>
                    <button onClick={() => rejectForm.put('/admin/dashboard/payment/' + payment.id, { onSuccess: onClose })}
                        disabled={processing}
                        className="flex-1 rounded-lg border border-red-200 bg-red-50 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-100 disabled:opacity-50 transition">
                        Tolak
                    </button>
                    <button onClick={() => acceptForm.put('/admin/dashboard/payment/' + payment.id, { onSuccess: onClose })}
                        disabled={processing}
                        className="flex-1 rounded-lg bg-emerald-600 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50 transition">
                        {processing ? 'Memproses...' : 'Terima'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function Payment() {
    const { payments } = usePage<PageProps>().props;
    const [selected, setSelected] = useState<Payment | null>(null);

    const rows = payments.map((p) => ({
        ...p,
        _name: p.registration.student.studentProfile?.full_name ?? p.registration.student.username,
        _program: p.registration.program.name,
        _price: p.registration.program.price,
    }));

    return (
        <AdminLayout active="payment">
            {selected && <VerifyModal payment={selected} onClose={() => setSelected(null)} />}

            <PageHeader title="Verifikasi Pembayaran" subtitle="Tinjau dan verifikasi bukti pembayaran mahasiswa" />

            <DataTable
                data={rows as unknown as Record<string, unknown>[]}
                searchKeys={['_name', '_program']}
                searchPlaceholder="Cari mahasiswa atau program..."
                filterKey="status"
                filterOptions={[
                    { label: 'Menunggu', value: 'pending' },
                    { label: 'Diterima', value: 'accepted' },
                    { label: 'Ditolak',  value: 'rejected' },
                ]}
                emptyMessage="Tidak ada data pembayaran ditemukan."
                columns={[
                    { key: '_name',    label: 'Mahasiswa', sortable: true },
                    { key: '_program', label: 'Program',   sortable: true },
                    {
                        key: '_price', label: 'Harga', sortable: true, align: 'right',
                        render: (row) => (
                            <span className="font-semibold text-emerald-700">
                                Rp {Number((row as { _price: number })._price).toLocaleString('id-ID')}
                            </span>
                        ),
                    },
                    {
                        key: 'status', label: 'Status', align: 'center',
                        render: (row) => <StatusBadge status={(row as { status: string }).status} />,
                    },
                ]}
                actions={(row) => {
                    const p = row as unknown as Payment & { _name: string; _program: string; _price: number };
                    return p.status === 'pending' ? (
                        <button
                            onClick={() => setSelected(p)}
                            className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 transition"
                        >
                            Verifikasi
                        </button>
                    ) : (
                        <span className="text-xs text-gray-400">Selesai</span>
                    );
                }}
            />
        </AdminLayout>
    );
}
