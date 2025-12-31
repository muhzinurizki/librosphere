import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { CheckCircle } from 'lucide-react';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <form onSubmit={submit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <InputLabel htmlFor="name" value="Nama Lengkap" className="text-xs font-black uppercase tracking-widest ml-1" />
                        <TextInput
                            id="name"
                            className="w-full border-slate-200 focus:border-indigo-600 focus:ring-indigo-600 rounded-xl transition-all"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            isFocused
                            autoComplete="name"
                        />
                        <InputError className="mt-2" message={errors.name} />
                    </div>

                    <div className="space-y-2">
                        <InputLabel htmlFor="email" value="Alamat Email" className="text-xs font-black uppercase tracking-widest ml-1" />
                        <TextInput
                            id="email"
                            type="email"
                            className="w-full border-slate-200 focus:border-indigo-600 focus:ring-indigo-600 rounded-xl transition-all"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            autoComplete="username"
                        />
                        <InputError className="mt-2" message={errors.email} />
                    </div>
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                        <p className="text-sm text-amber-800">
                            Email Anda belum diverifikasi.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="ml-2 underline font-bold hover:text-amber-900"
                            >
                                Klik di sini untuk mengirim ulang.
                            </Link>
                        </p>
                    </div>
                )}

                <div className="flex items-center gap-4 pt-4">
                    <PrimaryButton 
                        disabled={processing}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-lg shadow-indigo-100"
                    >
                        Simpan Perubahan
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0 translate-x-4"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm font-bold text-emerald-600 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" /> Tersimpan
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}