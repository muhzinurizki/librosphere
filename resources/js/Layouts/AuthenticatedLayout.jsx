import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Book, LayoutDashboard, User, LogOut, ChevronDown, Menu, X, BookOpenText } from 'lucide-react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-[#f8fafc]">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 justify-between">
                        <div className="flex">
                            {/* Logo */}
                            <div className="flex shrink-0 items-center">
                                <Link href="/" className="flex items-center gap-2 group">
                                    <div className="bg-indigo-600 p-2 rounded-xl group-hover:rotate-6 transition-transform">
                                        <BookOpenText className="h-6 w-6 text-white" />

                                    </div>
                                    <span className="text-xl font-black tracking-tighter text-slate-900">
                                        Libro<span className="text-indigo-600">Sphere.</span>
                                    </span>
                                </Link>
                            </div>

                            {/* Desktop Navigation */}
                            <div className="hidden space-x-4 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                    className="inline-flex items-center gap-2"
                                >
                                    <LayoutDashboard className="w-4 h-4" />
                                    Dashboard
                                </NavLink>
                                <NavLink
                                    href={route('katalog.index')}
                                    active={route().current('katalog.index')}
                                    className="inline-flex items-center gap-2"
                                >
                                    <Book className="w-4 h-4" />
                                    Katalog Buku
                                </NavLink>
                            </div>
                        </div>

                        {/* User Settings Dropdown */}
                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button className="flex items-center gap-3 px-3 py-2 rounded-2xl border border-transparent hover:border-slate-100 hover:bg-slate-50 transition-all duration-300 focus:outline-none">
                                            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-black text-xs">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div className="text-left">
                                                <p className="text-xs font-black text-slate-900 leading-none">{user.name}</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Member</p>
                                            </div>
                                            <ChevronDown className="ms-1 h-4 w-4 text-slate-400" />
                                        </button>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <div className="px-4 py-2 border-b border-slate-50 mb-1">
                                            <p className="text-[10px] font-black text-slate-400 uppercase">Akun Saya</p>
                                        </div>
                                        <Dropdown.Link href={route('profile.edit')} className="flex items-center gap-2">
                                            <User className="w-4 h-4" /> Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="flex items-center gap-2 text-rose-600 hover:bg-rose-50"
                                        >
                                            <LogOut className="w-4 h-4" /> Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((prev) => !prev)}
                                className="inline-flex items-center justify-center rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-500 focus:outline-none transition-colors"
                            >
                                {showingNavigationDropdown ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden bg-white border-t border-slate-100'}>
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('katalog.index')} active={route().current('katalog.index')}>
                            Katalog Buku
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-slate-100 pb-1 pt-4">
                        <div className="px-4 flex items-center gap-3 mb-3">
                            <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                                {user.name.charAt(0)}
                            </div>
                            <div>
                                <div className="text-base font-black text-slate-900 leading-none">{user.name}</div>
                                <div className="text-sm font-medium text-slate-500">{user.email}</div>
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profile Settings</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button" className="text-rose-600">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Header / Page Title */}
            {header && (
                <header className="bg-white">
                    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            {/* Page Content */}
            <main className="animate-in fade-in duration-500">
                {children}
            </main>

            {/* Footer Sederhana */}
            <footer className="border-t border-slate-100 bg-white py-12 mt-20">
                <div className="mx-auto max-w-7xl px-4 text-center">
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">
                        © 2025 LibroSphere Digital Library
                    </p>
                </div>
            </footer>
        </div>
    );
}