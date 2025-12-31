import { useEffect } from "react";
import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    Lock,
    Mail,
    BookOpenText,
    Github,
    ArrowRight,
    UserPlus,
} from "lucide-react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("login"));
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center relative bg-slate-50 overflow-hidden">
            <Head title="Masuk ke Akun" />
            {/* Latar Belakang Animasi Bulatan Cahaya */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-200 rounded-full blur-[120px] animate-pulse" />

            <div className="relative z-10 w-full max-w-[1100px] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md bg-white/70 backdrop-blur-2xl border border-white/50 p-10 rounded-[3rem] shadow-[0_32px_64px_-15px_rgba(0,0,0,0.1)]"
                >
                    {/* Logo & Header */}
                    <div className="text-center mb-10">
                        <div className="inline-flex p-4 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-100 mb-6">
                            <BookOpenText className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                            LibroSphere
                        </h1>
                        <p className="text-slate-500 font-medium mt-2">
                            Masuk ke ruang baca digital Anda
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-5">
                        {/* Input Email */}
                        <div className="space-y-2">
                            <input
                                type="email"
                                className="w-full px-6 py-4 bg-white/50 border border-slate-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 rounded-2xl transition-all outline-none font-medium"
                                placeholder="Alamat Email"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                        </div>

                        {/* Input Password */}
                        <div className="space-y-2">
                            <input
                                type="password"
                                className="w-full px-6 py-4 bg-white/50 border border-slate-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 rounded-2xl transition-all outline-none font-medium"
                                placeholder="Kata Sandi"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />
                        </div>

                        <div className="flex justify-between items-center text-sm px-2">
                            <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-600">
                                <input
                                    type="checkbox"
                                    className="rounded-md border-slate-300 text-indigo-600"
                                />
                                Ingat Saya
                            </label>
                            <Link className="text-indigo-600 font-black">
                                Lupa?
                            </Link>
                        </div>

                        <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-600 shadow-xl shadow-slate-200 transition-all flex items-center justify-center gap-2 group">
                            Masuk Akun
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    {/* Social Login Divider */}
                    <div className="relative my-10">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase font-black text-slate-400">
                            <span className="bg-white/0 px-4 backdrop-blur-sm">
                                Atau masuk dengan
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-3 py-3 border border-slate-200 rounded-2xl hover:bg-white transition-all font-bold text-slate-700 text-sm">
                            <img
                                src="https://www.svgrepo.com/show/475656/google-color.svg"
                                className="w-5 h-5"
                                alt="Google"
                            />{" "}
                            Google
                        </button>
                        <button className="flex items-center justify-center gap-3 py-3 border border-slate-200 rounded-2xl hover:bg-white transition-all font-bold text-slate-700 text-sm">
                            <Github className="w-5 h-5" /> GitHub
                        </button>
                    </div>

                    <div className="mt-10 pt-8 border-t border-slate-100 text-center">
                        <p className="text-slate-500 text-sm font-medium mb-4">
                            Belum menjadi bagian dari komunitas?
                        </p>
                        <Link
                            href={route("register")}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-50 text-indigo-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                        >
                            <UserPlus className="w-3.5 h-3.5" /> Daftar Anggota
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
