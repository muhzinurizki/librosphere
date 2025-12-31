import { useEffect } from "react";
import InputError from "@/Components/InputError";
import { Head, Link, useForm } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
    BookOpenText,
    User,
    Mail,
    Lock,
    ArrowRight,
    ArrowLeft,
    Sparkles,
} from "lucide-react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("register"));
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center relative bg-slate-50 overflow-hidden py-12">
            <Head title="Gabung Anggota - LibroSphere" />

            {/* Background Aesthetic Glow */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-100 rounded-full blur-[120px]" />

            <div className="relative z-10 w-full max-w-[1100px] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-xl bg-white/70 backdrop-blur-2xl border border-white/50 p-8 md:p-12 rounded-[3rem] shadow-[0_32px_64px_-15px_rgba(0,0,0,0.08)]"
                >
                    {/* Top Navigation */}
                    <div className="flex justify-between items-center mb-10">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-bold text-[10px] uppercase tracking-[0.2em] transition-colors"
                        >
                            <ArrowLeft className="w-3 h-3" /> Beranda
                        </Link>
                        <div className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> Edisi Komunitas
                        </div>
                    </div>

                    {/* Branding & Header */}
                    <div className="text-center mb-10">
                        <div className="inline-flex p-4 bg-slate-900 rounded-2xl shadow-xl mb-6">
                            <BookOpenText className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
                            Daftar Anggota
                        </h1>
                        <p className="text-slate-500 font-medium text-sm">
                            Satu akun untuk akses tak terbatas ke dunia
                            literasi.
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-4">
                        {/* Input Nama */}
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                            <input
                                type="text"
                                name="name"
                                value={data.name}
                                className="w-full pl-12 pr-6 py-4 bg-white/50 border border-slate-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 rounded-2xl transition-all outline-none font-medium"
                                placeholder="Nama Lengkap"
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.name}
                                className="mt-2 ml-2"
                            />
                        </div>

                        {/* Input Email */}
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                            <input
                                type="email"
                                name="email"
                                value={data.email}
                                className="w-full pl-12 pr-6 py-4 bg-white/50 border border-slate-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 rounded-2xl transition-all outline-none font-medium"
                                placeholder="Alamat Email"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.email}
                                className="mt-2 ml-2"
                            />
                        </div>

                        {/* Password Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                <input
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="w-full pl-12 pr-6 py-4 bg-white/50 border border-slate-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 rounded-2xl transition-all outline-none font-medium"
                                    placeholder="Kata Sandi"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.password}
                                    className="mt-2 ml-2"
                                />
                            </div>

                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                <input
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="w-full pl-12 pr-6 py-4 bg-white/50 border border-slate-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 rounded-2xl transition-all outline-none font-medium"
                                    placeholder="Konfirmasi"
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                    className="mt-2 ml-2"
                                />
                            </div>
                        </div>

                        <button
                            disabled={processing}
                            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-900 shadow-xl shadow-indigo-100 transition-all flex items-center justify-center gap-2 group mt-4 disabled:opacity-50"
                        >
                            {processing
                                ? "Mendaftarkan..."
                                : "Buat Akun Sekarang"}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    {/* Footer Section */}
                    <div className="mt-12 pt-8 border-t border-slate-100 text-center">
                        <p className="text-slate-500 text-sm font-medium">
                            Sudah memiliki akun sebelumnya?{" "}
                            <Link
                                href={route("login")}
                                className="text-indigo-600 font-black hover:text-slate-900 transition-colors ml-1"
                            >
                                Masuk ke Akun
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
