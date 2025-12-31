import { Head, Link } from '@inertiajs/react';
import { Calendar, Clock, MapPin, ArrowRight, Sparkles, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AcaraIndex({ events }) {
    // Variants untuk animasi Framer Motion
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-white">
            <Head title="Acara & Kegiatan - LibroSphere" />

            {/* Navbar Premium */}
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-black text-slate-900 tracking-tighter hover:text-indigo-600 transition-colors">
                        Libro<span className="text-indigo-600">Sphere</span>
                    </Link>
                    <div className="flex items-center gap-8">
                        <Link href={route('katalog.index')} className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">Katalog Buku</Link>
                        <Link href={route('login')} className="px-5 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200">
                            Masuk
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="max-w-6xl mx-auto px-4 py-20">
                {/* Header Section */}
                <header className="mb-20 text-center md:text-left">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6"
                    >
                        <Sparkles className="w-3 h-3" /> Agenda Komunitas
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-none mb-6"
                    >
                        Acara & <span className="text-indigo-600">Kegiatan.</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-slate-500 max-w-2xl font-medium leading-relaxed"
                    >
                        Ruang kolaborasi untuk memperdalam wawasan, berbagi perspektif, dan membangun budaya literasi yang inklusif.
                    </motion.p>
                </header>

                {/* Event List */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid gap-8"
                >
                    {events.data.map((event) => (
                        <motion.div 
                            key={event.id} 
                            variants={itemVariants}
                            className="group relative flex flex-col md:flex-row gap-0 md:gap-10 bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-100/40 transition-all duration-500"
                        >
                            {/* Gambar Acara dengan Badge Tanggal Terintegrasi */}
                            <div className="w-full md:w-[400px] h-72 md:h-[450px] relative overflow-hidden shrink-0">
                                <img 
                                    src={event.image} 
                                    alt={event.title} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                                
                                {/* Badge Kategori Floating */}
                                <div className="absolute top-6 left-6">
                                    <span className="px-4 py-2 bg-white/90 backdrop-blur-md text-indigo-600 text-[10px] font-black rounded-2xl uppercase tracking-widest shadow-xl">
                                        {event.category}
                                    </span>
                                </div>
                            </div>

                            {/* Konten Detail */}
                            <div className="flex-1 p-8 md:p-12 md:pl-0 flex flex-col justify-center">
                                <div className="flex items-center gap-2 text-indigo-500 font-black text-[10px] uppercase tracking-widest mb-4">
                                    <Tag className="w-3 h-3" /> {event.status}
                                </div>
                                
                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 group-hover:text-indigo-600 transition-colors leading-tight">
                                    {event.title}
                                </h2>
                                
                                <p className="text-slate-500 text-lg leading-relaxed mb-8 font-medium line-clamp-3 md:line-clamp-none">
                                    {event.description}
                                </p>
                                
                                {/* Info Meta dengan Icon Modern */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-10 pb-10 border-b border-slate-50">
                                    <div className="flex items-center gap-3 text-slate-600 font-bold text-sm">
                                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-indigo-600">
                                            <Calendar className="w-5 h-5" />
                                        </div>
                                        {new Date(event.date).toLocaleDateString('id-ID', { dateStyle: 'long' })}
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-600 font-bold text-sm">
                                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-indigo-600">
                                            <Clock className="w-5 h-5" />
                                        </div>
                                        {event.time}
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-600 font-bold text-sm col-span-1 sm:col-span-2">
                                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-indigo-600">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        {event.location}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <button className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm hover:bg-slate-900 transition-all shadow-xl shadow-indigo-100 group">
                                        Daftar Sekarang
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                    </button>
                                    
                                    <div className="hidden lg:block text-right">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ketersediaan</p>
                                        <p className="text-sm font-bold text-slate-900">12 Slot Tersisa</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
                
                {/* Pagination (Opsional) */}
                <div className="mt-20 flex justify-center">
                    <button className="px-8 py-4 border-2 border-slate-100 rounded-2xl font-black text-slate-400 hover:border-indigo-600 hover:text-indigo-600 transition-all uppercase text-xs tracking-widest">
                        Muat Lebih Banyak
                    </button>
                </div>
            </main>
        </div>
    );
}