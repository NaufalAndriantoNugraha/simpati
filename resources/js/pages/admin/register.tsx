import { useForm } from '@inertiajs/react';
import React from 'react';

export default function AdminRegister() {
    const { data, setData, post, processing, errors } = useForm({
        username: '',
        email: '',
        password: '',
        role: 'admin',
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post('/admin/register');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6">
                <div className="w-full max-w-md">
                    <div className="border bg-white p-8 shadow-sm">
                        <h1 className="text-center text-2xl font-semibold">
                            Registrasi Admin
                        </h1>
                        <form
                            className="mt-8 flex flex-col gap-4"
                            onSubmit={handleSubmit}
                        >
                            <div>
                                <label htmlFor="username" className="mb-1 block">
                                    Nama Pengguna
                                </label>

                                <input
                                    id="username"
                                    type="text"
                                    required
                                    minLength={6}
                                    maxLength={30}
                                    value={data.username}
                                    onChange={(e) =>
                                        setData('username', e.target.value)
                                    }
                                    className="block w-full border px-3 py-2"
                                />

                                {errors.username && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.username}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="email" className="mb-1 block">
                                    Email
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    className="block w-full border px-3 py-2"
                                />

                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="password" className="mb-1 block">
                                    Kata Sandi
                                </label>

                                <input
                                    id="password"
                                    type="password"
                                    required
                                    minLength={6}
                                    maxLength={30}
                                    value={data.password}
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                    className="block w-full border px-3 py-2"
                                />

                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="mt-2 w-full bg-black py-2 text-white transition hover:bg-gray-800"
                            >
                                {processing ? 'Memproses...' : 'Daftar'}
                            </button>
                        </form>

                        <p className="mt-6 text-center">
                            Sudah memiliki akun admin?{' '}
                            <a
                                href="/admin/login"
                                className="underline"
                            >
                                Silakan masuk.
                            </a>
                        </p>
                    </div>

                    <div className="mt-6 text-center">
                        <a
                            href="/"
                            className="text-sm text-gray-600 hover:text-black"
                        >
                            ← Kembali ke Beranda
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}