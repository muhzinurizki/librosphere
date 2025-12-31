import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useState, useRef } from 'react';
import { Trash2, ShieldAlert } from 'lucide-react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const { data, setData, delete: destroy, processing, reset, errors } = useForm({ password: '' });

    const deleteUser = (e) => {
        e.preventDefault();
        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        reset();
    };

    return (
        <section className={className}>
            <p className="text-sm text-rose-700 font-medium mb-6">
                Tindakan ini permanen. Pastikan Anda sudah mengembalikan semua buku sebelum menutup akun.
            </p>

            <DangerButton
                onClick={() => setConfirmingUserDeletion(true)}
                className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest"
            >
                <Trash2 className="w-4 h-4" /> Hapus Akun LibroSphere
            </DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-8">
                    <div className="flex items-center gap-4 text-rose-600 mb-6">
                        <div className="p-3 bg-rose-50 rounded-2xl">
                            <ShieldAlert className="w-8 h-8" />
                        </div>
                        <h2 className="text-2xl font-black tracking-tight">Hapus Akun Permanen?</h2>
                    </div>

                    <p className="text-slate-500 mb-8 leading-relaxed">
                        Mohon masukkan kata sandi Anda untuk mengonfirmasi bahwa Anda ingin menghapus akun ini secara permanen.
                    </p>

                    <div className="space-y-2">
                        <InputLabel htmlFor="password" value="Password Konfirmasi" className="sr-only" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full border-slate-200 rounded-xl"
                            placeholder="Kata Sandi Anda"
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-10 flex justify-end gap-3">
                        <SecondaryButton onClick={closeModal} className="px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs">
                            Batal
                        </SecondaryButton>
                        <DangerButton className="px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs" disabled={processing}>
                            Ya, Hapus Akun
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}