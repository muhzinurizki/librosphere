import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    BookOpen, 
    Calendar, 
    Wallet, 
    ArrowRight, 
    Clock, 
    ChevronRight,
    Search
} from 'lucide-react';

export default function Dashboard({ auth, stats, recent_loans }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-black tracking-tight text-slate-900">
                        Ruang Baca <span className="text-indigo-600">Anda</span>
                    </h2>
                    <div className="text-sm font-medium text-slate-500">
                        {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </div>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-10 bg-slate-50/50 min-h-screen">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">
                    
                    {/* Hero Section */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative overflow-hidden bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-indigo-200"
                    >
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px]" />
                        <div className="relative z-10 max-w-2xl">
                            <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
                                Senang melihatmu lagi, {auth.user.name.split(' ')[0]}! ✨
                            </h3>
                            <p className="text-indigo-100/80 text-lg mb-8 font-medium">
                                Ada 4,500+ buku baru yang siap menemani petualangan literasimu hari ini.
                            </p>
                            <Link 
                                href={route('katalog.index')} 
                                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-50 transition-all group"
                            >
                                <Search className="w-4 h-4" /> Jelajahi Katalog
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { label: 'Buku Dipinjam', val: stats.books_borrowed, icon: BookOpen, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                            { label: 'Booking Aktif', val: stats.active_reservations, icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50' },
                            { label: 'Total Denda', val: `Rp ${stats.total_fines}`, icon: Wallet, color: 'text-rose-600', bg: 'bg-rose-50' },
                        ].map((item, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex items-center justify-between group hover:border-indigo-200 transition-all"
                            >
                                <div>
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-[0.1em] mb-1">{item.label}</p>
                                    <p className={`text-3xl font-black ${item.color}`}>{item.val}</p>
                                </div>
                                <div className={`p-4 ${item.bg} rounded-2xl`}>
                                    <item.icon className={`w-8 h-8 ${item.color}`} />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Recent Loans Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Table Area (Left - 2 Cols) */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="flex items-center justify-between px-2">
                                <h4 className="text-xl font-black text-slate-900 italic underline underline-offset-8 decoration-indigo-200">Aktivitas Terakhir</h4>
                                <Link className="text-sm font-bold text-indigo-600 hover:text-slate-900 transition-colors">Lihat Riwayat</Link>
                            </div>

                            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-slate-50">
                                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Judul Buku</th>
                                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Batas Waktu</th>
                                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {recent_loans.map((loan) => (
                                            <tr key={loan.id} className="group hover:bg-slate-50/50 transition-colors">
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-14 bg-slate-100 rounded-lg flex-shrink-0 border border-slate-200 overflow-hidden">
                                                            {/* Placeholder Cover */}
                                                            <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-slate-200" />
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-slate-900 leading-none mb-1">{loan.title}</p>
                                                            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                                                                loan.is_overdue ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'
                                                            }`}>
                                                                {loan.status}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                                                        <Clock className="w-4 h-4 text-slate-300" />
                                                        {loan.due_date}
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <button className="p-2 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 transition-all">
                                                        <ChevronRight className="w-5 h-5 text-slate-400" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Recommendation/Ads Area (Right - 1 Col) */}
                        <div className="space-y-6">
                            <h4 className="text-xl font-black text-slate-900 px-2">Tips Hari Ini</h4>
                            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-xl shadow-indigo-100">
                                <div className="relative z-10">
                                    <p className="text-indigo-100 font-bold text-sm mb-4">#LiterasiTip</p>
                                    <p className="text-lg font-bold leading-snug mb-6 italic">
                                        "Membaca 15 menit sebelum tidur dapat meningkatkan kualitas istirahat Anda."
                                    </p>
                                    <button className="w-full py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl font-bold text-xs transition-all">
                                        Cari Buku Pengantar Tidur
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}