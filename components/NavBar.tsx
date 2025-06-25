"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "@/hooks/useTheme";

export default function Navbar() {
    const { data: session, status } = useSession();
    const { theme, toggleTheme } = useTheme();

    const handleLogout = async () => {
        localStorage.clear();
        sessionStorage.clear();

        await signOut({
            redirect: false,
            callbackUrl: "/login",
        });

        window.location.href = `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/v2/logout?client_id=${process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}&returnTo=${encodeURIComponent("http://localhost:3000/login")}`;
    };

    return (
        <nav className="fixed w-full bg-black bg-opacity-40 backdrop-blur-md shadow-lg z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-extrabold text-white tracking-wide hover:text-indigo-300 transition">
                    NextAuth Case
                </Link>

                <div className="flex items-center space-x-6">
                    <button
                        onClick={toggleTheme}
                        aria-label="Toggle Theme"
                        className="text-white hover:text-indigo-300 transition text-xl p-1 rounded"
                        title={theme === "dark" ? "Açık Tema" : "Koyu Tema"}
                    >
                        {theme === "dark" ? <FiSun /> : <FiMoon />}
                    </button>

                    {status === "loading" && <p>Yükleniyor...</p>}

                    {status === "authenticated" && session?.user ? (
                        <>
                            <span className="text-white mr-4">Hoşgeldin, {session.user?.name || session.user?.email}</span>

                            <nav className="flex space-x-4 items-center">
                                {session.user.role === "user" && (
                                    <>
                                        <Link href="/user/home" className="text-indigo-300 hover:underline">
                                            Kullanıcı Dashboard
                                        </Link>
                                        <Link href="/user-zone" className="text-indigo-300 hover:underline">
                                            Kullanıcı Alanı
                                        </Link>
                                    </>
                                )}

                                {session.user.role === "admin" && (
                                    <>
                                        <Link href="/admin/dashboard" className="text-indigo-300 hover:underline">
                                            Admin Dashboard
                                        </Link>
                                        <Link href="/admin-panel" className="text-indigo-300 hover:underline">
                                            Admin Panel
                                        </Link>
                                        <Link href="/user-zone" className="text-indigo-300 hover:underline">
                                            Kullanıcı Alanı
                                        </Link>
                                    </>
                                )}
                            </nav>


                            <button
                                onClick={handleLogout}
                                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition ml-4"
                            >
                                Çıkış Yap
                            </button>
                        </>
                    ) : (
                        <Link
                            href="/login"
                            className="bg-green-500 px-3 py-1 rounded hover:bg-green-600 transition"
                        >
                            Giriş Yap
                        </Link>
                    )}

                </div>
            </div>
        </nav>
    );
}
