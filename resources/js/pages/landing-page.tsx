import {
    Layers,
    Zap,
    ChartColumn,
    Globe,
    UserPlus,
    FileText,
    Search,
    User,
    Users,
    ClipboardCheck,
    FolderKanban,
    Database,
    ChevronDown,
    ArrowUp,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function LandingPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const studentFeatures = [
        {
            title: "Pendaftaran Online",
            description: "Melakukan pendaftaran studi independen secara online.",
            icon: UserPlus,
        },
        {
            title: "Unggah Dokumen",
            description: "Mengunggah dokumen persyaratan pendaftaran.",
            icon: FileText,
        },
        {
            title: "Pantau Status",
            description: "Melihat perkembangan status pendaftaran.",
            icon: Search,
        },
        {
            title: "Kelola Profil",
            description: "Mengubah dan memperbarui data diri.",
            icon: User,
        },
    ];

    const adminFeatures = [
        {
            title: "Kelola Data Mahasiswa",
            description: "Mengelola seluruh data mahasiswa dalam sistem.",
            icon: Users,
        },
        {
            title: "Verifikasi Dokumen",
            description: "Memeriksa dan memvalidasi dokumen pendaftaran.",
            icon: ClipboardCheck,
        },
        {
            title: "Manajemen Pendaftaran",
            description: "Mengelola proses pendaftaran studi independen.",
            icon: FolderKanban,
        },
        {
            title: "Data Terpusat",
            description: "Mengakses seluruh data melalui satu sistem.",
            icon: Database,
        },
    ];

    const advantages = [
        {
            title: "Proses Pendaftaran Cepat",
            description:
                "Pendaftaran studi independen dapat dilakukan secara online tanpa proses administrasi yang rumit.",
            icon: Zap,
        },
        {
            title: "Data Terpusat",
            description:
                "Seluruh data peserta tersimpan dalam satu sistem sehingga mudah diakses dan dikelola.",
            icon: Database,
        },
        {
            title: "Monitoring Lebih Mudah",
            description:
                "Mahasiswa dan admin dapat memantau status pendaftaran dan informasi penting secara real-time.",
            icon: ChartColumn,
        },
        {
            title: "Akses Kapan Saja",
            description:
                "Sistem dapat diakses dari berbagai perangkat selama terhubung dengan internet.",
            icon: Globe,
        },
    ];

    const faqs = [
        {
            question: "Apa itu SIMPATI?",
            answer:
                "SIMPATI adalah Sistem Pendaftaran Studi Independen yang digunakan untuk membantu proses pendaftaran, pengelolaan data peserta, dan monitoring program studi independen secara terpusat.",
        },
        {
            question: "Siapa saja yang dapat menggunakan SIMPATI?",
            answer:
                "SIMPATI dapat digunakan oleh siswa atau mahasiswa yang ingin mendaftar program studi independen, serta pengelola program studi independen yang bertugas mengelola data peserta dan proses pendaftaran.",
        },
        {
            question: "Bagaimana cara melakukan pendaftaran?",
            answer:
                "Pengguna dapat membuat akun, melengkapi profil, mengunggah dokumen yang diperlukan, kemudian mengirimkan formulir pendaftaran melalui sistem.",
        },
        {
            question: "Bagaimana cara mengetahui status pendaftaran?",
            answer:
                "Status pendaftaran dapat dipantau secara langsung melalui dashboard setelah pengguna berhasil masuk ke sistem.",
        },
        {
            question: "Apakah data yang saya unggah aman?",
            answer:
                "Data pengguna disimpan dalam sistem dan hanya dapat diakses oleh pihak yang memiliki hak akses sesuai perannya.",
        },
        {
            question: "Apakah saya dapat memperbarui data yang sudah diisi?",
            answer:
                "Ya, pengguna dapat memperbarui informasi profil dan data pribadi melalui halaman profil selama periode yang diperbolehkan.",
        },
        {
            question: "Apa tugas pengelola program studi independen di SIMPATI?",
            answer:
                "Pengelola program studi independen dapat mengelola data peserta, memverifikasi dokumen, memantau proses pendaftaran, serta mengelola informasi yang berkaitan dengan program studi independen.",
        },
    ];

    return (
        <div className="min-h-screen bg-white text-gray-900">
            <nav className="sticky top-0 z-50 border-b bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-3">
                        <Layers size={30} />
                        <span className="text-2xl font-bold">
                            SIMPATI
                        </span>
                    </div>

                    <div className="hidden items-center gap-8 md:flex">
                        <a
                            href="#home"
                            className="text-lg transition hover:underline underline-offset-4"
                        >
                            Beranda
                        </a>

                        <a
                            href="#keunggulan"
                            className="text-lg transition hover:underline underline-offset-4"
                        >
                            Keunggulan
                        </a>

                        <a
                            href="#fitur"
                            className="text-lg transition hover:underline underline-offset-4"
                        >
                            Fitur-Fitur
                        </a>

                        <a
                            href="#faq"
                            className="text-lg transition hover:underline underline-offset-4"
                        >
                            FAQ
                        </a>
                    </div>

                    <div className="flex items-center gap-3">
                        <a
                            href="/login"
                            className="border border-black px-4 py-2 transition hover:bg-gray-100"
                        >
                            Login
                        </a>

                        <a
                            href="/register"
                            className="bg-black px-4 py-2 text-white transition hover:bg-gray-800"
                        >
                            Daftar
                        </a>
                    </div>
                </div>
            </nav>

            <section
                id="home"
                className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 py-14 md:flex-row"
            >
                <div className="flex-1 text-left">
                    <h1 className="text-4xl font-bold leading-tight md:text-5xl">
                        Sistem Pendaftaran
                        <br />
                        Studi Independen
                    </h1>

                    <p className="mt-6 max-w-xl text-lg text-gray-600 md:text-xl text-justify">
                        Proses pendaftaran secara digital yang mudah dan cepat bagi calon siswa. Serta memudahkan pengelola program studi independen untuk membuat kursus baru dengan cepat serta lebih efisien.
                    </p>

                    <div className="mt-8">
                        <a
                            href="/register"
                            className="inline-block bg-black px-6 py-3 text-white transition hover:bg-gray-800"
                        >
                            Daftar Sekarang
                        </a>
                    </div>
                </div>

                <div className="flex-1">
                    <img
                        src="/images/landing_page.jpg"
                        alt="Studi Independen"
                        className="h-[400px] w-full object-cover shadow-lg"
                    />
                </div>
            </section>

            <section id="keunggulan" className="bg-white py-14">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold text-black">
                            Mengapa Memilih SIMPATI?
                        </h2>

                        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                            Sistem yang dirancang untuk mempermudah proses
                            pendaftaran studi independen secara cepat,
                            terorganisir, dan efisien.
                        </p>
                    </div>

                    <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {advantages.map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.title}
                                    className="group border border-gray-200 bg-white p-6 hover:border-black hover:shadow-lg"
                                >
                                    <div className="flex h-14 w-14 items-center justify-center bg-gray-100 transition-colors group-hover:bg-black">
                                        <Icon
                                            size={28}
                                            className="text-black group-hover:text-white"
                                        />
                                    </div>

                                    <h3 className="mt-5 text-xl font-semibold">
                                        {item.title}
                                    </h3>

                                    <p className="mt-3 text-gray-600">
                                        {item.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section id="fitur" className="bg-gray-50 py-14">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold">
                            Fitur-Fitur SIMPATI
                        </h2>

                        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                            Berbagai fitur yang dirancang untuk membantu
                            mahasiswa dan admin dalam proses studi independen.
                        </p>
                    </div>

                    <div className="mt-16">
                        <h3 className="mb-4 text-2xl font-semibold">
                            Fitur Siswa
                        </h3>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {studentFeatures.map((feature) => {
                                const Icon = feature.icon;

                                return (
                                    <div
                                        key={feature.title}
                                        className="border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
                                    >
                                        <div className="mb-4 flex h-12 w-12 items-center justify-center bg-gray-100">
                                            <Icon size={24} />
                                        </div>

                                        <h4 className="font-semibold">
                                            {feature.title}
                                        </h4>

                                        <p className="mt-2 text-sm text-gray-600">
                                            {feature.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="mt-10">
                        <h3 className="mb-8 text-2xl font-semibold">
                            Fitur Admin
                        </h3>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {adminFeatures.map((feature) => {
                                const Icon = feature.icon;

                                return (
                                    <div
                                        key={feature.title}
                                        className="border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
                                    >
                                        <div className="mb-4 flex h-12 w-12 items-center justify-center bg-gray-100">
                                            <Icon size={24} />
                                        </div>

                                        <h4 className="font-semibold">
                                            {feature.title}
                                        </h4>

                                        <p className="mt-2 text-sm text-gray-600">
                                            {feature.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            <section id="faq" className="py-24">
                <div className="mx-auto max-w-4xl px-6">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold">
                            Pertanyaan yang Sering Diajukan
                        </h2>

                        <p className="mt-4 text-lg text-gray-600">
                            Temukan jawaban untuk pertanyaan yang paling sering ditanyakan
                            mengenai penggunaan SIMPATI.
                        </p>
                    </div>

                    <div className="mt-12 space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="overflow-hidden border border-gray-200"
                            >
                                <button
                                    onClick={() =>
                                        setOpenIndex(openIndex === index ? null : index)
                                    }
                                    className="flex w-full items-center justify-between px-6 py-5 text-left"
                                >
                                    <span className="font-medium">
                                        {faq.question}
                                    </span>

                                    <ChevronDown
                                        className={`transition-transform ${openIndex === index ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>

                                {openIndex === index && (
                                    <div className="border-t border-gray-200 px-6 py-4 text-gray-600">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <footer className="bg-black py-8 text-white">
                <div className="mx-auto max-w-7xl px-6 text-center">
                    <h3 className="text-md tracking-wide">
                        SIMPATI -
                        Sistem Pendaftaran Studi Independen
                    </h3>
                    <p className="mt-4 text-md text-gray-500">
                        © 2026 SIMPATI. All Rights Reserved.
                    </p>
                </div>
            </footer>
            {
                showScrollTop && (
                    <button
                        onClick={() =>
                            window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                            })
                        }
                        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-black text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-gray-800"
                        aria-label="Kembali ke atas"
                    >
                        <ArrowUp size={20} />
                    </button>
                )
            }
        </div>
    );
}