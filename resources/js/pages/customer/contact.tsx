import StudentLayout from '@/layouts/student/student-layout';
import { MessageSquarePlus } from 'lucide-react';

const contacts = [
    { name: 'Ahmad Azmiy Fawwaz',      phone: '+62 821-3140-0557', wa: '6282131400557' },
    { name: 'Didik Sujatmiko',          phone: '+62 877-6049-8320', wa: '6287760498320' },
    { name: 'Lukman Adi Wijaya',        phone: '+62 851-3608-5201', wa: '6285136085201' },
    { name: 'Muhammad Ridwan',          phone: '+62 821-2514-8174', wa: '6282125148174' },
    { name: 'Naufal Andrianto Nugraha', phone: '+62 821-3235-0796', wa: '6282132350796' },
];

function initials(name: string) {
    return name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase();
}

export default function Contact() {
    return (
        <StudentLayout active="contact">
            <div className="mb-6">
                <h1 className="text-xl font-bold text-gray-900">Kontak Admin</h1>
                <p className="text-sm text-gray-500">
                    Hubungi tim pengembang jika Anda mengalami kesulitan atau menemukan hal yang tidak sesuai.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {contacts.map((contact) => (
                    <div key={contact.name} className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition">
                        <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                                {initials(contact.name)}
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-800">{contact.name}</p>
                                <p className="text-xs text-gray-500">{contact.phone}</p>
                            </div>
                        </div>
                        <a href={`https://wa.me/${contact.wa}`} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-1.5 rounded-lg bg-green-500 px-3 py-2 text-xs font-semibold text-white hover:bg-green-600 transition">
                            <MessageSquarePlus size={14} /> WhatsApp
                        </a>
                    </div>
                ))}
            </div>
        </StudentLayout>
    );
}
