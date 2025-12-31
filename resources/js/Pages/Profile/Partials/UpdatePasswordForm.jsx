import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';
import { Transition } from '@headlessui/react';
import { KeyRound } from 'lucide-react';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();
        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }
                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <form onSubmit={updatePassword} className="space-y-6">
                <div className="space-y-4">
                    <div className="relative group">
                        <InputLabel htmlFor="current_password" value="Kata Sandi Saat Ini" className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2" />
                        <TextInput
                            id="current_password"
                            ref={currentPasswordInput}
                            value={data.current_password}
                            onChange={(e) => setData('current_password', e.target.value)}
                            type="password"
                            className="w-full bg-slate-50 border-transparent focus:bg-white focus:border-indigo-600 rounded-xl"
                            autoComplete="current-password"
                        />
                        <InputError message={errors.current_password} className="mt-2" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <InputLabel htmlFor="password" value="Kata Sandi Baru" className="text-[10px] font-black uppercase tracking-widest text-slate-400" />
                            <TextInput
                                id="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                type="password"
                                className="w-full bg-slate-50 border-transparent focus:bg-white focus:border-indigo-600 rounded-xl"
                                autoComplete="new-password"
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="space-y-2">
                            <InputLabel htmlFor="password_confirmation" value="Konfirmasi Sandi" className="text-[10px] font-black uppercase tracking-widest text-slate-400" />
                            <TextInput
                                id="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                type="password"
                                className="w-full bg-slate-50 border-transparent focus:bg-white focus:border-indigo-600 rounded-xl"
                                autoComplete="new-password"
                            />
                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing} className="bg-slate-900 hover:bg-black px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest">
                        Perbarui Sandi
                    </PrimaryButton>

                    <Transition show={recentlySuccessful}>
                        <p className="text-sm font-bold text-indigo-600">Berhasil diperbarui.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}