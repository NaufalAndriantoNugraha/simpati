import { ChevronDown, ChevronUp, ChevronsUpDown, Search, SlidersHorizontal } from 'lucide-react';
import React, { useMemo, useState } from 'react';

export interface Column<T> {
    key: string;
    label: string;
    sortable?: boolean;
    align?: 'left' | 'center' | 'right';
    render?: (row: T, index: number) => React.ReactNode;
}

export interface FilterOption {
    label: string;
    value: string;
}

interface DataTableProps<T extends Record<string, unknown>> {
    data: T[];
    columns: Column<T>[];
    searchKeys?: string[];
    searchPlaceholder?: string;
    filterKey?: string;
    filterOptions?: FilterOption[];
    emptyMessage?: string;
    pageSizeOptions?: number[];
    actions?: (row: T) => React.ReactNode;
}

type SortDir = 'asc' | 'desc' | null;

export function DataTable<T extends Record<string, unknown>>({
    data,
    columns,
    searchKeys = [],
    searchPlaceholder = 'Cari...',
    filterKey,
    filterOptions,
    emptyMessage = 'Tidak ada data ditemukan.',
    pageSizeOptions = [10, 25, 50],
    actions,
}: DataTableProps<T>) {
    const [search, setSearch] = useState('');
    const [filterValue, setFilterValue] = useState('');
    const [sortKey, setSortKey] = useState<string | null>(null);
    const [sortDir, setSortDir] = useState<SortDir>(null);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(pageSizeOptions[0]);

    function handleSort(key: string) {
        if (sortKey !== key) { setSortKey(key); setSortDir('asc'); }
        else if (sortDir === 'asc') setSortDir('desc');
        else { setSortKey(null); setSortDir(null); }
        setPage(1);
    }

    const filtered = useMemo(() => {
        let rows = [...data];

        if (search.trim()) {
            const q = search.toLowerCase();
            rows = rows.filter((row) =>
                searchKeys.some((k) => String(getNestedValue(row, k) ?? '').toLowerCase().includes(q)),
            );
        }

        if (filterKey && filterValue) {
            rows = rows.filter((row) => String(getNestedValue(row, filterKey) ?? '') === filterValue);
        }

        if (sortKey && sortDir) {
            rows.sort((a, b) => {
                const av = String(getNestedValue(a, sortKey) ?? '');
                const bv = String(getNestedValue(b, sortKey) ?? '');
                return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
            });
        }

        return rows;
    }, [data, search, filterKey, filterValue, sortKey, sortDir]);

    const totalPages = Math.ceil(filtered.length / pageSize) || 1;
    const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

    function SortIcon({ col }: { col: Column<T> }) {
        if (!col.sortable) return null;
        if (sortKey !== col.key) return <ChevronsUpDown size={13} className="ml-1 inline text-gray-400" />;
        if (sortDir === 'asc') return <ChevronUp size={13} className="ml-1 inline text-emerald-600" />;
        return <ChevronDown size={13} className="ml-1 inline text-emerald-600" />;
    }

    const alignClass = { left: 'text-left', center: 'text-center', right: 'text-right' };

    return (
        <div className="overflow-hidden border border-gray-200 bg-white shadow-sm">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-3 border-b border-gray-100 px-5 py-4">
                {/* Search */}
                <div className="relative flex-1 min-w-[200px]">
                    <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder={searchPlaceholder}
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                        className="w-full border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-sm text-gray-700 outline-none focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100 transition"
                    />
                </div>

                {/* Filter */}
                {filterKey && filterOptions && (
                    <div className="relative flex items-center gap-2">
                        <SlidersHorizontal size={15} className="text-gray-400" />
                        <select
                            value={filterValue}
                            onChange={(e) => { setFilterValue(e.target.value); setPage(1); }}
                            className="border border-gray-200 bg-gray-50 py-2 pl-3 pr-8 text-sm text-gray-700 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition"
                        >
                            <option value="">Semua Status</option>
                            {filterOptions.map((o) => (
                                <option key={o.value} value={o.value}>{o.label}</option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Count */}
                <span className="ml-auto text-xs text-gray-400">
                    {filtered.length} data
                </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray-100 bg-gray-50">
                            <th className="w-10 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">#</th>
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    onClick={() => col.sortable && handleSort(col.key)}
                                    className={`px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 ${col.sortable ? 'cursor-pointer select-none hover:text-emerald-600' : ''} ${alignClass[col.align ?? 'left']}`}
                                >
                                    {col.label}
                                    <SortIcon col={col} />
                                </th>
                            ))}
                            {actions && <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-400">Aksi</th>}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {paginated.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length + (actions ? 2 : 1)} className="px-5 py-12 text-center">
                                    <div className="flex flex-col items-center gap-2 text-gray-400">
                                        <Search size={32} className="opacity-30" />
                                        <p className="text-sm">{emptyMessage}</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            paginated.map((row, idx) => (
                                <tr key={idx} className="group hover:bg-emerald-50/40 transition-colors">
                                    <td className="px-5 py-3.5 text-xs text-gray-400">
                                        {(page - 1) * pageSize + idx + 1}
                                    </td>
                                    {columns.map((col) => (
                                        <td key={col.key} className={`px-5 py-3.5 text-gray-700 ${alignClass[col.align ?? 'left']}`}>
                                            {col.render ? col.render(row, idx) : String(getNestedValue(row, col.key) ?? '-')}
                                        </td>
                                    ))}
                                    {actions && (
                                        <td className="px-5 py-3.5 text-right">
                                            {actions(row)}
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {filtered.length > 0 && (
                <div className="flex items-center justify-between border-t border-gray-100 px-5 py-3">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>Tampilkan</span>
                        <select
                            value={pageSize}
                            onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
                            className="border border-gray-200 px-1.5 py-1 text-xs outline-none focus:border-emerald-400"
                        >
                            {pageSizeOptions.map((n) => <option key={n} value={n}>{n}</option>)}
                        </select>
                        <span>per halaman</span>
                    </div>

                    <div className="flex items-center gap-1">
                        <span className="mr-2 text-xs text-gray-400">
                            {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, filtered.length)} dari {filtered.length}
                        </span>
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
                        >
                            ‹ Prev
                        </button>
                        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                            const n = totalPages <= 5 ? i + 1 : page <= 3 ? i + 1 : page >= totalPages - 2 ? totalPages - 4 + i : page - 2 + i;
                            return (
                                <button
                                    key={n}
                                    onClick={() => setPage(n)}
                                    className={`min-w-[28px] px-2 py-1 text-xs transition ${n === page ? 'bg-emerald-600 text-white font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}
                                >
                                    {n}
                                </button>
                            );
                        })}
                        <button
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
                        >
                            Next ›
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
    return path.split('.').reduce<unknown>((acc, key) => {
        if (acc && typeof acc === 'object') return (acc as Record<string, unknown>)[key];
        return undefined;
    }, obj);
}
