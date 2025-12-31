import { Head, Link, router } from "@inertiajs/react";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Book, Star, ArrowRight, X } from "lucide-react";
import debounce from "lodash/debounce";

export default function KatalogIndex({ categories, books, filters }) {
    const [search, setSearch] = useState(filters.search || "");

    // Debounce search agar tidak terlalu banyak request ke server
    const debouncedSearch = useCallback(
        debounce((value) => {
            router.get(
                route("katalog.index"),
                { search: value },
                {
                    preserveState: true,
                    replace: true,
                }
            );
        }, 300),
        []
    );

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        debouncedSearch(value);
    };

    return (
        <div className="min-h-screen bg-[#fcfcfd]">
            <Head title="Jelajahi Katalog - LibroSphere" />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header Section */}
                <div className="mb-12">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-4xl font-black text-slate-900 tracking-tight mb-2"
                    >
                        Koleksi <span className="text-indigo-600">Terbaik</span>
                    </motion.h2>
                    <p className="text-slate-500 font-medium">
                        Temukan ribuan judul dari berbagai genre literatur.
                    </p>
                </div>

                {/* Toolbar: Search & Categories */}
                <div className="sticky top-6 z-30 mb-12 space-y-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Modern Search Bar */}
                        <div className="relative flex-1 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                            <input
                                type="text"
                                value={search}
                                onChange={handleSearch}
                                placeholder="Cari judul, penulis, atau ISBN..."
                                className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl shadow-xl shadow-slate-200/50 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 transition-all outline-none font-medium"
                            />
                            {search && (
                                <button
                                    onClick={() => {
                                        setSearch("");
                                        debouncedSearch("");
                                    }}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 bg-slate-100 rounded-full hover:bg-slate-200"
                                >
                                    <X className="w-3 h-3 text-slate-500" />
                                </button>
                            )}
                        </div>

                        {/* Filter Button (Mobile Trigger) */}
                        <button className="md:hidden flex items-center justify-center gap-2 px-6 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-slate-700">
                            <Filter className="w-4 h-4" /> Filter
                        </button>
                    </div>

                    {/* Category Pills */}
                    <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
                        <Link
                            href={route("katalog.index")}
                            className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                                !filters.category
                                    ? "bg-slate-900 text-white shadow-lg shadow-slate-200"
                                    : "bg-white text-slate-500 border border-slate-200 hover:border-indigo-600"
                            }`}
                        >
                            Semua
                        </Link>
                        {categories.map((cat) => (
                            <Link
                                key={cat.id}
                                href={route("katalog.index", {
                                    category: cat.slug,
                                })}
                                className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                                    filters.category === cat.slug
                                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100"
                                        : "bg-white text-slate-500 border border-slate-200 hover:border-indigo-600"
                                }`}
                            >
                                {cat.name}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Books Grid */}
                <section>
                    {books.data.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            <AnimatePresence>
                                {books.data.map((book, index) => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        key={book.id}
                                        className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 hover:border-indigo-200 hover:shadow-[0_20px_50px_rgba(79,70,229,0.1)] transition-all duration-500"
                                    >
                                        <div className="aspect-[3/4] overflow-hidden relative">
                                            <img
                                                src={
                                                    book.cover_image ||
                                                    "https://via.placeholder.com/300x450"
                                                }
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                            />
                                            {/* Availability Badge */}
                                            <div className="absolute top-4 right-4">
                                                <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black text-slate-900 shadow-sm border border-slate-100">
                                                    {book.stock > 0
                                                        ? "Tersedia"
                                                        : "Kosong"}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                    {book.category?.name ||
                                                        "Umum"}
                                                </span>
                                            </div>

                                            <h4 className="font-bold text-slate-900 text-lg leading-tight group-hover:text-indigo-600 transition-colors line-clamp-2 min-h-[3rem]">
                                                {book.title}
                                            </h4>

                                            <p className="text-sm text-slate-500 mt-2 font-medium">
                                                {book.author}
                                            </p>

                                            <Link
                                                href={`/katalog/${book.id}`}
                                                className="mt-6 w-full py-3 bg-slate-50 group-hover:bg-indigo-600 group-hover:text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2"
                                            >
                                                Lihat Detail
                                                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
                            <div className="inline-flex p-6 bg-slate-50 rounded-full mb-4">
                                <Book className="w-12 h-12 text-slate-300" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">
                                Buku tidak ditemukan
                            </h3>
                            <p className="text-slate-500 mt-2">
                                Coba gunakan kata kunci lain atau pilih kategori
                                yang berbeda.
                            </p>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
