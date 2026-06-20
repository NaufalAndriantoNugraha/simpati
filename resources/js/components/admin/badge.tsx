type BadgeVariant = 'pending' | 'accepted' | 'rejected' | 'draft' | 'open' | 'closed';

const config: Record<BadgeVariant, { label: string; className: string }> = {
    pending:  { label: 'Menunggu', className: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200' },
    accepted: { label: 'Diterima', className: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200' },
    rejected: { label: 'Ditolak',  className: 'bg-red-50 text-red-600 ring-1 ring-red-200' },
    draft:    { label: 'Draft',    className: 'bg-gray-100 text-gray-600 ring-1 ring-gray-200' },
    open:     { label: 'Buka',     className: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200' },
    closed:   { label: 'Tutup',    className: 'bg-slate-100 text-slate-600 ring-1 ring-slate-200' },
};

export function StatusBadge({ status }: { status: string }) {
    const c = config[status as BadgeVariant] ?? { label: status, className: 'bg-gray-100 text-gray-600 ring-1 ring-gray-200' };
    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${c.className}`}>
            {c.label}
        </span>
    );
}
