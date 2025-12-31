import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
    ShieldCheck,
    UserCircle,
    AlertTriangle,
    QrCode,
    Download,
    CreditCard,
} from "lucide-react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";

export default function Edit({ auth, mustVerifyEmail, status }) {
    const user = auth.user;

    return (
        <AuthenticatedLayout>
            <Head title="Pengaturan Profil" />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                            Pengaturan Akun
                        </h1>
                        <p className="text-slate-500 font-medium mt-1">
                            Kelola identitas digital dan keamanan akses
                            perpustakaan Anda.
                        </p>
                    </div>

                    {/* Badge Status */}
                    <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-xs font-black text-emerald-700 uppercase tracking-wider">
                            Akun Aktif
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Left Column: Forms */}
                    <div className="lg:col-span-7 space-y-20">
                        {/* Section 1: Profil */}
                        <section className="scroll-mt-24">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                                    <UserCircle className="w-5 h-5" />
                                </div>
                                <h2 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">
                                    Informasi Publik
                                </h2>
                            </div>
                            <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-shadow">
                                <UpdateProfileInformationForm
                                    mustVerifyEmail={mustVerifyEmail}
                                    status={status}
                                />
                            </div>
                        </section>

                        {/* Section 2: Keamanan */}
                        <section className="scroll-mt-24">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <h2 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">
                                    Keamanan & Sandi
                                </h2>
                            </div>
                            <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm">
                                <UpdatePasswordForm />
                            </div>
                        </section>

                        {/* Section 3: Bahaya */}
                        <section className="scroll-mt-24 opacity-80 hover:opacity-100 transition-opacity">
                            <div className="flex items-center gap-3 mb-8 text-rose-600">
                                <div className="p-2 bg-rose-50 rounded-lg">
                                    <AlertTriangle className="w-5 h-5" />
                                </div>
                                <h2 className="text-sm font-black uppercase tracking-[0.2em]">
                                    Penghapusan Akun
                                </h2>
                            </div>
                            <div className="bg-rose-50/30 border border-rose-100 rounded-[2rem] p-8">
                                <DeleteUserForm />
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Digital Card Sticky */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-32 space-y-8">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-2 flex items-center gap-2">
                                <CreditCard className="w-3 h-3" /> Digital
                                Membership Card
                            </h3>

                            {/* The Card Container */}
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="relative aspect-[1.6/1] w-full rounded-[2rem] bg-slate-900 overflow-hidden shadow-2xl shadow-indigo-200"
                            >
                                {/* Design Elements */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/20 rounded-full blur-3xl -mr-10 -mt-10" />
                                <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-600/20 rounded-full blur-2xl -ml-5 -mb-5" />

                                <div className="relative h-full p-8 flex flex-col justify-between">
                                    {/* Card Top */}
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
                                                Official Member
                                            </p>
                                            <h4 className="text-white text-xl font-bold tracking-tight">
                                                LibroSphere.
                                            </h4>
                                        </div>
                                        <div className="bg-white/10 backdrop-blur-md p-2 rounded-xl">
                                            <QrCode className="w-8 h-8 text-white" />
                                        </div>
                                    </div>

                                    {/* Card Bottom */}
                                    <div className="flex justify-between items-end">
                                        <div className="space-y-1">
                                            <p className="text-white font-bold tracking-wide">
                                                {user.name}
                                            </p>
                                            <p className="text-slate-400 text-[10px] font-mono tracking-widest uppercase">
                                                ID: LIB-
                                                {user.id
                                                    .toString()
                                                    .padStart(4, "0")}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-slate-500 text-[8px] font-black uppercase tracking-widest leading-none">
                                                Valid Thru
                                            </p>
                                            <p className="text-white text-[10px] font-bold">
                                                12/2026
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Card Actions */}
                            <div className="grid grid-cols-2 gap-4">
                                <button className="flex items-center justify-center gap-2 py-4 bg-white border border-slate-200 rounded-2xl text-xs font-black text-slate-700 hover:bg-slate-50 transition-all uppercase tracking-widest">
                                    <Download className="w-4 h-4" /> Save Image
                                </button>
                                <button className="flex items-center justify-center gap-2 py-4 bg-indigo-600 rounded-2xl text-xs font-black text-white hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 uppercase tracking-widest">
                                    <QrCode className="w-4 h-4" /> Expand QR
                                </button>
                            </div>

                            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                                <p className="text-xs text-slate-500 leading-relaxed italic">
                                    "Gunakan kartu digital ini untuk mempermudah
                                    proses peminjaman buku di loket perpustakaan
                                    pusat LibroSphere."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
