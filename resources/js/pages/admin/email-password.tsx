import { PageHeader } from '@/components/admin/page-header';
import AdminLayout from '@/layouts/admin/admin-layout';
import { useForm } from '@inertiajs/react';
import { Mail, RectangleEllipsis, X } from 'lucide-react';
import { useState } from 'react';

function ConfirmModal({
    title, message, confirmLabel, onConfirm, onClose, processing,
}: {
    title: string; message: string; confirmLabel: string;
    onConfirm: () => void; onClose: () => void; processing: boolean;
}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-sm rounded-2xl bg-white shadow-2xl">
                <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                    <h2 className="text-base font-bold text-gray-900">{title}</h2>
                    <button onClick={onClose} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 transition">
                        <X size={18} />
                    </button>
                </div>
                <div className="px-6 py-4">
                    <p className="text-sm text-gray-500">{message}</p>
                    <div className="mt-5 flex gap-3">
                        <button onClick={onClose} disabled={processing}
                            className="flex-1 rounded-lg border border-gray-200 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition">
                            Batal
                        </button>
                        <button onClick={onConfirm} disabled={processing}
                            className="flex-1 rounded-lg bg-emerald-600 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50 transition">
                            {processing ? 'Menyimpan...' : confirmLabel}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const inputCls = 'w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition';

export default function EmailPassword() {
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    const emailForm = useForm({ email: '' });
    const passwordForm = useForm({ current_password: '', new_password: '', new_password_confirmation: '' });

    function confirmEmail() {
        emailForm.put('/admin/dashboard/email-password/email', {
            onSuccess: () => { setShowEmailModal(false); emailForm.setData('email', ''); },
        });
    }

    function confirmPassword() {
        passwordForm.put('/admin/dashboard/email-password/password', {
            onSuccess: () => { setShowPasswordModal(false); passwordForm.reset(); },
        });
    }

    return (
        <AdminLayout active="email-password">
            {showEmailModal && (
                <ConfirmModal
                    title="Konfirmasi Perubahan Email"
                    message="Apakah Anda yakin ingin mengganti email akun ini?"
                    confirmLabel="Ya, Ganti Email"
                    onConfirm={confirmEmail}
                    onClose={() => { setShowEmailModal(false); emailForm.setData('email', ''); }}
                    processing={emailForm.processing}
                />
            )}
            {showPasswordModal && (
                <ConfirmModal
                    title="Konfirmasi Perubahan Password"
                    message="Apakah Anda yakin ingin mengganti password akun ini?"
                    confirmLabel="Ya, Ganti Password"
                    onConfirm={confirmPassword}
                    onClose={() => { setShowPasswordModal(false); passwordForm.reset(); }}
                    processing={passwordForm.processing}
                />
            )}

            <PageHeader title="Email & Password" subtitle="Kelola kredensial akun admin untuk menjaga keamanan." />

            <div className="space-y-5 max-w-2xl">
                {/* Ganti Email */}
                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="mb-5 flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                            <Mail size={18} className="text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-sm font-bold text-gray-800">Ganti Email</h2>
                            <p className="text-xs text-gray-500">Gunakan email aktif untuk menerima notifikasi.</p>
                        </div>
                    </div>

                    <form onSubmit={(e) => { e.preventDefault(); setShowEmailModal(true); }} className="space-y-4">
                        <div>
                            <label className="mb-1 block text-xs font-semibold text-gray-600">Email Baru</label>
                            <input
                                type="email"
                                required
                                value={emailForm.data.email}
                                onChange={(e) => emailForm.setData('email', e.target.value)}
                                placeholder="Masukkan email baru"
                                className={inputCls}
                            />
                            {emailForm.errors.email && <p className="mt-1 text-xs text-red-500">{emailForm.errors.email}</p>}
                        </div>
                        <button type="submit" disabled={emailForm.processing}
                            className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50 transition">
                            {emailForm.processing ? 'Menyimpan...' : 'Simpan Email'}
                        </button>
                    </form>
                </div>

                {/* Ganti Password */}
                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="mb-5 flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50">
                            <RectangleEllipsis size={18} className="text-red-600" />
                        </div>
                        <div>
                            <h2 className="text-sm font-bold text-gray-800">Ganti Password</h2>
                            <p className="text-xs text-gray-500">Gunakan password yang kuat agar akun lebih aman.</p>
                        </div>
                    </div>

                    <form onSubmit={(e) => { e.preventDefault(); setShowPasswordModal(true); }} className="space-y-4">
                        <div>
                            <label className="mb-1 block text-xs font-semibold text-gray-600">Password Lama</label>
                            <input type="password" required value={passwordForm.data.current_password}
                                onChange={(e) => passwordForm.setData('current_password', e.target.value)}
                                placeholder="Masukkan password lama" className={inputCls} />
                            {passwordForm.errors.current_password && <p className="mt-1 text-xs text-red-500">{passwordForm.errors.current_password}</p>}
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-semibold text-gray-600">Password Baru</label>
                            <input type="password" required value={passwordForm.data.new_password}
                                onChange={(e) => passwordForm.setData('new_password', e.target.value)}
                                placeholder="Masukkan password baru" className={inputCls} />
                            {passwordForm.errors.new_password && <p className="mt-1 text-xs text-red-500">{passwordForm.errors.new_password}</p>}
                        </div>
                        <div>
                            <label className="mb-1 block text-xs font-semibold text-gray-600">Konfirmasi Password Baru</label>
                            <input type="password" required value={passwordForm.data.new_password_confirmation}
                                onChange={(e) => passwordForm.setData('new_password_confirmation', e.target.value)}
                                placeholder="Konfirmasi password baru" className={inputCls} />
                        </div>
                        <button type="submit" disabled={passwordForm.processing}
                            className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50 transition">
                            {passwordForm.processing ? 'Menyimpan...' : 'Simpan Password'}
                        </button>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
