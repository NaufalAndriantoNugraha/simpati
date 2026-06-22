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
    const [navScrolled, setNavScrolled] = useState(false);
    const [activeScene, setActiveScene] = useState(0);
    const [animKey, setAnimKey] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
            setNavScrolled(window.scrollY > window.innerHeight * 0.7 - 68);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const durations = [3500, 5000, 4000];
        const id = setTimeout(() => {
            setActiveScene((s) => (s + 1) % 3);
            setAnimKey((k) => k + 1);
        }, durations[activeScene]);
        return () => clearTimeout(id);
    }, [activeScene]);

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
            <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${navScrolled ? "border-b bg-white/95 shadow-sm backdrop-blur-md" : "border-b border-transparent bg-transparent"}`}>
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <div className={`flex items-center gap-3 transition-colors duration-300 ${navScrolled ? "text-emerald-900" : "text-white"}`}>
                        <Layers size={30} />
                        <span className="text-2xl font-bold">SIMPATI</span>
                    </div>

                    <div className="hidden items-center gap-8 md:flex">
                        {["#home", "#keunggulan", "#fitur", "#faq"].map((href, i) => (
                            <a
                                key={href}
                                href={href}
                                className={`text-lg transition-colors duration-300 hover:underline underline-offset-4 ${navScrolled ? "text-emerald-900" : "text-white/90 hover:text-white"}`}
                            >
                                {["Beranda", "Keunggulan", "Fitur-Fitur", "FAQ"][i]}
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        <a
                            href="/login"
                            className={`px-4 py-2 transition-all duration-300 ${navScrolled ? "border border-emerald-600 text-emerald-600 hover:bg-emerald-50" : "border border-white/50 text-white hover:bg-white/10"}`}
                        >
                            Login
                        </a>
                        <a
                            href="/register"
                            className={`px-4 py-2 transition-all duration-300 ${navScrolled ? "bg-emerald-600 text-white hover:bg-emerald-700" : "bg-white text-gray-900 hover:bg-white/90"}`}
                        >
                            Daftar
                        </a>
                    </div>
                </div>
            </nav>

            {/* Keyframe animations */}
            <style>{`
                @keyframes zoomOutGrid {
                    from { transform: scale(2.2); }
                    to   { transform: scale(1); }
                }
                @keyframes marqueeRight {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes zoomInHero {
                    from { transform: scale(1); }
                    to   { transform: scale(1.5); }
                }
            `}</style>

            <section
                id="home"
                style={{
                    position: "relative",
                    height: "70vh",
                    minHeight: 520,
                    overflow: "hidden",
                    background: "#0a0a0a",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                {/* ── Scene backgrounds ── */}
                <div style={{ position: "absolute", inset: 0 }}>

                    {/* Scene 1: zoom-out grid */}
                    <div style={{ position: "absolute", inset: 0, opacity: activeScene === 0 ? 1 : 0, transition: "opacity 0.8s ease" }}>
                        <div
                            key={activeScene === 0 ? animKey : "s1"}
                            style={{
                                position: "absolute", top: 32, bottom: 32, left: 32, right: 32,
                                display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8,
                                transformOrigin: "center center",
                                animation: activeScene === 0 ? "zoomOutGrid 5s cubic-bezier(.25,.46,.45,.94) both" : "none",
                            }}
                        >
                            {["/images/scene1-1.jpg", "/images/scene1-2.webp", "/images/scene1-3.jpg"].map((src, i) => (
                                <div key={i} style={{ borderRadius: 12, overflow: "hidden" }}>
                                    <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Scene 2: marquee horizontal */}
                    <div style={{
                        position: "absolute", inset: 0,
                        opacity: activeScene === 1 ? 1 : 0, transition: "opacity 0.8s ease",
                        overflow: "hidden",
                        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
                        maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
                    }}>
                        <div
                            key={activeScene === 1 ? animKey : "s2"}
                            style={{
                                display: "flex", gap: 12, width: "max-content",
                                animation: activeScene === 1 ? "marqueeRight 20s linear infinite" : "none",
                            }}
                        >
                            {/* original + duplicate for seamless loop */}
                            {[...Array(2)].flatMap((_, loop) =>
                                [
                                    "/images/scene2-1.png",
                                    "/images/scene2-2.jpeg",
                                    "/images/scene2-3.jpg",
                                    "/images/scene2-4.jpg",
                                    "/images/scene2-5.jpg",
                                ].map((src, i) => (
                                    <div key={`${loop}-${i}`} style={{ width: 420, height: "70vh", minHeight: 520, flexShrink: 0, overflow: "hidden" }}>
                                        <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Scene 3: hero zoom-in */}
                    <div style={{ position: "absolute", inset: 0, opacity: activeScene === 2 ? 1 : 0, transition: "opacity 0.8s ease", overflow: "hidden" }}>
                        <div
                            key={activeScene === 2 ? animKey : "s3"}
                            style={{
                                width: "100%", height: "100%",
                                animation: activeScene === 2 ? "zoomInHero 6s cubic-bezier(.25,.46,.45,.94) both" : "none",
                            }}
                        >
                            <img src="/images/landing_page.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                    </div>
                </div>

                {/* Overlay gelap */}
                <div style={{
                    position: "absolute", inset: 0, zIndex: 1,
                    background: "linear-gradient(to bottom, rgba(10,5,5,0.5) 0%, rgba(10,5,5,0.25) 45%, rgba(10,5,5,0.75) 100%)",
                }} />

                {/* Konten hero */}
                <div style={{ position: "relative", zIndex: 2, width: "100%" }}>
                    <div className="mx-auto max-w-4xl px-6 text-center">
                        <div className="mb-6 inline-flex items-center gap-2 border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 backdrop-blur-sm">
                            <span className="h-2 w-2 animate-pulse bg-emerald-400" />
                            <span className="text-xs font-semibold tracking-wide text-white/80">
                                Platform Pendaftaran Digital
                            </span>
                        </div>

                        <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl" style={{ textShadow: "0 4px 40px rgba(0,0,0,0.7)" }}>
                            Sistem Pendaftaran
                            <br />Studi Independen
                        </h1>

                        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60 md:text-xl">
                            Proses pendaftaran secara digital yang mudah dan cepat bagi calon siswa serta pengelola program studi independen.
                        </p>

                        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                            <a
                                href="/register"
                                className="inline-flex items-center gap-2 bg-emerald-500 px-7 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-emerald-600 hover:shadow-xl"
                            >
                                Daftar Sekarang
                            </a>
                            <a
                                href="#keunggulan"
                                className="inline-flex items-center gap-2 border border-white/30 px-7 py-3 font-semibold text-white transition hover:border-emerald-400 hover:bg-emerald-500/10 hover:-translate-y-0.5"
                            >
                                Pelajari Lebih Lanjut
                            </a>
                        </div>
                    </div>
                </div>

                {/* Progress dots */}
                <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", zIndex: 3, display: "flex", gap: 8 }}>
                    {[0, 1, 2].map((i) => (
                        <button
                            key={i}
                            onClick={() => { setActiveScene(i); setAnimKey(k => k + 1); }}
                            style={{
                                width: 8, height: 8, borderRadius: "50%", border: "none", cursor: "pointer", padding: 0,
                                background: activeScene === i ? "white" : "rgba(255,255,255,0.3)",
                                transform: activeScene === i ? "scale(1.3)" : "scale(1)",
                                transition: "all 0.3s",
                            }}
                        />
                    ))}
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
                                    className="group border border-gray-200 bg-white p-6 hover:border-emerald-500 hover:shadow-lg"
                                >
                                    <div className="flex h-14 w-14 items-center justify-center bg-gray-100 transition-colors group-hover:bg-emerald-600">
                                        <Icon
                                            size={28}
                                            className="text-gray-900 group-hover:text-white"
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
                                        <div className="mb-4 flex h-12 w-12 items-center justify-center bg-emerald-100">
                                            <Icon size={24} className="text-emerald-600" />
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
                                        <div className="mb-4 flex h-12 w-12 items-center justify-center bg-emerald-100">
                                            <Icon size={24} className="text-emerald-600" />
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
                                className="overflow-hidden border border-gray-200 hover:border-emerald-300"
                            >
                                <button
                                    onClick={() =>
                                        setOpenIndex(openIndex === index ? null : index)
                                    }
                                    className="flex w-full items-center justify-between px-6 py-5 text-left hover:bg-emerald-50/50"
                                >
                                    <span className="font-medium">
                                        {faq.question}
                                    </span>

                                    <ChevronDown
                                        className={`transition-transform text-emerald-600 ${openIndex === index ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>

                                {openIndex === index && (
                                    <div className="border-t border-gray-200 bg-emerald-50/30 px-6 py-4 text-gray-600">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <footer className="bg-emerald-900 py-8 text-white">
                <div className="mx-auto max-w-7xl px-6 text-center">
                    <h3 className="text-md tracking-wide">
                        SIMPATI -
                        Sistem Pendaftaran Studi Independen
                    </h3>
                    <p className="mt-4 text-md text-emerald-100">
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
                        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center bg-emerald-600 text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-700"
                        aria-label="Kembali ke atas"
                    >
                        <ArrowUp size={20} />
                    </button>
                )
            }
        </div>
    );
}