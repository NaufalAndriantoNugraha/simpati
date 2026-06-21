import { StatCard } from '@/components/admin/stat-card';
import AdminLayout from '@/layouts/admin/admin-layout';
import { PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';
import { KeyRound, Mail, Shield, User } from 'lucide-react';

interface UserData {
    username: string;
    email: string;
    role: string;
    created_at?: string;
}

interface AdminProfileProps extends PageProps {
    auth: { user: UserData };
}

export default function Profile() {
    const { auth } = usePage<AdminProfileProps>().props;
    const user = auth?.user;
    const initials = (user?.username ?? 'A').slice(0, 2).toUpperCase();

    const joinedDate = user?.created_at
        ? new Date(user.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
        : '—';

    return (
        <AdminLayout active="profile">
            {/* Hero card */}
            <div className="relative mb-6 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 text-white shadow-xl">
                {/* Decorative blur */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 bg-emerald-600/20 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-10 left-1/3 h-48 w-48 bg-emerald-400/10 blur-3xl" />

                <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                    {/* Avatar */}
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center bg-emerald-600 text-3xl font-black text-white shadow-lg ring-4 ring-white/10">
                        {initials}
                    </div>

                    <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                            <h1 className="text-2xl font-bold">{user?.username ?? '—'}</h1>
                            <span className="inline-flex items-center gap-1 bg-emerald-500/20 px-3 py-0.5 text-xs font-semibold text-emerald-200 ring-1 ring-emerald-400/30">
                                <Shield size={11} />
                                Administrator
                            </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-300">{user?.email ?? '—'}</p>
                        <p className="mt-2 text-xs text-gray-400">Bergabung sejak {joinedDate}</p>
                    </div>
                </div>
            </div>

            {/* Stat cards */}
            <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                <StatCard label="Role" value="Admin" icon={<Shield size={20} />} color="emerald" subtitle="Akses penuh" />
                <StatCard label="Username" value={user?.username ?? '—'} icon={<User size={20} />} color="slate" />
                <StatCard label="Bergabung" value={joinedDate} icon={<Shield size={20} />} color="blue" />
            </div>

            {/* Info detail */}
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="border border-gray-100 bg-white p-5 shadow-sm">
                    <div className="mb-4 flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center bg-emerald-50">
                            <User size={15} className="text-emerald-600" />
                        </div>
                        <h3 className="text-sm font-semibold text-gray-700">Informasi Akun</h3>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between bg-gray-50 px-4 py-3">
                            <span className="text-xs font-medium text-gray-500">Username</span>
                            <span className="text-sm font-semibold text-gray-800">{user?.username ?? '—'}</span>
                        </div>
                        <div className="flex items-center justify-between bg-gray-50 px-4 py-3">
                            <span className="text-xs font-medium text-gray-500">Role</span>
                            <span className="text-sm font-semibold text-gray-800 capitalize">{user?.role ?? 'admin'}</span>
                        </div>
                    </div>
                </div>

                <div className="border border-gray-100 bg-white p-5 shadow-sm">
                    <div className="mb-4 flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center bg-emerald-50">
                            <Mail size={15} className="text-emerald-600" />
                        </div>
                        <h3 className="text-sm font-semibold text-gray-700">Kontak</h3>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between bg-gray-50 px-4 py-3">
                            <span className="text-xs font-medium text-gray-500">Email</span>
                            <span className="text-sm font-semibold text-gray-800">{user?.email ?? '—'}</span>
                        </div>
                    </div>
                </div>

                <div className="border border-amber-100 bg-amber-50 p-5 sm:col-span-2">
                    <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-amber-100">
                            <KeyRound size={15} className="text-amber-600" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-sm font-semibold text-amber-800">Keamanan Akun</h3>
                            <p className="mt-1 text-xs text-amber-700">
                                Perbarui email dan password secara berkala untuk menjaga keamanan akun Anda.
                            </p>
                        </div>
                        <a
                            href="/admin/dashboard/email-password"
                            className="shrink-0 bg-amber-600 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-700 transition"
                        >
                            Ubah Kredensial
                        </a>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
