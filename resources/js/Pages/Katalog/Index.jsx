import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { Search, Filter, MessageSquare, BookOpen, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function KatalogIndex({ categories, books }) {
    const [search, setSearch] = useState('');

    return (
        <div className="min-h-screen bg-white">
            <Head title="Jelajahi Katalog - LibroSphere" />

            {/* Navbar Premium */}
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-black text-slate-900 tracking-tighter hover:text-indigo-600 transition-colors">
                        Libro<span className="text-indigo-600">Sphere</span>
                    </Link>
                    <div className="flex items-center gap-6">
                        <Link href={route('login')} className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">Masuk</Link>
                        <Link href={route('register')} className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-100 hover:bg-slate-900 transition-all">Daftar</Link>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    
                    {/* Sidebar Filter - Glassmorphism style */}
                    <aside className="w-full lg:w-72 shrink-0">
                        <div className="sticky top-32 space-y-10">
                            <div>
                                <div className="flex items-center gap-2 mb-6">
                                    <Filter className="w-4 h-4 text-indigo-600" />
                                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Kategori</h3>
                                </div>
                                <div className="space-y-3">
                                    {categories?.map((cat) => (
                                        <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                                            <div className="relative flex items-center justify-center">
                                                <input type="checkbox" className="peer appearance-none w-5 h-5 border-2 border-slate-200 rounded-lg checked:bg-indigo-600 checked:border-indigo-600 transition-all cursor-pointer" />
                                                <ChevronRight className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                                            </div>
                                            <span className="text-sm font-medium text-slate-500 group-hover:text-indigo-600 transition-colors">{cat.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Help Card */}
                            <div className="relative p-6 rounded-[2rem] bg-slate-900 overflow-hidden group">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/20 rounded-full -mr-10 -mt-10 blur-2xl group-hover:bg-indigo-500/40 transition-colors" />
                                <div className="relative z-10">
                                    <MessageSquare className="w-8 h-8 text-indigo-400 mb-4" />
                                    <h4 className="text-white font-bold mb-2">Butuh Bantuan?</h4>
                                    <p className="text-xs text-slate-400 leading-relaxed mb-4">Hubungi pustakawan kami jika Anda kesulitan menemukan koleksi.</p>
                                    <button className="w-full py-3 bg-white text-slate-900 text-[10px] font-black uppercase tracking-tighter rounded-xl hover:bg-indigo-50 transition-colors">
                                        Chat Petugas
                                    </button>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <section className="flex-1">
                        {/* Search & Title */}
                        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
                            <div>
                                <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Katalog Buku</h2>
                                <p className="text-slate-500 font-medium">Menampilkan koleksi terbaik untuk referensi Anda.</p>
                            </div>
                            <div className="relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                <input 
                                    type="text" 
                                    placeholder="Cari judul, penulis, atau ISBN..." 
                                    className="pl-12 pr-6 py-4 border-none bg-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 w-full md:w-80 text-sm font-medium transition-all"
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Grid Buku */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <motion.div 
                                    key={item}
                                    whileHover={{ y: -8 }}
                                    className="bg-white rounded-[2.5rem] p-5 border border-slate-50 shadow-sm hover:shadow-2xl hover:shadow-indigo-100/50 transition-all duration-500 group"
                                >
                                    {/* Cover Placeholder */}
                                    <div className="h-72 bg-slate-100 rounded-[2rem] relative overflow-hidden mb-6">
                                        <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                                            <BookOpen className="w-12 h-12" />
                                        </div>
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-indigo-600 text-[10px] px-3 py-1.5 rounded-full font-black uppercase tracking-widest shadow-sm">
                                            Tersedia
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="px-2">
                                        <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">Sains & Teknologi</span>
                                        <h4 className="font-bold text-xl text-slate-900 mt-2 mb-1 group-hover:text-indigo-600 transition-colors truncate">
                                            Struktur Data Modern
                                        </h4>
                                        <p className="text-sm text-slate-400 font-medium mb-6">Robert C. Martin</p>
                                        
                                        <button className="w-full flex items-center justify-center gap-2 py-4 bg-slate-50 text-slate-900 text-xs font-black uppercase tracking-widest rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                                            Lihat Detail
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Pagination Sederhana */}
                        <div className="mt-16 flex justify-center gap-2">
                            <button className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-400 hover:bg-indigo-600 hover:text-white transition-all">1</button>
                            <button className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-100">2</button>
                            <button className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-400 hover:bg-indigo-600 hover:text-white transition-all">3</button>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}