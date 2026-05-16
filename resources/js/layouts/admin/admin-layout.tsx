import { Link } from '@inertiajs/react';
import { LogOut, User } from 'lucide-react';
import React from 'react';

interface Props {
    children: React.ReactNode;
    active: 'profile';
}

const menuItems = [{ key: 'profile', label: 'Profil', href: '/admin/profile', icon: <User size={18} /> }];

export default function AdminLayout({ children, active }: Props) {
    return (
        <div className="flex min-h-screen">
            <aside className="flex w-64 flex-col border-r bg-white">
                <div className="flex items-center gap-2 border-b px-6 py-5">
                    <span className="text-lg font-bold">SIMPATI</span>
                </div>

                <nav className="flex flex-1 flex-col gap-1 p-3">
                    {menuItems.map((item) => {
                        const isActive = active === item.key;
                        return (
                            <Link
                                key={item.key}
                                href={item.href}
                                className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm transition ${
                                    isActive ? 'bg-black font-semibold text-white' : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                {item.icon}
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            <div className="flex flex-1 flex-col bg-gray-50">
                <header className="flex items-end justify-end border-b bg-white px-8 py-4">
                    <Link
                        href="/admin/logout"
                        method="post"
                        as="button"
                        className="flex cursor-pointer items-center gap-2 rounded-md border bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:bg-red-600"
                    >
                        <LogOut size={16} />
                        Logout
                    </Link>
                </header>

                <main className="flex-1 p-8">{children}</main>
            </div>
        </div>
    );
}
