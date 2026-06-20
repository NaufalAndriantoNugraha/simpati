import { useForm } from '@inertiajs/react';
import { Layers } from 'lucide-react';
import React from 'react';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        username: '',
        email: '',
        password: '',
        role: 'customer',
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post('/register');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6">
                <div className="w-full max-w-md">
                    <div className="border bg-white p-8 shadow-sm">
                        <h1 className="text-center text-2xl font-semibold">
                            Registrasi Akun
                        </h1>
                        <form
                            className="mt-8 flex flex-col gap-4"
                            onSubmit={handleSubmit}
                        >
                            <div>
                                <label
                                    htmlFor="username"
                                    className="mb-1 block"
                                >
                                    Nama Pengguna
                                </label>

                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    minLength={6}
                                    maxLength={30}
                                    value={data.username}
                                    onChange={(event) =>
                                        setData(
                                            'username',
                                            event.target.value,
                                        )
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
                                <label
                                    htmlFor="email"
                                    className="mb-1 block"
                                >
                                    Email
                                </label>

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={data.email}
                                    onChange={(event) =>
                                        setData(
                                            'email',
                                            event.target.value,
                                        )
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
                                <label
                                    htmlFor="password"
                                    className="mb-1 block"
                                >
                                    Kata Sandi
                                </label>

                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    minLength={6}
                                    maxLength={30}
                                    value={data.password}
                                    onChange={(event) =>
                                        setData(
                                            'password',
                                            event.target.value,
                                        )
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
                                className="mt-2 w-full cursor-pointer bg-black py-2 text-white transition hover:bg-gray-800"
                            >
                                {processing
                                    ? 'Memproses...'
                                    : 'Daftar'}
                            </button>
                        </form>

                        <p className="mt-6 text-center">
                            Sudah memiliki akun?{' '}
                            <a
                                href="/login"
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