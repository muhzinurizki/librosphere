import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
    BookOpen,
    Layers,
    CreditCard,
    History,
    Heart,
    Clock,
    MoreVertical,
    ArrowRight,
    QrCode,
    AlertCircle,
} from "lucide-react";

export default function Dashboard({ auth, stats, recent_loans }) {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard Member" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header Section with Profile Mini */}
                <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 text-indigo-600 mb-2"
                        >
                            <span className="h-px w-8 bg-indigo-600"></span>
                            <span className="text-xs font-black uppercase tracking-[0.2em]">
                                Ringkasan Aktivitas
                            </span>
                        </motion.div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                            Selamat Datang, {auth.user.name.split(" ")[0]}.
                        </h1>
                    </div>

                    {/* Digital Card Preview Mini */}
                    <div className="bg-slate-900 rounded-2xl p-4 text-white flex items-center gap-4 shadow-xl shadow-slate-200">
                        <div className="bg-white p-2 rounded-lg">
                            <QrCode className="w-6 h-6 text-slate-900" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase leading-none mb-1">
                                ID Anggota
                            </p>
                            <p className="text-sm font-mono font-bold tracking-wider">
                                LIB-{auth.user.id}2024
                            </p>
                        </div>
                    </div>
                </header>

                {/* Status Overview Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
                    {[
                        {
                            label: "Sedang Dipinjam",
                            val: stats.books_borrowed,
                            unit: "Buku",
                            color: "text-slate-900",
                        },
                        {
                            label: "Booking Aktif",
                            val: stats.active_reservations,
                            unit: "Item",
                            color: "text-indigo-600",
                        },
                        {
                            label: "Total Tagihan",
                            val: stats.total_fines,
                            unit: "IDR",
                            color: "text-rose-600",
                        },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group border-b-2 border-slate-100 pb-6 hover:border-indigo-600 transition-all duration-500"
                        >
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-indigo-600 transition-colors">
                                {item.label}
                            </span>
                            <div className="flex items-baseline gap-3 mt-2">
                                <span
                                    className={`text-5xl font-black tracking-tighter ${item.color}`}
                                >
                                    {item.val}
                                </span>
                                <span className="text-sm font-bold text-slate-400">
                                    {item.unit}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Main Content Area (Left) */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                                <BookOpen className="w-5 h-5 text-indigo-600" />
                                Pinjaman Terakhir
                            </h2>
                            <Link
                                href={route("katalog.index")}
                                className="group flex items-center gap-2 text-sm font-black text-indigo-600 uppercase tracking-widest"
                            >
                                Cari koleksi
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        {recent_loans.length > 0 ? (
                            <div className="space-y-4">
                                {recent_loans.map((loan) => (
                                    <motion.div
                                        whileHover={{ x: 10 }}
                                        key={loan.id}
                                        className="flex items-center justify-between p-5 rounded-3xl border border-slate-100 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-50/50 transition-all bg-white group"
                                    >
                                        <div className="flex items-center gap-5">
                                            <div className="relative w-14 h-20 bg-slate-50 rounded-xl flex-shrink-0 border border-slate-100 overflow-hidden shadow-sm">
                                                {/* Placeholder for Cover */}
                                                <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-indigo-50 flex items-center justify-center text-[10px] font-black text-slate-300 uppercase">
                                                    Cover
                                                </div>
                                                {loan.image && (
                                                    <img
                                                        src={loan.image}
                                                        className="absolute inset-0 w-full h-full object-cover"
                                                    />
                                                )}
                                            </div>
                                            <div>
                                                <h4 className="font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                                                    {loan.title}
                                                </h4>
                                                <div className="flex items-center gap-3 mt-1">
                                                    <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400">
                                                        <Clock className="w-3 h-3" />
                                                        {loan.due_date}
                                                    </div>
                                                    <span
                                                        className={`text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider ${
                                                            loan.is_overdue
                                                                ? "bg-rose-100 text-rose-600"
                                                                : "bg-emerald-100 text-emerald-600"
                                                        }`}
                                                    >
                                                        {loan.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="p-2 text-slate-300 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all">
                                            <MoreVertical className="w-5 h-5" />
                                        </button>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-20 text-center border-2 border-dashed border-slate-100 rounded-[3rem] bg-slate-50/30">
                                <AlertCircle className="w-10 h-10 text-slate-200 mx-auto mb-4" />
                                <p className="text-sm font-bold text-slate-400">
                                    Belum ada aktivitas peminjaman aktif.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Quick Shortcuts (Right Sidebar Style) */}
                    <div className="space-y-10">
                        <section>
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8">
                                Pintasan Cepat
                            </h3>
                            <div className="grid grid-cols-1 gap-3">
                                {[
                                    {
                                        label: "Perpanjang",
                                        desc: "Masa pinjam buku",
                                        icon: Layers,
                                        color: "text-blue-600",
                                        bg: "bg-blue-50",
                                    },
                                    {
                                        label: "Riwayat",
                                        desc: "Semua aktivitas",
                                        icon: History,
                                        color: "text-indigo-600",
                                        bg: "bg-indigo-50",
                                    },
                                    {
                                        label: "Digital Card",
                                        desc: "QR Anggota",
                                        icon: CreditCard,
                                        color: "text-slate-900",
                                        bg: "bg-slate-100",
                                    },
                                    {
                                        label: "Favorit",
                                        desc: "Daftar keinginan",
                                        icon: Heart,
                                        color: "text-rose-600",
                                        bg: "bg-rose-50",
                                    },
                                ].map((item, i) => (
                                    <button
                                        key={i}
                                        className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all border border-transparent hover:border-slate-100 group text-left"
                                    >
                                        <div
                                            className={`p-3 rounded-xl ${item.bg} ${item.color} group-hover:scale-110 transition-transform`}
                                        >
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <span className="block text-sm font-black text-slate-900">
                                                {item.label}
                                            </span>
                                            <span className="text-[11px] font-bold text-slate-400">
                                                {item.desc}
                                            </span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </section>

                        {/* Informational Widget */}
                        <div className="p-8 bg-indigo-600 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl shadow-indigo-200">
                            <div className="relative z-10">
                                <h4 className="font-black text-lg mb-2">
                                    Patuhi Aturan
                                </h4>
                                <p className="text-indigo-100 text-xs font-medium leading-relaxed opacity-80">
                                    Keterlambatan pengembalian buku akan
                                    dikenakan denda Rp 2.000 / hari.
                                </p>
                            </div>
                            <div className="absolute -right-4 -bottom-4 opacity-20 transform rotate-12">
                                <AlertCircle className="w-24 h-24" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
