import { Link, usePage } from '@inertiajs/react';
import {
    BookOpen,
    ContactRound,
    CreditCard,
    FileText,
    KeyRound,
    Layers,
    LogOut,
    Menu,
    User,
    X,
} from 'lucide-react';
import React, { useState } from 'react';

interface Props {
    children: React.ReactNode;
    active: 'profile' | 'programs' | 'payment' | 'contact' | 'email-password' | 'loa';
}

const menuItems = [
    { key: 'profile',        label: 'Profil Saya',      href: '/student/dashboard/profile',        icon: User },
    { key: 'programs',       label: 'Program Studi',    href: '/student/dashboard/programs',       icon: BookOpen },
    { key: 'payment',        label: 'Pembayaran',       href: '/student/dashboard/payment',        icon: CreditCard },
    { key: 'loa',            label: 'LOA',              href: '/student/dashboard/loa',            icon: FileText },
    { key: 'contact',        label: 'Kontak Admin',     href: '/student/dashboard/contact',        icon: ContactRound },
    { key: 'email-password', label: 'Email & Password', href: '/student/dashboard/email-password', icon: KeyRound },
];

const pageLabels: Record<string, string> = {
    'profile':        'Profil Saya',
    'programs':       'Program Studi',
    'payment':        'Pembayaran',
    'loa':            'LOA',
    'contact':        'Kontak Admin',
    'email-password': 'Email & Password',
};

function LogoutModal({ onClose }: { onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                    <LogOut size={20} className="text-red-600" />
                </div>
                <h2 className="mb-1 text-lg font-bold text-gray-900">Keluar dari akun?</h2>
                <p className="mb-6 text-sm text-gray-500">
                    Anda perlu login kembali untuk mengakses dashboard siswa.
                </p>
                <div className="flex gap-3">
                    <button onClick={onClose}
                        className="flex-1 rounded-lg border border-gray-200 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">
                        Batal
                    </button>
                    <Link href="/student/logout" method="post" as="button"
                        className="flex-1 rounded-lg bg-red-600 py-2 text-sm font-semibold text-white hover:bg-red-700 transition">
                        Keluar
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function StudentLayout({ children, active }: Props) {
    const [showLogout, setShowLogout] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const page = usePage();
    const auth = (page.props as { auth?: { user?: { username?: string; email?: string } } }).auth;
    const username = auth?.user?.username ?? 'Siswa';
    const email = auth?.user?.email ?? '';
    const initials = username.slice(0, 2).toUpperCase();

    const Sidebar = () => (
        <aside className="flex h-screen w-64 flex-col bg-gray-900 text-white">
            <div className="flex items-center gap-3 border-b border-gray-700/60 px-6 py-5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600">
                    <Layers size={16} className="text-white" />
                </div>
                <div>
                    <span className="text-sm font-bold tracking-wide text-white">SIMPATI</span>
                    <p className="text-[10px] text-gray-400 leading-none mt-0.5">Dashboard Siswa</p>
                </div>
            </div>

            <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-3">
                <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-gray-500">Menu</p>
                {menuItems.map((item) => {
                    const isActive = active === item.key;
                    const Icon = item.icon;
                    return (
                        <Link key={item.key} href={item.href}
                            onClick={() => setSidebarOpen(false)}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                                isActive
                                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40'
                                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                            }`}>
                            <Icon size={16} className={isActive ? 'text-white' : 'text-gray-500'} />
                            {item.label}
                            {isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white/70" />}
                        </Link>
                    );
                })}
            </nav>

            <div className="border-t border-gray-700/60 p-3 space-y-1">
                <div className="flex items-center gap-3 rounded-lg px-3 py-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
                        {initials}
                    </div>
                    <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-white">{username}</p>
                        <p className="truncate text-xs text-gray-400">{email}</p>
                    </div>
                </div>
                <button onClick={() => setShowLogout(true)}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-400 hover:bg-red-600/10 hover:text-red-400 transition">
                    <LogOut size={16} />
                    Keluar
                </button>
            </div>
        </aside>
    );

    return (
        <div className="flex h-screen bg-gray-50 text-gray-900">
            <div className="hidden md:flex">
                <Sidebar />
            </div>

            {sidebarOpen && (
                <div className="fixed inset-0 z-40 md:hidden">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
                    <div className="relative z-50 flex h-full">
                        <Sidebar />
                        <button onClick={() => setSidebarOpen(false)} className="absolute right-4 top-4 text-white">
                            <X size={20} />
                        </button>
                    </div>
                </div>
            )}

            <div className="flex flex-1 flex-col overflow-hidden">
                <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <button className="md:hidden rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 transition"
                            onClick={() => setSidebarOpen(true)}>
                            <Menu size={20} />
                        </button>
                        <div>
                            <p className="text-xs text-gray-400">Dashboard Siswa</p>
                            <h2 className="text-sm font-semibold text-gray-800">{pageLabels[active]}</h2>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden sm:block text-right">
                            <p className="text-sm font-semibold text-gray-800">{username}</p>
                            <p className="text-xs text-gray-400">Siswa</p>
                        </div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white shadow">
                            {initials}
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>

            {showLogout && <LogoutModal onClose={() => setShowLogout(false)} />}
        </div>
    );
}
