import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
    ChevronLeft,
    BookOpen,
    Bookmark,
    Info,
    CheckCircle2,
    AlertCircle,
    Calendar,
    Hash,
    Building2,
} from "lucide-react";

export default function KatalogShow({ auth, book, available_count }) {
    // Form logic untuk proses peminjaman
    const { post, processing } = useForm({
        book_id: book.id,
    });

    const handleBorrow = () => {
        if (confirm(`Konfirmasi peminjaman buku: ${book.title}?`)) {
            post(route("peminjaman.store"));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title={`${book.title} - LibroSphere`} />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumb Navigation */}
                <nav className="mb-8">
                    <Link
                        href={route("katalog.index")}
                        className="group inline-flex items-center gap-2 text-sm font-black text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest"
                    >
                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Kembali ke Katalog
                    </Link>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Sisi Kiri: Visual Buku (Col 5) */}
                    <div className="lg:col-span-5">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="sticky top-28"
                        >
                            <div className="relative group">
                                {/* Decorative Background */}
                                <div className="absolute -inset-4 bg-indigo-50 rounded-[2.5rem] -z-10 scale-95 group-hover:scale-100 transition-transform duration-500" />

                                {/* Book Cover */}
                                <div className="aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl shadow-indigo-200 border border-white bg-slate-50 relative">
                                    <img
                                        src={
                                            book.cover_image ||
                                            "https://images.unsplash.com/photo-1543004471-240ce44a7245?q=80&w=600&h=800&auto=format&fit=crop"
                                        }
                                        alt={book.title}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                    />

                                    {/* Availability Badge Overlay */}
                                    <div
                                        className={`absolute top-6 right-6 px-4 py-2 rounded-xl backdrop-blur-md shadow-lg flex items-center gap-2 border ${
                                            available_count > 0
                                                ? "bg-white/90 border-emerald-100 text-emerald-600"
                                                : "bg-white/90 border-rose-100 text-rose-600"
                                        }`}
                                    >
                                        {available_count > 0 ? (
                                            <CheckCircle2 className="w-4 h-4" />
                                        ) : (
                                            <AlertCircle className="w-4 h-4" />
                                        )}
                                        <span className="text-xs font-black uppercase tracking-wider">
                                            {available_count > 0
                                                ? "Tersedia"
                                                : "Kosong"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Stats Below Image */}
                            <div className="mt-10 grid grid-cols-2 gap-4">
                                <div className="p-5 bg-white border border-slate-100 rounded-2xl">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                                        Total Stok
                                    </p>
                                    <p className="text-lg font-black text-slate-900">
                                        {book.total_stock || 0} Unit
                                    </p>
                                </div>
                                <div className="p-5 bg-white border border-slate-100 rounded-2xl">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                                        Lokasi Rak
                                    </p>
                                    <p className="text-lg font-black text-slate-900">
                                        {book.shelf_location || "A-12"}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Sisi Kanan: Informasi & Aksi (Col 7) */}
                    <div className="lg:col-span-7">
                        <header className="mb-10">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-2 text-indigo-600 mb-4"
                            >
                                <span className="h-px w-8 bg-indigo-600"></span>
                                <span className="text-xs font-black uppercase tracking-[0.2em]">
                                    {book.category?.name || "Uncategorized"}
                                </span>
                            </motion.div>

                            <h1 className="text-5xl font-black text-slate-900 leading-[1.1] tracking-tighter mb-4">
                                {book.title}
                            </h1>
                            <p className="text-xl text-slate-500 font-medium">
                                Karya{" "}
                                <span className="text-slate-900 border-b-2 border-indigo-100">
                                    {book.author}
                                </span>
                            </p>
                        </header>

                        {/* Metadata Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-10 border-y border-slate-100 mb-10">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2 text-slate-400 mb-1">
                                    <Building2 className="w-4 h-4" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">
                                        Penerbit
                                    </span>
                                </div>
                                <p className="text-sm font-bold text-slate-900">
                                    {book.publisher || "-"}
                                </p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2 text-slate-400 mb-1">
                                    <Calendar className="w-4 h-4" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">
                                        Tahun
                                    </span>
                                </div>
                                <p className="text-sm font-bold text-slate-900">
                                    {book.publish_year}
                                </p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2 text-slate-400 mb-1">
                                    <Hash className="w-4 h-4" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">
                                        ISBN
                                    </span>
                                </div>
                                <p className="text-sm font-bold text-slate-900">
                                    {book.isbn}
                                </p>
                            </div>
                        </div>

                        {/* Synopsis */}
                        <div className="mb-12">
                            <h3 className="flex items-center gap-2 text-sm font-black text-slate-900 uppercase tracking-[0.2em] mb-4">
                                <Info className="w-4 h-4 text-indigo-600" />{" "}
                                Sinopsis
                            </h3>
                            <p className="text-slate-600 leading-relaxed text-lg italic font-serif">
                                "
                                {book.description ||
                                    "Kisah yang belum terungkap. Buku ini menunggu untuk dibaca dan diceritakan kembali."}
                                "
                            </p>
                        </div>

                        {/* CTA Actions */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={handleBorrow}
                                disabled={available_count === 0 || processing}
                                className={`flex-[3] flex items-center justify-center gap-3 py-5 rounded-[1.5rem] font-black text-lg transition-all duration-300 shadow-xl ${
                                    available_count > 0
                                        ? "bg-slate-900 text-white hover:bg-indigo-600 hover:shadow-indigo-200"
                                        : "bg-slate-100 text-slate-400 cursor-not-allowed"
                                }`}
                            >
                                <BookOpen className="w-6 h-6" />
                                {available_count > 0
                                    ? processing
                                        ? "Memproses..."
                                        : "Pinjam Sekarang"
                                    : "Stok Sedang Kosong"}
                            </button>

                            <button className="flex-1 flex items-center justify-center gap-2 py-5 border-2 border-slate-100 rounded-[1.5rem] hover:bg-slate-50 hover:border-slate-200 transition-all text-slate-600 font-black uppercase tracking-widest text-xs">
                                <Bookmark className="w-5 h-5" />
                                Simpan
                            </button>
                        </div>

                        {/* Additional Notes */}
                        <p className="mt-6 text-center text-xs text-slate-400 font-bold uppercase tracking-tighter flex items-center justify-center gap-2">
                            <AlertCircle className="w-3 h-3" /> Durasi
                            peminjaman standar adalah 7 hari kalender.
                        </p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}