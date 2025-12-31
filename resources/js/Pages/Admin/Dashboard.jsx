import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
    Book,
    Users,
    ArrowUpRight,
    AlertCircle,
    CheckCircle2,
    ArrowRight,
    Library,
    PlusCircle,
} from "lucide-react";

export default function Dashboard({ auth, stats, recent_activities }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-200">
                        <Library className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight text-xl">
                        Admin Overview
                    </h2>
                </div>
            }
        >
            <Head title="Admin Dashboard" />

            <div className="py-12 bg-[#F9FAFB] min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                        <StatCard
                            title="Koleksi Buku"
                            value={stats.total_books}
                            detail="Total judul buku"
                            icon={Book}
                            color="indigo"
                        />
                        <StatCard
                            title="Pinjaman Aktif"
                            value={stats.active_loans}
                            detail="Buku di tangan member"
                            icon={ArrowUpRight}
                            color="blue"
                        />
                        <StatCard
                            title="Total Anggota"
                            value={stats.total_members}
                            detail="Member terdaftar"
                            icon={Users}
                            color="emerald"
                        />
                        <StatCard
                            title="Terlambat"
                            value={stats.overdue_count}
                            detail="Butuh tindakan segera"
                            icon={AlertCircle}
                            isAlert={stats.overdue_count > 0}
                            color="rose"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Table Activity */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="lg:col-span-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden"
                        >
                            <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-wider">
                                        Aktivitas Terkini
                                    </h3>
                                    <p className="text-sm text-slate-400">
                                        Log peminjaman dan pengembalian terbaru
                                    </p>
                                </div>
                                <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group">
                                    Lihat Semua{" "}
                                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm text-slate-500">
                                    <thead className="bg-slate-50/50 text-slate-400 uppercase text-[10px] font-black tracking-[0.2em]">
                                        <tr>
                                            <th className="px-8 py-5">
                                                Member
                                            </th>
                                            <th className="px-8 py-5">Buku</th>
                                            <th className="px-8 py-5">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {recent_activities.map((loan, i) => (
                                            <tr
                                                key={loan.id}
                                                className="hover:bg-slate-50/80 transition-colors group"
                                            >
                                                <td className="px-8 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                                                            {loan.user.name.charAt(
                                                                0
                                                            )}
                                                        </div>
                                                        <span className="font-bold text-slate-900">
                                                            {loan.user.name}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5 font-medium text-slate-600 italic">
                                                    {
                                                        loan.book_item?.book
                                                            ?.title
                                                    }
                                                </td>
                                                <td className="px-8 py-5">
                                                    <StatusBadge
                                                        status={loan.status}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>

                        {/* Quick Menu & Sidebar */}
                        <div className="lg:col-span-4 space-y-6">
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-2xl shadow-slate-200 relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-indigo-500/40 transition-colors" />

                                <div className="relative z-10">
                                    <h4 className="font-black text-xl mb-2 tracking-tight">
                                        Manajemen Koleksi
                                    </h4>
                                    <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                                        Organisir data buku, kategori, dan stok
                                        fisik perpustakaan Anda.
                                    </p>

                                    <div className="space-y-3">
                                        <Link
                                            href={route("books.index")}
                                            className="w-full flex items-center justify-between p-4 bg-white/10 hover:bg-white hover:text-slate-900 rounded-2xl transition-all font-bold text-sm group/btn"
                                        >
                                            Kelola Buku
                                            <PlusCircle className="w-4 h-4 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                                        </Link>
                                        <button className="w-full py-4 text-slate-400 hover:text-white transition text-xs font-black uppercase tracking-widest">
                                            Laporan Bulanan
                                        </button>
                                    </div>
                                </div>
                            </motion.div>

                            <div className="bg-emerald-50 rounded-[2rem] p-8 border border-emerald-100">
                                <div className="flex items-center gap-3 mb-4 text-emerald-700">
                                    <CheckCircle2 className="w-5 h-5" />
                                    <span className="text-xs font-black uppercase tracking-widest">
                                        System Health
                                    </span>
                                </div>
                                <p className="text-sm text-emerald-800 leading-relaxed font-medium">
                                    Semua sistem berjalan normal. Tidak ada
                                    antrian validasi tertunda hari ini.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function StatCard({ title, value, detail, isAlert, icon: Icon, color }) {
    const colors = {
        indigo: "text-indigo-600 bg-indigo-50",
        blue: "text-blue-600 bg-blue-50",
        emerald: "text-emerald-600 bg-emerald-50",
        rose: "text-rose-600 bg-rose-50",
    };

    return (
        <motion.div
            whileHover={{ y: -4 }}
            className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-100 transition-all"
        >
            <div className="flex justify-between items-start mb-4">
                <div
                    className={`p-3 rounded-2xl ${
                        isAlert ? "bg-rose-50 text-rose-600" : colors[color]
                    }`}
                >
                    <Icon className="w-6 h-6" />
                </div>
            </div>
            <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
                    {title}
                </p>
                <p
                    className={`text-4xl font-black tracking-tighter ${
                        isAlert ? "text-rose-600" : "text-slate-900"
                    }`}
                >
                    {value}
                </p>
                <div className="flex items-center gap-1 mt-2">
                    <div
                        className={`w-1 h-1 rounded-full ${
                            isAlert ? "bg-rose-400" : "bg-slate-300"
                        }`}
                    />
                    <p className="text-[11px] font-bold text-slate-400">
                        {detail}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

function StatusBadge({ status }) {
    const config = {
        dipinjam: "bg-blue-50 text-blue-600 border-blue-100",
        kembali: "bg-emerald-50 text-emerald-600 border-emerald-100",
        terlambat: "bg-rose-50 text-rose-600 border-rose-100",
        default: "bg-slate-50 text-slate-600 border-slate-100",
    };

    const style = config[status.toLowerCase()] || config.default;

    return (
        <span
            className={`px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-wider ${style}`}
        >
            {status}
        </span>
    );
}
