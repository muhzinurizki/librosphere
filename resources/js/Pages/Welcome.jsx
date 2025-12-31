import { Link, Head } from "@inertiajs/react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    BookOpen,
    BookOpenText,
    ChevronRight,
    LayoutGrid,
    Info,
    Clock,
    MapPin,
    Mail,
    Phone,
    ArrowUpRight,
    Star,
    Sparkles,
    CheckCircle,
    UserPlus,
    BookMarked,
    Library,
    Calendar,
    Quote,
    Menu,
    X,
} from "lucide-react";

export default function Welcome({ auth, stats, categories, featuredBooks }) {
    const [isOpen, setIsOpen] = useState(false);
    // Variants untuk animasi staggered
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    return (
        <>
            <Head title="LibroSphere - Portal Perpustakaan Digital" />

            <div className="min-h-screen bg-[#FDFDFD] text-slate-900 selection:bg-indigo-100">
                {/* 1. Header & Navigasi */}
                <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-20 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-2.5"
                            >
                                <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-200">
                                    <BookOpenText className="text-white w-6 h-6" />
                                </div>
                                <span className="text-2xl font-black text-indigo-600 tracking-tighter">
                                    LibroSphere
                                </span>
                            </motion.div>

                            <div className="hidden md:flex items-center space-x-10">
                                {["Katalog", "Kategori", "Prosedur"].map(
                                    (item) => (
                                        <a
                                            key={item}
                                            href={`#${item.toLowerCase()}`}
                                            className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors relative group"
                                        >
                                            {item}
                                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full" />
                                        </a>
                                    )
                                )}
                            </div>

                            <div className="hidden md:flex items-center gap-4">
                                {auth.user ? (
                                    <Link
                                        href={route("dashboard")}
                                        className="flex items-center gap-2 px-5 py-2.5 bg-indigo-50 text-indigo-600 rounded-full font-bold hover:bg-indigo-100 transition-all"
                                    >
                                        Dashboard{" "}
                                        <ArrowUpRight className="w-4 h-4" />
                                    </Link>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={route("login")}
                                            className="px-5 py-2.5 text-sm font-bold text-slate-700 hover:text-indigo-600 transition"
                                        >
                                            Masuk
                                        </Link>
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <Link
                                                href={route("register")}
                                                className="px-6 py-2.5 bg-slate-900 text-white rounded-full text-sm font-bold hover:bg-indigo-600 transition shadow-xl shadow-slate-200"
                                            >
                                                Jadi Anggota
                                            </Link>
                                        </motion.div>
                                    </div>
                                )}
                            </div>

                            {/* Mobile Menu Button */}
                            <div className="md:hidden flex items-center">
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="p-2 text-slate-600 hover:text-indigo-600 transition-colors"
                                >
                                    {isOpen ? (
                                        <X className="w-6 h-6" />
                                    ) : (
                                        <Menu className="w-6 h-6" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu Dropdown */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
                            >
                                <div className="px-4 pt-4 pb-6 space-y-4">
                                    {["Katalog", "Kategori", "Prosedur"].map(
                                        (item) => (
                                            <a
                                                key={item}
                                                href={`#${item.toLowerCase()}`}
                                                className="block text-base font-semibold text-slate-600 hover:text-indigo-600 hover:bg-slate-50 px-4 py-2 rounded-lg transition-colors"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                {item}
                                            </a>
                                        )
                                    )}
                                    <div className="pt-4 border-t border-slate-100 space-y-3 px-4">
                                        {auth.user ? (
                                            <Link
                                                href={route("dashboard")}
                                                className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-indigo-50 text-indigo-600 rounded-xl font-bold hover:bg-indigo-100 transition-all"
                                            >
                                                Dashboard{" "}
                                                <ArrowUpRight className="w-4 h-4" />
                                            </Link>
                                        ) : (
                                            <>
                                                <Link
                                                    href={route("login")}
                                                    className="block w-full text-center px-5 py-3 text-sm font-bold text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded-xl transition"
                                                >
                                                    Masuk
                                                </Link>
                                                <Link
                                                    href={route("register")}
                                                    className="block w-full text-center px-6 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-indigo-600 transition shadow-lg shadow-slate-200"
                                                >
                                                    Jadi Anggota
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </nav>

                <main>
                    {/* 2. Hero Section */}
                    <section className="relative pt-10 pb-32 overflow-hidden">
                        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
                            {/* Kolon Kiri: Teks & Search */}
                            <div className="text-left">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-widest mb-6"
                                >
                                    <Sparkles className="w-4 h-4" /> Evolusi
                                    Perpustakaan Digital
                                </motion.div>

                                <motion.h1
                                    className="text-6xl lg:text-8xl font-black text-slate-900 mb-6 leading-tight"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    Baca{" "}
                                    <span className="text-indigo-600">
                                        Apa Saja
                                    </span>{" "}
                                    <br /> Dimana Saja.
                                </motion.h1>

                                <motion.p className="text-lg text-slate-500 mb-10 max-w-lg leading-relaxed">
                                    Platform literasi modern yang menghubungkan
                                    Anda dengan ribuan penulis dunia dalam
                                    hitungan detik.
                                </motion.p>

                                <div className="relative group max-w-xl">
                                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                    <input
                                        type="text"
                                        placeholder="Mau baca apa hari ini?"
                                        className="w-full pl-14 pr-6 py-5 rounded-2xl border-none bg-white shadow-xl focus:ring-2 focus:ring-indigo-600 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Kolom Kanan: Floating Cards (Visual) */}
                            <div className="relative hidden lg:block h-[500px]">
                                {/* Card 1 */}
                                <motion.div
                                    animate={{ y: [0, -20, 0], rotate: -5 }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                    className="absolute top-10 left-10 w-48 h-64 bg-white p-2 rounded-2xl shadow-2xl z-20"
                                >
                                    <div className="w-full h-full bg-slate-200 rounded-xl overflow-hidden">
                                        <img
                                            src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </motion.div>

                                {/* Card 2 */}
                                <motion.div
                                    animate={{ y: [0, 20, 0], rotate: 5 }}
                                    transition={{
                                        duration: 5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: 0.5,
                                    }}
                                    className="absolute bottom-10 right-20 w-56 h-72 bg-white p-2 rounded-2xl shadow-2xl z-10"
                                >
                                    <div className="w-full h-full bg-slate-200 rounded-xl overflow-hidden">
                                        <img
                                            src="https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </motion.div>

                                {/* Accent Ornaments */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-100 rounded-full blur-[80px] -z-10" />
                            </div>
                        </div>
                    </section>

                    {/* Featured Books */}
                    <section id="katalog" className="py-24 bg-white">
                        <div className="max-w-7xl mx-auto px-4">
                            {/* Header Section Tetap Sama */}
                            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
                                <div className="max-w-xl">
                                    <div className="flex items-center gap-2 text-indigo-600 font-bold mb-3 uppercase tracking-widest text-xs">
                                        <Star className="w-4 h-4 fill-indigo-600" />{" "}
                                        Kurasi Pilihan
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
                                        Koleksi Terpopuler{" "}
                                        <span className="text-slate-300">
                                            Bulan Ini.
                                        </span>
                                    </h2>
                                </div>
                                <Link
                                    href={route("katalog.index")}
                                    className="group flex items-center gap-2 font-bold text-slate-900 hover:text-indigo-600 transition-all border-b-2 border-slate-100 pb-1"
                                >
                                    Jelajahi Katalog{" "}
                                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>

                            {/* Dynamic Grid Layout */}
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                                {/* 1. Large Spotlight Book (Ambil 5 Kolom) */}
                                {featuredBooks && featuredBooks[0] && (
                                    <motion.div
                                        variants={itemVariants}
                                        className="md:col-span-5 relative group cursor-pointer"
                                    >
                                        <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden bg-slate-100 shadow-2xl shadow-indigo-100/50">
                                            <img
                                                src={featuredBooks[0].cover}
                                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 via-transparent to-transparent opacity-90" />
                                            <div className="absolute bottom-10 left-10 right-10">
                                                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-bold mb-4 inline-block tracking-widest uppercase">
                                                    Pilihan Utama
                                                </span>
                                                <h3 className="text-3xl font-black text-white mb-2 leading-tight">
                                                    {featuredBooks[0].title}
                                                </h3>
                                                <p className="text-indigo-100 font-medium mb-6">
                                                    {featuredBooks[0].author}
                                                </p>
                                                <button className="px-6 py-3 bg-white text-indigo-600 rounded-2xl font-bold text-sm shadow-xl">
                                                    Pinjam Sekarang
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* 2. Side Grid (Ambil 7 Kolom) */}
                                <div className="md:col-span-7 grid grid-cols-2 gap-8">
                                    {featuredBooks?.slice(1, 5).map((book) => (
                                        <motion.div
                                            key={book.id}
                                            variants={itemVariants}
                                            whileHover={{ y: -8 }}
                                            className="group"
                                        >
                                            <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden mb-5 bg-slate-100 shadow-sm transition-all group-hover:shadow-xl group-hover:shadow-indigo-100/30">
                                                <img
                                                    src={book.cover}
                                                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <button className="p-4 bg-white rounded-full text-indigo-600 shadow-xl transform scale-75 group-hover:scale-100 transition-transform">
                                                        <BookOpen className="w-6 h-6" />
                                                    </button>
                                                </div>
                                            </div>
                                            <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                                                {book.title}
                                            </h4>
                                            <p className="text-sm text-slate-500 font-medium">
                                                {book.author}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Prosedur Peminjaman Section */}
                    {/* 5. Prosedur Peminjaman Section */}
                    <section
                        id="prosedur"
                        className="py-32 bg-white relative overflow-hidden"
                    >
                        {/* Dekorasi Latar Belakang */}
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-50/50 rounded-full blur-[120px] -z-0 translate-x-1/2 -translate-y-1/2" />

                        <div className="max-w-7xl mx-auto px-4 relative z-10">
                            <div className="text-center max-w-3xl mx-auto mb-24">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-widest mb-6"
                                >
                                    <Info className="w-4 h-4" /> Panduan Layanan
                                </motion.div>
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6"
                                >
                                    Cara Pinjam di{" "}
                                    <span className="text-indigo-600">
                                        LibroSphere
                                    </span>
                                </motion.h2>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    className="text-lg text-slate-500 leading-relaxed"
                                >
                                    Kami menyederhanakan proses birokrasi agar
                                    Anda bisa fokus pada satu hal:{" "}
                                    <span className="font-bold text-slate-800">
                                        Membaca.
                                    </span>
                                </motion.p>
                            </div>

                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="grid md:grid-cols-4 gap-8 relative"
                            >
                                {/* Garis Penghubung (Hanya muncul di Desktop) */}
                                <div className="absolute top-1/2 left-0 w-full h-0.5 border-t-2 border-dashed border-slate-100 -translate-y-1/2 hidden md:block -z-0" />

                                {[
                                    {
                                        step: "01",
                                        title: "Daftar Anggota",
                                        desc: "Buat akun resmi LibroSphere untuk akses penuh ke ribuan katalog kami.",
                                        icon: UserPlus,
                                        color: "bg-blue-500 shadow-blue-100",
                                    },
                                    {
                                        step: "02",
                                        title: "Pilih Koleksi",
                                        desc: "Cari buku favoritmu melalui fitur pencarian pintar atau kategori pilihan.",
                                        icon: BookMarked,
                                        color: "bg-indigo-500 shadow-indigo-100",
                                    },
                                    {
                                        step: "03",
                                        title: "Ajukan Pinjam",
                                        desc: "Tentukan durasi pinjam dan konfirmasi pesanan dalam satu kali klik.",
                                        icon: CheckCircle,
                                        color: "bg-violet-500 shadow-violet-100",
                                    },
                                    {
                                        step: "04",
                                        title: "Mulai Membaca",
                                        desc: "Ambil buku fisik di gerai atau baca versi digital langsung dari perangkat.",
                                        icon: Library,
                                        color: "bg-emerald-500 shadow-emerald-100",
                                    },
                                ].map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        variants={itemVariants}
                                        whileHover={{ y: -15 }}
                                        className="relative p-10 rounded-[3rem] bg-white border border-slate-50 shadow-sm hover:shadow-2xl hover:shadow-indigo-100/40 transition-all duration-500 group overflow-hidden z-10"
                                    >
                                        {/* Angka Langkah Raksasa di Background */}
                                        <span className="absolute -bottom-6 -right-2 text-9xl font-black text-slate-50 group-hover:text-indigo-50 transition-colors select-none -z-0">
                                            {item.step}
                                        </span>

                                        <div
                                            className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mb-10 shadow-xl group-hover:rotate-12 transition-transform duration-500 relative z-10`}
                                        >
                                            <item.icon className="text-white w-8 h-8" />
                                        </div>

                                        <div className="relative z-10">
                                            <h4 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">
                                                {item.title}
                                            </h4>
                                            <p className="text-slate-500 leading-relaxed font-medium">
                                                {item.desc}
                                            </p>
                                        </div>

                                        {/* Dot Aksen */}
                                        <div className="absolute top-8 right-8 w-3 h-3 rounded-full bg-slate-50 group-hover:bg-indigo-400 transition-colors" />
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* CTA Box */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="mt-20 p-1 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-[2.5rem] shadow-2xl shadow-indigo-200"
                            >
                                <div className="bg-white rounded-[2.4rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                                    <div className="relative z-10">
                                        <h3 className="text-3xl font-black text-slate-900 mb-3">
                                            Siap memulai petualanganmu?
                                        </h3>
                                        <p className="text-slate-500 text-lg">
                                            Dapatkan akses instan ke 10,000+
                                            koleksi buku berkualitas hari ini.
                                        </p>
                                    </div>
                                    <Link
                                        href={route("register")}
                                        className="relative z-10 px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black hover:bg-slate-900 transition-all shadow-xl shadow-indigo-200 active:scale-95"
                                    >
                                        Daftar Sekarang — Gratis
                                    </Link>

                                    {/* Dekorasi halus di dalam CTA */}
                                    <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-50 rounded-full blur-3xl -mr-10 -mt-10" />
                                </div>
                            </motion.div>
                        </div>
                    </section>

                    {/* --- News & Event Section --- */}
                    <section
                        className="py-32 bg-white relative overflow-hidden"
                        id="event"
                    >
                        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-50/50 rounded-full blur-[120px] -z-0 -translate-x-1/2 translate-y-1/2" />

                        <div className="max-w-7xl mx-auto px-4 relative z-10">
                            {/* Header Section */}
                            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                                <div className="max-w-2xl">
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        className="flex items-center gap-2 text-indigo-600 font-bold tracking-widest text-xs uppercase mb-4"
                                    >
                                        <div className="w-8 h-[2px] bg-indigo-600" />
                                        <Calendar className="w-4 h-4" /> Agenda
                                        Literasi
                                    </motion.div>
                                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                                        Kegiatan Terbaru di <br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                                            LibroSphere Community
                                        </span>
                                    </h2>
                                </div>

                                <Link
                                    href={route("acara.index")}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="group px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center gap-3 shadow-xl shadow-slate-200 transition-all hover:bg-indigo-600"
                                >
                                    Lihat Semua Acara
                                    <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                                </Link>
                            </div>

                            {/* Event List Layout */}
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="flex flex-col gap-6"
                            >
                                {[
                                    {
                                        day: "12",
                                        month: "Jan",
                                        title: "Bedah Buku: Filosofi Teras",
                                        desc: "Diskusi mendalam mengenai penerapan stoisisme dalam kehidupan modern bersama Henry Manampiring. Terbuka untuk umum dan anggota.",
                                        img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800",
                                        category: "Talkshow",
                                        time: "14:00 WIB",
                                        location: "Aula Utama / Zoom",
                                    },
                                    {
                                        day: "15",
                                        month: "Jan",
                                        title: "Workshop Menulis Digital",
                                        desc: "Kuasai teknik storytelling dan SEO untuk membangun audiens di era digital. Dapatkan sertifikat resmi dari LibroSphere.",
                                        img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800",
                                        category: "Workshop",
                                        time: "09:00 WIB",
                                        location: "Creative Hub",
                                    },
                                    {
                                        day: "20",
                                        month: "Jan",
                                        title: "Lomba Resensi Nasional",
                                        desc: "Tunjukkan kemampuan analisismu dan menangkan koleksi buku eksklusif serta hadiah jutaan rupiah bagi pemenang utama.",
                                        img: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=800",
                                        category: "Competition",
                                        time: "08:00 WIB",
                                        location: "Online",
                                    },
                                ].map((event, i) => (
                                    <motion.div
                                        key={i}
                                        variants={itemVariants}
                                        whileHover={{ x: 15 }}
                                        className="group relative flex flex-col md:flex-row items-center gap-8 p-6 md:p-8 rounded-[3rem] bg-slate-50/50 border border-transparent hover:border-indigo-100 hover:bg-white hover:shadow-2xl hover:shadow-indigo-100/20 transition-all duration-500"
                                    >
                                        {/* Tanggal & Visual Section */}
                                        <div className="relative w-full md:w-80 h-56 shrink-0 rounded-[2.5rem] overflow-hidden">
                                            <img
                                                src={event.img}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                alt={event.title}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                                            {/* Floating Date Badge */}
                                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl text-center min-w-[70px]">
                                                <span className="block text-2xl font-black text-indigo-600 leading-none">
                                                    {event.day}
                                                </span>
                                                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                                                    {event.month}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Info Content */}
                                        <div className="flex-1 py-2">
                                            <div className="flex flex-wrap items-center gap-4 mb-4">
                                                <span className="px-4 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-wider">
                                                    {event.category}
                                                </span>
                                                <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                                                    <Clock className="w-4 h-4" />{" "}
                                                    {event.time}
                                                </div>
                                                <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                                                    <MapPin className="w-4 h-4" />{" "}
                                                    {event.location}
                                                </div>
                                            </div>

                                            <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors leading-tight">
                                                {event.title}
                                            </h3>

                                            <p className="text-slate-500 text-lg leading-relaxed mb-6 max-w-3xl line-clamp-2">
                                                {event.desc}
                                            </p>

                                            <div className="flex items-center gap-6">
                                                <button className="flex items-center gap-2 text-indigo-600 font-black text-sm uppercase tracking-wider">
                                                    Amankan Slot
                                                    <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                                                </button>
                                                <div className="h-1 w-1 rounded-full bg-slate-300" />
                                                <span className="text-slate-400 text-sm font-medium italic">
                                                    Sisa 12 tempat lagi
                                                </span>
                                            </div>
                                        </div>

                                        {/* Hover Decoration Arrow */}
                                        <div className="absolute top-10 right-10 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
                                            <div className="p-4 bg-indigo-600 text-white rounded-full shadow-lg shadow-indigo-200">
                                                <ArrowUpRight className="w-6 h-6" />
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </section>

                    {/* --- Quote of the Day Section --- */}
                    <section className="py-32 relative overflow-hidden bg-white">
                        {/* Dekorasi Latar Belakang - Tipografi Besar Samar */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
                            <span className="text-[20rem] font-black tracking-tighter">
                                READ
                            </span>
                        </div>

                        {/* Floating Ornaments */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute top-20 left-[15%] text-indigo-200/50 hidden md:block"
                        >
                            <BookOpen className="w-12 h-12 rotate-12" />
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 20, 0] }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute bottom-20 right-[15%] text-violet-200/50 hidden md:block"
                        >
                            <Sparkles className="w-10 h-10 -rotate-12" />
                        </motion.div>

                        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="mb-12"
                            >
                                <span className="inline-block p-1 rounded-full bg-slate-100 mb-6">
                                    <div className="px-4 py-1 bg-white rounded-full shadow-sm">
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                                            Inspirasi Hari Ini
                                        </span>
                                    </div>
                                </span>
                            </motion.div>

                            <motion.blockquote
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="relative"
                            >
                                {/* Tanda Kutip Besar Transparan */}
                                <span className="absolute -top-10 -left-4 text-8xl md:text-9xl text-slate-100 font-serif -z-10">
                                    “
                                </span>

                                <p className="text-3xl md:text-5xl font-serif italic font-medium text-slate-800 mb-12 leading-tight md:px-10">
                                    Membaca adalah alat paling dasar untuk
                                    meraih hidup yang baik.
                                </p>

                                <footer className="flex flex-col items-center">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="h-[1px] w-8 bg-indigo-200" />
                                        <div className="w-2 h-2 rounded-full bg-indigo-600" />
                                        <div className="h-[1px] w-8 bg-indigo-200" />
                                    </div>

                                    <cite className="not-italic">
                                        <span className="block font-black text-slate-900 tracking-[0.2em] uppercase text-sm mb-1">
                                            Joseph Addison
                                        </span>
                                        <span className="text-indigo-500 text-xs font-bold tracking-widest uppercase opacity-80">
                                            Esais & Penyair Terkemuka
                                        </span>
                                    </cite>
                                </footer>

                                {/* Tanda Kutip Penutup */}
                                <span className="absolute -bottom-20 -right-4 text-8xl md:text-9xl text-slate-100 font-serif -z-10 rotate-180">
                                    “
                                </span>
                            </motion.blockquote>
                        </div>
                    </section>
                </main>

                {/* Footer Section */}
                <footer className="bg-slate-950 text-slate-400 pt-24 pb-12">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 pb-20 border-b border-slate-800/50">
                            <div className="col-span-1 md:col-span-1">
                                <div className="flex items-center gap-2 mb-8">
                                    <div className="bg-indigo-600 p-1.5 rounded-lg">
                                        <BookOpen className="text-white w-5 h-5" />
                                    </div>
                                    <span className="text-2xl font-bold text-white tracking-tighter">
                                        LibroSphere
                                    </span>
                                </div>
                                <p className="text-base leading-relaxed mb-8">
                                    Mewujudkan akses literasi digital yang
                                    mudah, cepat, dan terpercaya bagi seluruh
                                    lapisan masyarakat Indonesia.
                                </p>
                            </div>

                            {[
                                {
                                    title: "Jam Operasional",
                                    icon: Clock,
                                    items: [
                                        "Senin - Jumat: 08.00 - 17.00",
                                        "Sabtu: 08.00 - 13.00",
                                        "Minggu: Tutup",
                                    ],
                                },
                                {
                                    title: "Kontak Kami",
                                    icon: Phone,
                                    items: [
                                        "📍 Jl. Perpustakaan No. 45",
                                        "📞 (021) 1234-5678",
                                        "📧 support@librosphere.id",
                                    ],
                                },
                                {
                                    title: "Tautan Cepat",
                                    icon: LayoutGrid,
                                    items: [
                                        "Syarat & Ketentuan",
                                        "Kebijakan Privasi",
                                        "Bantuan (FAQ)",
                                    ],
                                },
                            ].map((section, idx) => (
                                <div key={idx}>
                                    <h4 className="text-white font-bold mb-6 flex items-center gap-2 uppercase tracking-widest text-xs">
                                        <section.icon className="w-4 h-4 text-indigo-500" />
                                        {section.title}
                                    </h4>
                                    <ul className="space-y-4 text-sm font-medium">
                                        {section.items.map((item, i) => (
                                            <li
                                                key={i}
                                                className="hover:text-white transition-colors cursor-pointer"
                                            >
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-semibold tracking-widest uppercase">
                            <p>&copy; 2025 LIBROSPHERE. ALL RIGHTS RESERVED.</p>
                            <div className="flex gap-8">
                                <span>Facebook</span>
                                <span>Instagram</span>
                                <span>Twitter</span>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
