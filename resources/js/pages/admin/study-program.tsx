import { StatusBadge } from '@/components/admin/badge';
import { DataTable } from '@/components/admin/data-table';
import { PageHeader } from '@/components/admin/page-header';
import AdminLayout from '@/layouts/admin/admin-layout';
import { useForm } from '@inertiajs/react';
import { Pencil, Plus, Trash2, X } from 'lucide-react';
import { useState } from 'react';

interface StudyProgram {
    id: number; name: string; description: string;
    student_quota: number; price: number;
    registration_open: string; registration_close: string;
    status: 'draft' | 'open' | 'closed';
}

interface Props { programs: StudyProgram[] }

function FormModal({
    title, data, setData, errors, processing, onSubmit, onClose,
}: {
    title: string;
    data: Record<string, string>;
    setData: (key: string, value: string) => void;
    errors: Record<string, string>;
    processing: boolean;
    onSubmit: (e: React.FormEvent) => void;
    onClose: () => void;
}) {
    const field = (label: string, key: string, type = 'text', extra?: React.ReactNode) => (
        <div>
            <label className="mb-1 block text-xs font-semibold text-gray-600">{label}</label>
            {extra ?? (
                <input type={type} value={data[key]} onChange={(e) => setData(key, e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition" />
            )}
            {errors[key] && <p className="mt-1 text-xs text-red-500">{errors[key]}</p>}
        </div>
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
                <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                    <h2 className="text-base font-bold text-gray-900">{title}</h2>
                    <button onClick={onClose} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 transition"><X size={18} /></button>
                </div>

                <form onSubmit={onSubmit} className="p-6">
                    <div className="grid grid-cols-2 gap-4">
                        {field('Nama Program', 'name')}
                        {field('Kuota Mahasiswa', 'student_quota', 'number')}
                        <div className="col-span-2">
                            {field('Deskripsi', 'description', 'text',
                                <textarea value={data.description} onChange={(e) => setData('description', e.target.value)}
                                    rows={3}
                                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition" />
                            )}
                        </div>
                        {field('Harga (Rp)', 'price', 'number')}
                        {field('Status', 'status', 'text',
                            <select value={data.status} onChange={(e) => setData('status', e.target.value)}
                                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition">
                                <option value="draft">Draft</option>
                                <option value="open">Buka</option>
                                <option value="closed">Tutup</option>
                            </select>
                        )}
                        {field('Pendaftaran Dibuka', 'registration_open', 'date')}
                        {field('Pendaftaran Ditutup', 'registration_close', 'date')}
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <button type="button" onClick={onClose}
                            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition">
                            Batal
                        </button>
                        <button type="submit" disabled={processing}
                            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50 transition">
                            {processing ? 'Menyimpan...' : 'Simpan'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function StudyProgram({ programs }: Props) {
    const [editingProgram, setEditingProgram] = useState<StudyProgram | null>(null);
    const [showForm, setShowForm] = useState(false);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        name: '', description: '', student_quota: '', price: '',
        registration_open: '', registration_close: '', status: 'draft',
    });

    function openAdd() { reset(); setEditingProgram(null); setShowForm(true); }

    function openEdit(p: StudyProgram) {
        setData({ name: p.name, description: p.description, student_quota: String(p.student_quota),
            price: String(p.price), registration_open: p.registration_open,
            registration_close: p.registration_close, status: p.status });
        setEditingProgram(p); setShowForm(true);
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const opts = { onSuccess: () => { setShowForm(false); reset(); } };
        editingProgram ? put(`/admin/dashboard/study-program/${editingProgram.id}`, opts) : post('/admin/dashboard/study-program', opts);
    }

    function handleDelete(id: number) {
        if (confirm('Yakin ingin menghapus program ini?')) destroy(`/admin/dashboard/study-program/${id}`);
    }

    return (
        <AdminLayout active="study-program">
            {showForm && (
                <FormModal
                    title={editingProgram ? 'Edit Program' : 'Tambah Program'}
                    data={data as unknown as Record<string, string>}
                    setData={(k, v) => setData(k as keyof typeof data, v)}
                    errors={errors}
                    processing={processing}
                    onSubmit={handleSubmit}
                    onClose={() => setShowForm(false)}
                />
            )}

            <PageHeader
                title="Kelola Program"
                subtitle="Tambah dan kelola program studi independen"
                action={
                    <button onClick={openAdd}
                        className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition">
                        <Plus size={15} /> Tambah Program
                    </button>
                }
            />

            <DataTable
                data={programs as unknown as Record<string, unknown>[]}
                searchKeys={['name', 'description']}
                searchPlaceholder="Cari program..."
                filterKey="status"
                filterOptions={[
                    { label: 'Draft',  value: 'draft' },
                    { label: 'Buka',   value: 'open' },
                    { label: 'Tutup',  value: 'closed' },
                ]}
                emptyMessage="Belum ada program studi."
                columns={[
                    { key: 'name', label: 'Nama Program', sortable: true },
                    {
                        key: 'student_quota', label: 'Kuota', sortable: true, align: 'center',
                        render: (row) => (
                            <span className="font-medium">{(row as { student_quota: number }).student_quota} siswa</span>
                        ),
                    },
                    {
                        key: 'price', label: 'Harga', sortable: true, align: 'right',
                        render: (row) => (
                            <span className="font-semibold text-emerald-700">
                                Rp {Number((row as { price: number }).price).toLocaleString('id-ID')}
                            </span>
                        ),
                    },
                    {
                        key: 'registration_open', label: 'Periode', align: 'center',
                        render: (row) => {
                            const p = row as StudyProgram;
                            return <span className="text-xs text-gray-500">{p.registration_open} — {p.registration_close}</span>;
                        },
                    },
                    {
                        key: 'status', label: 'Status', align: 'center',
                        render: (row) => <StatusBadge status={(row as { status: string }).status} />,
                    },
                ]}
                actions={(row) => {
                    const p = row as unknown as StudyProgram;
                    return (
                        <div className="flex items-center justify-end gap-2">
                            <button onClick={() => openEdit(p)}
                                className="flex items-center gap-1 rounded-lg bg-gray-100 px-2.5 py-1.5 text-xs font-semibold text-gray-700 hover:bg-emerald-100 hover:text-emerald-700 transition">
                                <Pencil size={12} /> Edit
                            </button>
                            <button onClick={() => handleDelete(p.id)}
                                className="flex items-center gap-1 rounded-lg bg-gray-100 px-2.5 py-1.5 text-xs font-semibold text-gray-700 hover:bg-red-100 hover:text-red-600 transition">
                                <Trash2 size={12} /> Hapus
                            </button>
                        </div>
                    );
                }}
            />
        </AdminLayout>
    );
}
