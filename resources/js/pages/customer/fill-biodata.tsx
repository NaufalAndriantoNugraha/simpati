import { useForm } from '@inertiajs/react';
import { BookOpen, GraduationCap, Layers, MapPin, User } from 'lucide-react';
import React from 'react';

const provinsi = [
    'Aceh','Sumatera Utara','Sumatera Barat','Riau','Jambi','Sumatera Selatan',
    'Bengkulu','Lampung','Kepulauan Bangka Belitung','Kepulauan Riau',
    'DKI Jakarta','Jawa Barat','Jawa Tengah','DI Yogyakarta','Jawa Timur','Banten',
    'Bali','Nusa Tenggara Barat','Nusa Tenggara Timur',
    'Kalimantan Barat','Kalimantan Tengah','Kalimantan Selatan','Kalimantan Timur','Kalimantan Utara',
    'Sulawesi Utara','Sulawesi Tengah','Sulawesi Selatan','Sulawesi Tenggara','Gorontalo','Sulawesi Barat',
    'Maluku','Maluku Utara','Papua Barat','Papua',
];

const inputCls = 'block w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition placeholder:text-gray-400';
const labelCls = 'mb-1 block text-xs font-semibold text-gray-600';

function SectionCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
    return (
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50">
                    {icon}
                </div>
                <h2 className="text-sm font-bold text-gray-800">{title}</h2>
            </div>
            {children}
        </div>
    );
}

export default function FillBiodata() {
    const { data, setData, post, processing, errors } = useForm({
        full_name: '', gender: '', birth_date: '', birth_place: '',
        address: '', city: '', province: '', phone_number: '',
        institution_name: '', major: '', semester: '',
    });

    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); post('/fill-biodata'); };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            {/* Top bar */}
            <header className="border-b border-gray-200 bg-white">
                <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600">
                            <Layers size={16} className="text-white" />
                        </div>
                        <span className="font-bold text-gray-900">SIMPATI</span>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                        Langkah 1 dari 1 — Isi Biodata
                    </span>
                </div>
            </header>

            <main className="mx-auto max-w-3xl px-6 py-8">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Lengkapi Biodata Anda</h1>
                    <p className="mt-1 text-sm text-gray-500">Data ini digunakan untuk proses pendaftaran program studi independen.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Data Pribadi */}
                    <SectionCard icon={<User size={17} className="text-emerald-600" />} title="Data Pribadi">
                        <div className="space-y-4">
                            <div>
                                <label className={labelCls}>Nama Lengkap <span className="text-red-500">*</span></label>
                                <input type="text" value={data.full_name}
                                    onChange={(e) => setData('full_name', e.target.value)}
                                    placeholder="Masukkan nama lengkap sesuai KTP"
                                    className={inputCls} />
                                {errors.full_name && <p className="mt-1 text-xs text-red-500">{errors.full_name}</p>}
                            </div>

                            <div>
                                <label className={labelCls}>Jenis Kelamin <span className="text-red-500">*</span></label>
                                <div className="grid grid-cols-2 gap-3">
                                    {[{ value: 'male', label: 'Laki-laki' }, { value: 'female', label: 'Perempuan' }].map((opt) => (
                                        <label key={opt.value}
                                            className={`flex cursor-pointer items-center gap-2.5 rounded-lg border px-4 py-2.5 text-sm transition ${
                                                data.gender === opt.value
                                                    ? 'border-emerald-400 bg-emerald-50 font-semibold text-emerald-700'
                                                    : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                                            }`}>
                                            <input type="radio" name="gender" value={opt.value}
                                                checked={data.gender === opt.value}
                                                onChange={(e) => setData('gender', e.target.value)}
                                                className="accent-emerald-600" />
                                            {opt.label}
                                        </label>
                                    ))}
                                </div>
                                {errors.gender && <p className="mt-1 text-xs text-red-500">{errors.gender}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={labelCls}>Tanggal Lahir <span className="text-red-500">*</span></label>
                                    <input type="date" value={data.birth_date}
                                        onChange={(e) => setData('birth_date', e.target.value)}
                                        className={inputCls} />
                                    {errors.birth_date && <p className="mt-1 text-xs text-red-500">{errors.birth_date}</p>}
                                </div>
                                <div>
                                    <label className={labelCls}>Tempat Lahir <span className="text-red-500">*</span></label>
                                    <input type="text" value={data.birth_place}
                                        onChange={(e) => setData('birth_place', e.target.value)}
                                        placeholder="Contoh: Surabaya"
                                        className={inputCls} />
                                    {errors.birth_place && <p className="mt-1 text-xs text-red-500">{errors.birth_place}</p>}
                                </div>
                            </div>

                            <div>
                                <label className={labelCls}>Nomor Telepon <span className="text-red-500">*</span></label>
                                <input type="tel" value={data.phone_number}
                                    onChange={(e) => setData('phone_number', e.target.value)}
                                    placeholder="+62 812 3456 7890"
                                    className={inputCls} />
                                {errors.phone_number && <p className="mt-1 text-xs text-red-500">{errors.phone_number}</p>}
                            </div>
                        </div>
                    </SectionCard>

                    {/* Alamat */}
                    <SectionCard icon={<MapPin size={17} className="text-emerald-600" />} title="Alamat">
                        <div className="space-y-4">
                            <div>
                                <label className={labelCls}>Alamat Lengkap <span className="text-red-500">*</span></label>
                                <textarea value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    placeholder="Jl. Nama Jalan, No. Rumah, RT/RW"
                                    rows={3}
                                    className={inputCls + ' resize-none'} />
                                {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={labelCls}>Kota/Kabupaten <span className="text-red-500">*</span></label>
                                    <input type="text" value={data.city}
                                        onChange={(e) => setData('city', e.target.value)}
                                        placeholder="Contoh: Surabaya"
                                        className={inputCls} />
                                    {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city}</p>}
                                </div>
                                <div>
                                    <label className={labelCls}>Provinsi <span className="text-red-500">*</span></label>
                                    <select value={data.province}
                                        onChange={(e) => setData('province', e.target.value)}
                                        className={inputCls}>
                                        <option value="">Pilih Provinsi</option>
                                        {provinsi.map((p) => <option key={p} value={p}>{p}</option>)}
                                    </select>
                                    {errors.province && <p className="mt-1 text-xs text-red-500">{errors.province}</p>}
                                </div>
                            </div>
                        </div>
                    </SectionCard>

                    {/* Pendidikan */}
                    <SectionCard icon={<GraduationCap size={17} className="text-emerald-600" />} title="Pendidikan">
                        <div className="space-y-4">
                            <div>
                                <label className={labelCls}>Nama Universitas / Institusi <span className="text-red-500">*</span></label>
                                <input type="text" value={data.institution_name}
                                    onChange={(e) => setData('institution_name', e.target.value)}
                                    placeholder="Contoh: Universitas Negeri Surabaya"
                                    className={inputCls} />
                                {errors.institution_name && <p className="mt-1 text-xs text-red-500">{errors.institution_name}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={labelCls}>Program Studi <span className="text-red-500">*</span></label>
                                    <input type="text" value={data.major}
                                        onChange={(e) => setData('major', e.target.value)}
                                        placeholder="Contoh: Teknik Informatika"
                                        className={inputCls} />
                                    {errors.major && <p className="mt-1 text-xs text-red-500">{errors.major}</p>}
                                </div>
                                <div>
                                    <label className={labelCls}>Semester <span className="text-red-500">*</span></label>
                                    <select value={data.semester}
                                        onChange={(e) => setData('semester', e.target.value)}
                                        className={inputCls}>
                                        <option value="">Pilih Semester</option>
                                        {Array.from({ length: 14 }, (_, i) => i + 1).map((s) => (
                                            <option key={s} value={s}>Semester {s}</option>
                                        ))}
                                    </select>
                                    {errors.semester && <p className="mt-1 text-xs text-red-500">{errors.semester}</p>}
                                </div>
                            </div>
                        </div>
                    </SectionCard>

                    {/* Submit */}
                    <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-white px-6 py-4 shadow-sm">
                        <p className="text-xs text-gray-500">Pastikan semua data sudah benar sebelum menyimpan.</p>
                        <button type="submit" disabled={processing}
                            className="rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50 transition">
                            {processing ? 'Menyimpan...' : 'Simpan Biodata'}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}
