export default function Register() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md rounded-xl border p-8 shadow-md">
                <h1 className="mb-6 text-center text-2xl font-semibold">Masuk Akun</h1>
                <form className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="email" className="mb-1 block">
                            Email
                        </label>
                        <input name="email" id="email" type="email" className="block w-full rounded border px-3 py-2" />
                    </div>

                    <div>
                        <div className="flex justify-between">
                            <label htmlFor="password" className="mb-1 block">
                                Kata Sandi
                            </label>
                            <a href="/forgot-password" className="underline">
                                Lupa kata sandi?
                            </a>
                        </div>

                        <input name="password" id="password" type="password" className="block w-full rounded border px-3 py-2" />
                    </div>

                    <button type="submit" className="mt-2 w-full cursor-pointer rounded bg-black py-2 text-white transition hover:bg-gray-800">
                        Masuk
                    </button>
                </form>

                <p className="mt-6 text-center">
                    Belum memiliki akun?{' '}
                    <a href="/register" className="cursor-pointer underline">
                        Silahkan daftar.
                    </a>
                </p>
            </div>
        </div>
    );
}
