import StudentLayout from '@/layouts/student/student-layout';
import { usePage } from '@inertiajs/react';
import { Download, FileText } from 'lucide-react';

interface Loa { id: number; file: string }
interface Program { name: string }
interface Registration { id: number; program: Program; loa: Loa | null }
interface PageProps { registrations: Registration[];[key: string]: unknown }

export default function LoaPage() {
    const { registrations } = usePage<PageProps>().props;

    return (
        <StudentLayout active="loa">
            <div className="mb-6">
                <h1 className="text-xl font-bold text-gray-900">LOA</h1>
                <p className="text-sm text-gray-500">Download Letter of Acceptance untuk program studi yang Anda ikuti.</p>
            </div>

            {registrations.length === 0 ? (
                <div className="border border-gray-100 bg-white p-12 text-center shadow-sm">
                    <FileText size={32} className="mx-auto mb-3 text-gray-300" />
                    <p className="text-sm text-gray-400">Belum ada LOA yang tersedia.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {registrations.map((reg) => (
                        <div key={reg.id} className="flex items-center justify-between border border-gray-100 bg-white px-6 py-4 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className={`flex h-10 w-10 shrink-0 items-center justify-center ${reg.loa ? 'bg-emerald-50' : 'bg-gray-100'}`}>
                                    <FileText size={18} className={reg.loa ? 'text-emerald-600' : 'text-gray-400'} />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">{reg.program.name}</p>
                                    <span className={`inline-flex items-center px-2 py-0.5 text-xs font-semibold ring-1 ${reg.loa
                                        ? 'bg-emerald-50 text-emerald-700 ring-emerald-200'
                                        : 'bg-amber-50 text-amber-700 ring-amber-200'
                                        }`}>
                                        {reg.loa ? 'Tersedia' : 'Belum Tersedia'}
                                    </span>
                                </div>
                            </div>

                            {reg.loa ? (
                                <a href={'/storage/' + reg.loa.file} target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700 transition">
                                    <Download size={13} /> Download
                                </a>
                            ) : (
                                <span className="text-xs text-gray-400">Menunggu admin</span>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </StudentLayout>
    );
}
