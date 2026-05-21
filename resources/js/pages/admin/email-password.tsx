import AdminLayout from '@/layouts/admin/admin-layout';
import { useForm } from '@inertiajs/react';
import { Mail, RectangleEllipsis } from 'lucide-react';
import { useState } from 'react';

export default function EmailPassword() {
    const [showEmailPopup, setShowEmailPopup] = useState(false);

    const emailForm = useForm({
        email: '',
    });

    // const passwordForm = useForm({
    //     current_password: '',
    //     new_password: '',
    //     new_password_confirmation: '',
    // });

    const submitEmail = (e: React.FormEvent) => {
        e.preventDefault();
        setShowEmailPopup(true);
    };

    const confirmUpdateEmail = () => {
        emailForm.put('/admin/dashboard/email-password/email', {
            onSuccess: () => {
                setShowEmailPopup(false);
            },
        });
        emailForm.setData('email', '');
    };

    // const submitPassword = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     passwordForm.put('/admin/dashboard/email-password/password');
    // };

    return (
        <AdminLayout active="email-password">
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Email & Password</h1>

                    <p className="mt-2 max-w-2xl text-gray-500">Kelola email dan password akun admin Anda untuk menjaga keamanan akun.</p>
                </div>

                <div className="space-y-5">
                    <form onSubmit={submitEmail} className="rounded-md border bg-white p-6 shadow-sm">
                        <div className="flex items-start gap-4">
                            <div className="rounded-md bg-blue-100 p-3 text-blue-600">
                                <Mail size={22} />
                            </div>

                            <div className="w-full">
                                <h2 className="text-lg font-semibold text-gray-800">Ganti Email</h2>

                                <p className="mt-1 text-sm text-gray-500">Gunakan email aktif untuk menerima notifikasi akun.</p>

                                <div className="mt-5">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">Email Baru</label>

                                    <input
                                        type="email"
                                        required
                                        value={emailForm.data.email}
                                        onChange={(e) => emailForm.setData('email', e.target.value)}
                                        placeholder="Masukkan email baru"
                                        className="w-full rounded-md border border-gray-300 px-4 py-3 transition outline-none focus:border-black"
                                    />

                                    {emailForm.errors.email && <p className="mt-2 text-sm text-red-500">{emailForm.errors.email}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={emailForm.processing}
                                    className="mt-5 rounded-md bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
                                >
                                    {emailForm.processing ? 'Menyimpan...' : 'Simpan Email'}
                                </button>
                            </div>
                        </div>
                    </form>

                    {showEmailPopup && (
                        <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-black/40">
                            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                                <h2 className="text-xl font-bold text-gray-800">Konfirmasi Perubahan</h2>

                                <p className="mt-3 text-sm text-gray-500">Apakah Anda yakin ingin mengganti email akun ini?</p>

                                <div className="mt-6 flex justify-end gap-3">
                                    <button
                                        onClick={() => {
                                            setShowEmailPopup(false);
                                            emailForm.setData('email', '');
                                        }}
                                        className="rounded-md border px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                                    >
                                        Batal
                                    </button>

                                    <button
                                        onClick={confirmUpdateEmail}
                                        disabled={emailForm.processing}
                                        className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
                                    >
                                        {emailForm.processing ? 'Menyimpan...' : 'Ya, Ganti Email'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="rounded-md border bg-white p-6 shadow-sm transition hover:shadow-md">
                        <div className="flex items-start gap-4">
                            <div className="rounded-md bg-red-100 p-3 text-red-600">
                                <RectangleEllipsis size={22} />
                            </div>

                            <div className="w-full">
                                <h2 className="text-lg font-semibold text-gray-800">Ganti Password</h2>

                                <p className="mt-1 text-sm text-gray-500">Gunakan password yang kuat agar akun lebih aman.</p>

                                <div className="mt-5 space-y-4">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">Password Lama</label>

                                        <input
                                            type="password"
                                            placeholder="Masukkan password lama"
                                            required
                                            className="w-full rounded-md border border-gray-300 px-4 py-3 transition outline-none focus:border-black"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">Password Baru</label>

                                        <input
                                            type="password"
                                            placeholder="Masukkan password baru"
                                            required
                                            className="w-full rounded-md border border-gray-300 px-4 py-3 transition outline-none focus:border-black"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">Konfirmasi Password</label>

                                        <input
                                            type="password"
                                            required
                                            placeholder="Konfirmasi password baru"
                                            className="w-full rounded-md border border-gray-300 px-4 py-3 transition outline-none focus:border-black"
                                        />
                                    </div>
                                </div>

                                <button className="mt-5 rounded-md bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800">
                                    Simpan Password
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
