import StudentLayout from '@/layouts/student/student-layout';
import { usePage } from '@inertiajs/react';
import { GraduationCap, KeyRound, Mail, MapPin, Shield, User } from 'lucide-react';

interface StudentProfile {
    full_name: string; gender: string; birth_date: string; birth_place: string;
    address: string; city: string; province: string; phone_number: string;
    institution_name: string; major: string; semester: number;
}

interface PageProps {
    auth: { user: { username: string; email: string } };
    profile: StudentProfile;
    [key: string]: unknown;
}

function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
            <span className="text-xs font-medium text-gray-500">{label}</span>
            <span className="text-sm font-semibold text-gray-800">{value || '—'}</span>
        </div>
    );
}

function InfoCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
    return (
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50">
                    {icon}
                </div>
                <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
            </div>
            <div className="space-y-2">{children}</div>
        </div>
    );
}

export default function Profile() {
    const { auth, profile } = usePage<PageProps>().props;
    const user = auth?.user;
    const initials = (profile?.full_name ?? user?.username ?? 'S').slice(0, 2).toUpperCase();

    const joinedDate = '—';
    const genderLabel = profile?.gender === 'male' ? 'Laki-laki' : profile?.gender === 'female' ? 'Perempuan' : '—';

    return (
        <StudentLayout active="profile">
            {/* Hero card */}
            <div className="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 text-white shadow-xl">
                <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-emerald-600/20 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-10 left-1/3 h-48 w-48 rounded-full bg-emerald-400/10 blur-3xl" />

                <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-3xl font-black text-white shadow-lg ring-4 ring-white/10">
                        {initials}
                    </div>
                    <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                            <h1 className="text-2xl font-bold">{profile?.full_name ?? user?.username ?? '—'}</h1>
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-0.5 text-xs font-semibold text-emerald-200 ring-1 ring-emerald-400/30">
                                <Shield size={11} />
                                Siswa
                            </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-300">{user?.email ?? '—'}</p>
                        {profile?.institution_name && (
                            <p className="mt-1 text-xs text-gray-400">{profile.institution_name} · Semester {profile.semester}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Info cards */}
            <div className="grid gap-4 sm:grid-cols-2">
                <InfoCard icon={<User size={15} className="text-emerald-600" />} title="Akun">
                    <InfoRow label="Username" value={user?.username} />
                    <InfoRow label="Email" value={user?.email} />
                </InfoCard>

                <InfoCard icon={<User size={15} className="text-emerald-600" />} title="Data Pribadi">
                    <InfoRow label="Nama Lengkap" value={profile?.full_name} />
                    <InfoRow label="Jenis Kelamin" value={genderLabel} />
                    <InfoRow label="Tempat Lahir" value={profile?.birth_place} />
                    <InfoRow label="Tanggal Lahir" value={profile?.birth_date} />
                    <InfoRow label="Telepon" value={profile?.phone_number} />
                </InfoCard>

                <InfoCard icon={<MapPin size={15} className="text-emerald-600" />} title="Alamat">
                    <InfoRow label="Alamat" value={profile?.address} />
                    <InfoRow label="Kota" value={profile?.city} />
                    <InfoRow label="Provinsi" value={profile?.province} />
                </InfoCard>

                <InfoCard icon={<GraduationCap size={15} className="text-emerald-600" />} title="Pendidikan">
                    <InfoRow label="Institusi" value={profile?.institution_name} />
                    <InfoRow label="Program Studi" value={profile?.major} />
                    <InfoRow label="Semester" value={profile?.semester ? `Semester ${profile.semester}` : '—'} />
                </InfoCard>

                <div className="rounded-xl border border-amber-100 bg-amber-50 p-5 sm:col-span-2">
                    <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100">
                            <KeyRound size={15} className="text-amber-600" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-sm font-semibold text-amber-800">Keamanan Akun</h3>
                            <p className="mt-1 text-xs text-amber-700">Perbarui email dan password secara berkala untuk menjaga keamanan akun Anda.</p>
                        </div>
                        <a href="/student/dashboard/email-password"
                            className="shrink-0 rounded-lg bg-amber-600 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-700 transition">
                            Ubah Kredensial
                        </a>
                    </div>
                </div>
            </div>
        </StudentLayout>
    );
}
