import { useForm } from '@inertiajs/react';
import { Layers, Lock, Mail } from 'lucide-react';
import React from 'react';

const inputCls = 'block w-full border border-gray-200 px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition placeholder:text-gray-400';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({ email: '', password: '' });

    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); post('/login'); };

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
                        Selamat datang<br />kembali.
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-gray-400">
                        Masuk ke akun Anda untuk melanjutkan pendaftaran program studi independen bersama SIMPATI.
                    </p>
                </div>

                <p className="text-xs text-gray-600">© {new Date().getFullYear()} SIMPATI. All rights reserved.</p>
            </div>

            {/* Right panel */}
            <div className="flex flex-1 items-center justify-center bg-gray-50 px-6 py-12">
                <div className="w-full max-w-sm">
                    {/* Mobile logo */}
                    <div className="mb-8 flex items-center gap-2 lg:hidden">
                        <div className="flex h-8 w-8 items-center justify-center bg-emerald-600">
                            <Layers size={16} className="text-white" />
                        </div>
                        <span className="font-bold text-gray-900">SIMPATI</span>
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900">Masuk Akun</h1>
                    <p className="mt-1 text-sm text-gray-500">Belum punya akun?{' '}
                        <a href="/register" className="font-semibold text-emerald-600 hover:text-emerald-700">Daftar sekarang</a>
                    </p>

                    <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
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
                            <div className="mb-1 flex items-center justify-between">
                                <label htmlFor="password" className="text-xs font-semibold text-gray-600">Kata Sandi</label>
                                <a href="/forgot-password" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700">Lupa kata sandi?</a>
                            </div>
                            <div className="relative">
                                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input id="password" type="password" required value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••"
                                    className={inputCls + ' pl-9'} />
                            </div>
                            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
                        </div>

                        <button type="submit" disabled={processing}
                            className="mt-2 w-full bg-emerald-600 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50 transition">
                            {processing ? 'Memproses...' : 'Masuk'}
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
