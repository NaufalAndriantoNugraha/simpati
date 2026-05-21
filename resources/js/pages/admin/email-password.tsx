import AdminLayout from '@/layouts/admin/admin-layout';
import { Mail, RectangleEllipsis } from 'lucide-react';

export default function EmailPassword() {
    return (
        <AdminLayout active="email-password">
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Email & Password</h1>

                    <p className="mt-2 max-w-2xl text-gray-500">Kelola email dan password akun admin Anda untuk menjaga keamanan akun.</p>
                </div>

                <div className="space-y-5">
                    <div className="rounded-md border bg-white p-6 shadow-sm transition hover:shadow-md">
                        <div className="flex items-start gap-4">
                            <div className="rounded-md bg-blue-100 p-3 text-blue-600">
                                <Mail size={22} />
                            </div>

                            <div className="w-full">
                                <h2 className="text-lg font-semibold text-gray-800">Ganti Email</h2>

                                <p className="mt-1 text-sm text-gray-500">Gunakan email aktif untuk menerima informasi dan notifikasi akun.</p>

                                <div className="mt-5">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">Email Baru</label>

                                    <input
                                        type="email"
                                        placeholder="Masukkan email baru"
                                        required
                                        className="w-full rounded-md border border-gray-300 px-4 py-3 transition outline-none focus:border-black"
                                    />
                                </div>

                                <button className="mt-5 rounded-md bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800">
                                    Simpan Email
                                </button>
                            </div>
                        </div>
                    </div>

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
