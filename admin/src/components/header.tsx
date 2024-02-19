import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { User } from '../types/types';
import { Link } from 'react-router-dom';
import axios from 'axios';

const navigation = [
    { name: 'Create', href: '/create' },
    { name: 'Admin Pannel', href: '/pannel' },
    { name: 'Profile', href: '/profile' }
]

interface PropsType {
    user: User | null;
}

export default function Header({ user }: PropsType) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            const { data }: { data: any } = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/logout`, { withCredentials: true });
            console.log(data);
        } catch (error: any) {
            console.log(error);
        }
    }

    return (
        <div className="bg-white mb-20">
            <header className="absolute inset-x-0 top-0 z-50">
                <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <Link to="/" onClick={() => setMobileMenuOpen(true)} className="-m-1.5 p-1.5">
                            <p className="text-xl font-medium">Admin</p>
                        </Link>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        {navigation.map((item) => (
                            <Link key={item.name} to={item.href} className="text-sm font-semibold leading-6 text-gray-900">
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        {user ? (
                            <div className='flex gap-2'>
                                {user.role.toUpperCase()}
                                {` - `}
                                {user.name}
                                <button onClick={handleLogout}>Log Out</button>
                            </div>
                        ) : (
                            <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900">
                                Log in
                            </Link>
                        )}
                    </div>
                </nav>
                <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                    <div className="fixed inset-0 z-50" />
                    <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <Link to="/" className="-m-1.5 p-1.5">
                                <p className='text-2xl font-medium'>Admin</p>
                            </Link>
                            <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    {navigation.map((item) => (
                                        <Link onClick={() => setMobileMenuOpen(false)}
                                            key={item.name}
                                            to={item.href}
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                                <div className="py-6">
                                    {user ? (
                                        <div className='flex gap-2'>
                                            {user.role.toUpperCase()}
                                            {` - `}
                                            {user.name}
                                            <button onClick={handleLogout}>Log Out</button>
                                        </div>
                                    ) : (
                                        <Link
                                            to="/login"
                                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                        >
                                            Log in
                                        </Link>
                                    )}

                                </div>
                            </div>
                        </div>
                    </Dialog.Panel>
                </Dialog>
            </header>
        </div>
    )
}