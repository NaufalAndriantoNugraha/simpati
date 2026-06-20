import React from 'react';

interface StatCardProps {
    label: string;
    value: string | number;
    icon: React.ReactNode;
    color?: 'indigo' | 'emerald' | 'amber' | 'red' | 'blue' | 'slate';
    subtitle?: string;
}

const colorMap = {
    indigo: { bg: 'bg-emerald-50', icon: 'bg-emerald-100 text-emerald-600', value: 'text-emerald-700' },
    emerald: { bg: 'bg-emerald-50', icon: 'bg-emerald-100 text-emerald-600', value: 'text-emerald-700' },
    amber:   { bg: 'bg-amber-50',   icon: 'bg-amber-100 text-amber-600',   value: 'text-amber-700' },
    red:     { bg: 'bg-red-50',     icon: 'bg-red-100 text-red-600',       value: 'text-red-700' },
    blue:    { bg: 'bg-blue-50',    icon: 'bg-blue-100 text-blue-600',     value: 'text-blue-700' },
    slate:   { bg: 'bg-slate-50',   icon: 'bg-slate-100 text-slate-600',   value: 'text-slate-700' },
};

export function StatCard({ label, value, icon, color = 'indigo', subtitle }: StatCardProps) {
    const c = colorMap[color];
    return (
        <div className={`flex items-center gap-4 rounded-xl border border-gray-100 ${c.bg} p-5 shadow-sm`}>
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${c.icon}`}>
                {icon}
            </div>
            <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500">{label}</p>
                <p className={`mt-0.5 text-2xl font-bold ${c.value}`}>{value}</p>
                {subtitle && <p className="mt-0.5 text-xs text-gray-400">{subtitle}</p>}
            </div>
        </div>
    );
}
