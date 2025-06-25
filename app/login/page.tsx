"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import LoginAnimatedBackground from "@/components/LoginAnimatedBackground";
import { FiLogIn, FiHelpCircle, FiLock, FiTwitter, FiGithub, FiFacebook } from "react-icons/fi";

export default function LoginPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (status === "authenticated" && session?.user?.role) {
            if (session.user.role === "admin") {
                router.push("/admin/dashboard");
            } else {
                router.push("/user/home");
            }
        }
    }, [session, status, router]);

    if (status === "loading")
        return <p className="text-center mt-10 text-white">Yükleniyor...</p>;
    if (status === "authenticated")
        return <p className="text-center mt-10 text-white">Yönlendiriliyorsunuz...</p>;

    return (
        <div className="relative z-0 min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 text-white px-6 sm:px-12" style={{ overflow: "hidden" }}>
            <LoginAnimatedBackground />

            <motion.div
                className="absolute -inset-10 rounded-3xl bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 opacity-40 blur-3xl animate-tilt"
                style={{ filter: "blur(80px)" }}
                aria-hidden="true"
            />

            <motion.header
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="mb-12 flex flex-col items-center space-y-3 select-none cursor-default z-10"
            >
                <div className="flex items-center space-x-4">
                    <FiLock size={48} className="text-indigo-400 animate-pulse" />
                    <h1 className="text-6xl font-extrabold tracking-tight drop-shadow-lg">
                        YourBrand
                    </h1>
                </div>
                <p className="text-indigo-200 text-center max-w-xl font-light text-lg tracking-wide px-2">
                    Dijital dünyaya açılan kapın. Güvenle ve hızla erişim sağla, geleceğe
                    güvenle yürü.
                </p>
            </motion.header>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative z-20 bg-white bg-opacity-10 rounded-3xl p-12 max-w-md w-full
         backdrop-blur-md shadow-xl border border-transparent hover:border-indigo-400
         transition-all duration-300 flex flex-col items-center"
            >
                <div className="mb-6 flex items-center space-x-3">
                    <FiLogIn size={36} className="text-indigo-300 animate-pulse" />
                    <h2 className="text-4xl font-extrabold tracking-wide drop-shadow-md">
                        Giriş Yap
                    </h2>
                </div>

                <p className="text-indigo-200 mb-8 text-center font-light tracking-wide px-4">
                    Dijital yolculuğunu başlatmak için hazır mısın? <br /> Güvenli ve hızlı
                    girişin adresindesin.
                </p>

                <button
                    onClick={async () => {
                        setLoading(true);
                        await signIn("auth0", {
                            callbackUrl: "/login",
                            prompt: "login",
                            screen_hint: "login",
                        });
                        setLoading(false);
                    }}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-700
           py-4 rounded-full font-semibold shadow-lg transition duration-300 flex justify-center items-center relative overflow-hidden"
                    aria-label="Auth0 ile Giriş Yap"
                >
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-500 opacity-25 blur-lg animate-pulse"></span>
                    <span className="relative z-10 flex items-center space-x-3">
                        {loading ? (
                            <svg
                                className="animate-spin h-6 w-6 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                role="status"
                                aria-live="polite"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8H4z"
                                ></path>
                            </svg>
                        ) : (
                            <>
                                <FiLogIn size={24} />
                                <span>Auth0 ile Giriş Yap</span>
                            </>
                        )}
                    </span>
                </button>

                <div className="mt-6 flex justify-between w-full px-2 text-indigo-300 text-sm font-light">
                    <a
                        href="#"
                        className="flex items-center space-x-1 hover:text-indigo-400 transition"
                        onClick={(e) => e.preventDefault()}
                    >
                        <FiLock />
                        <span>Şifremi Unuttum</span>
                    </a>
                    <a
                        href="#"
                        className="flex items-center space-x-1 hover:text-indigo-400 transition"
                        onClick={(e) => e.preventDefault()}
                    >
                        <FiHelpCircle />
                        <span>Yardım</span>
                    </a>
                </div>
            </motion.div>

            <motion.footer
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 1, ease: "easeOut" }}
                className="mt-12 flex flex-col items-center space-y-4 text-indigo-300 select-none z-10"
            >
                <p className="font-light text-sm italic max-w-md text-center px-4">
                    “Teknolojiyle dans et, geleceği yakala.” 🚀
                </p>

                <div className="flex space-x-6 text-2xl">
                    <a href="#" aria-label="Twitter" className="hover:text-blue-400 transition">
                        <FiTwitter />
                    </a>
                    <a href="#" aria-label="GitHub" className="hover:text-gray-400 transition">
                        <FiGithub />
                    </a>
                    <a href="#" aria-label="Facebook" className="hover:text-blue-600 transition">
                        <FiFacebook />
                    </a>
                </div>
            </motion.footer>
        </div>
    );
}
