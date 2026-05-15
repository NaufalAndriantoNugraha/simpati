export default function FillBiodata() {
    const provinsi = [
        'Aceh',
        'Sumatera Utara',
        'Sumatera Barat',
        'Riau',
        'Jambi',
        'Sumatera Selatan',
        'Bengkulu',
        'Lampung',
        'Kepulauan Bangka Belitung',
        'Kepulauan Riau',
        'DKI Jakarta',
        'Jawa Barat',
        'Jawa Tengah',
        'DI Yogyakarta',
        'Jawa Timur',
        'Banten',
        'Bali',
        'Nusa Tenggara Barat',
        'Nusa Tenggara Timur',
        'Kalimantan Barat',
        'Kalimantan Tengah',
        'Kalimantan Selatan',
        'Kalimantan Timur',
        'Kalimantan Utara',
        'Sulawesi Utara',
        'Sulawesi Tengah',
        'Sulawesi Selatan',
        'Sulawesi Tenggara',
        'Gorontalo',
        'Sulawesi Barat',
        'Maluku',
        'Maluku Utara',
        'Papua Barat',
        'Papua',
    ];

    const semester = Array.from({ length: 14 }, (_, i) => i + 1);

    return (
        <div className="flex min-h-screen items-center justify-center py-10">
            <div className="w-full max-w-2xl rounded-xl border p-8 shadow-md">
                <h1 className="mb-6 text-center text-2xl font-semibold">Isi Biodata Anda</h1>
                <form className="flex flex-col gap-5">
                    {/* Nama Lengkap */}
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Nama Lengkap <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="nama_lengkap"
                            type="text"
                            placeholder="Masukkan nama lengkap Anda"
                            className="block w-full rounded border px-3 py-2 text-sm"
                        />
                    </div>

                    {/* Jenis Kelamin */}
                    <div className="grid grid-cols-2 gap-3">
                        <label className="flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 text-sm has-[:checked]:border-black has-[:checked]:bg-gray-100 has-[:checked]:text-black">
                            <input type="radio" name="jenis_kelamin" value="L" className="accent-black" />
                            Laki-laki
                        </label>
                        <label className="flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 text-sm has-[:checked]:border-black has-[:checked]:bg-gray-100 has-[:checked]:text-black">
                            <input type="radio" name="jenis_kelamin" value="P" className="accent-black" />
                            Perempuan
                        </label>
                    </div>

                    {/* Tanggal Lahir & Tempat Lahir */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Tanggal Lahir <span className="text-red-500">*</span>
                            </label>
                            <input name="tanggal_lahir" type="date" className="block w-full rounded border px-3 py-2 text-sm" />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Tempat Lahir <span className="text-red-500">*</span>
                            </label>
                            <input
                                name="tempat_lahir"
                                type="text"
                                placeholder="Contoh: Surabaya"
                                className="block w-full rounded border px-3 py-2 text-sm"
                            />
                        </div>
                    </div>

                    {/* Kota & Provinsi */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Kota/Kabupaten <span className="text-red-500">*</span>
                            </label>
                            <input
                                name="kota"
                                type="text"
                                placeholder="Masukkan kota/kabupaten"
                                className="block w-full rounded border px-3 py-2 text-sm"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Provinsi <span className="text-red-500">*</span>
                            </label>
                            <select name="provinsi" className="block w-full rounded border px-3 py-2 text-sm">
                                <option value="">Pilih Provinsi</option>
                                {provinsi.map((p) => (
                                    <option key={p} value={p}>
                                        {p}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Nomor Telepon */}
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Nomor Telepon <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="nomor_telepon"
                            type="tel"
                            placeholder="+62 89130050790"
                            className="block w-full rounded border px-3 py-2 text-sm"
                        />
                    </div>

                    {/* Nama Universitas */}
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Nama Universitas / Institusi <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="universitas"
                            type="text"
                            placeholder="Contoh: Universitas Negeri Surabaya"
                            className="block w-full rounded border px-3 py-2 text-sm"
                        />
                    </div>

                    {/* Program Studi & Semester */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Program Studi <span className="text-red-500">*</span>
                            </label>
                            <input
                                name="prodi"
                                type="text"
                                placeholder="Contoh: Teknik Informatika"
                                className="block w-full rounded border px-3 py-2 text-sm"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Semester <span className="text-red-500">*</span>
                            </label>
                            <select name="semester" className="block w-full rounded border px-3 py-2 text-sm">
                                <option value="">Pilih Semester</option>
                                {semester.map((s) => (
                                    <option key={s} value={s}>
                                        Semester {s}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="mt-2 w-full cursor-pointer rounded bg-black py-2 text-sm text-white transition hover:bg-gray-800"
                    >
                        Simpan
                    </button>
                </form>
            </div>
        </div>
    );
}
