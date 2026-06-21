import { useForm } from '@inertiajs/react';
import { Layers, Lock, Mail, User } from 'lucide-react';
import React from 'react';

const inputCls = 'block w-full border border-gray-200 px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition placeholder:text-gray-400';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        username: '', email: '', password: '', role: 'customer',
    });

    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); post('/register'); };

    return (
        <div className="flex min-h-screen text-gray-900">
            {/* Left panel */}
            <div className="hidden w-[45%] flex-col justify-between bg-gray-900 p-12 lg:flex">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center bg-emerald-600">
                        <Layers size={18} className="text-white" />
                    </div>
                    <span className="text-lg font-bold tracking-wide text-white">SIMPATI</span>
                </div>

                <div>
                    <h2 className="text-3xl font-bold leading-snug text-white">
                        Mulai perjalanan<br />belajar Anda.
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-gray-400">
                        Daftarkan diri dan temukan program studi independen yang sesuai dengan minat dan karier Anda.
                    </p>

                    <div className="mt-8 space-y-3">
                        {['Pilih program yang sesuai minat', 'Daftar & unggah bukti pembayaran', 'Terima LOA dan mulai belajar'].map((s, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="flex h-6 w-6 shrink-0 items-center justify-center bg-emerald-600/20 text-xs font-bold text-emerald-400">{i + 1}</div>
                                <p className="text-sm text-gray-400">{s}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <p className="text-xs text-gray-600">© {new Date().getFullYear()} SIMPATI. All rights reserved.</p>
            </div>

            {/* Right panel */}
            <div className="flex flex-1 items-center justify-center bg-gray-50 px-6 py-12">
                <div className="w-full max-w-sm">
                    <div className="mb-8 flex items-center gap-2 lg:hidden">
                        <div className="flex h-8 w-8 items-center justify-center bg-emerald-600">
                            <Layers size={16} className="text-white" />
                        </div>
                        <span className="font-bold text-gray-900">SIMPATI</span>
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900">Buat Akun</h1>
                    <p className="mt-1 text-sm text-gray-500">Sudah punya akun?{' '}
                        <a href="/login" className="font-semibold text-emerald-600 hover:text-emerald-700">Masuk sekarang</a>
                    </p>

                    <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username" className="mb-1 block text-xs font-semibold text-gray-600">Nama Pengguna</label>
                            <div className="relative">
                                <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input id="username" type="text" required minLength={6} maxLength={30}
                                    value={data.username}
                                    onChange={(e) => setData('username', e.target.value)}
                                    placeholder="nama_pengguna"
                                    className={inputCls + ' pl-9'} />
                            </div>
                            {errors.username && <p className="mt-1 text-xs text-red-500">{errors.username}</p>}
                        </div>

                        <div>
                            <label htmlFor="email" className="mb-1 block text-xs font-semibold text-gray-600">Email</label>
                            <div className="relative">
                                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input id="email" type="email" required value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="email@contoh.com"
                                    className={inputCls + ' pl-9'} />
                            </div>
                            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                        </div>

                        <div>
                            <label htmlFor="password" className="mb-1 block text-xs font-semibold text-gray-600">Kata Sandi</label>
                            <div className="relative">
                                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input id="password" type="password" required minLength={6} maxLength={30}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Min. 6 karakter"
                                    className={inputCls + ' pl-9'} />
                            </div>
                            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
                        </div>

                        <button type="submit" disabled={processing}
                            className="mt-2 w-full bg-emerald-600 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50 transition">
                            {processing ? 'Memproses...' : 'Daftar'}
                        </button>
                    </form>

                    <div className="mt-8 border-t border-gray-200 pt-6">
                        <a href="/" className="text-xs text-gray-400 hover:text-gray-600 transition">← Kembali ke Beranda</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
