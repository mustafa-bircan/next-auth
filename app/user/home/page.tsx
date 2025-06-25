"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/NavBar";
import AnimatedBackground from "@/components/AnimatedBackground";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "@/hooks/useTheme";

const mockUsage = { used: 27, limit: 50 };
const mockPlan = "Ücretsiz";
const mockNotifications = [
    { id: 1, text: "Abonelik yenilemeniz 3 gün sonra sona erecek." },
    { id: 2, text: "Yeni özellikler yakında geliyor, bizi takipte kalın!" },
];
const mockLastLogin = "2025-06-21 14:32:11";
const mockActiveSessions = [
    { id: 1, device: "Chrome - Windows", ip: "192.168.1.100", current: true },
    { id: 2, device: "Safari - iPhone", ip: "192.168.1.101", current: false },
];

const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Günaydın";
    if (hour < 18) return "İyi günler";
    return "İyi akşamlar";
};

const getInitials = (nameOrEmail: string | undefined | null): string => {
    if (!nameOrEmail) return "?";
    const name = nameOrEmail.split(" ")[0] || nameOrEmail;
    return name.charAt(0).toUpperCase();
};


export default function UserHomePage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        if (status === "unauthenticated") router.push("/login");
        else if (status === "authenticated" && session?.user?.role !== "user") router.push("/");
    }, [session, status, router]);

    const handleLogout = async () => {
        localStorage.clear();
        sessionStorage.clear();

        await signOut({
            redirect: false,
            callbackUrl: "/login",
        });

        window.location.href = `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/v2/logout?client_id=${process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}&returnTo=${encodeURIComponent("http://localhost:3000/login")}`;
    };

    if (status === "loading")
        return <p className="text-center mt-10 text-white">Yükleniyor...</p>;

    if (!(status === "authenticated" && session.user?.role === "user")) return null;

    return (
        <div className="min-h-screen bg-gradient-to-tr from-indigo-900 via-purple-900 to-pink-900 text-white relative flex flex-col">
            <Navbar />
            <AnimatedBackground />

            <main className="flex flex-1 max-w-full px-6 sm:px-12 py-8 pt-20 gap-8 relative z-10">

                <aside className="w-1/4 bg-gradient-to-br from-indigo-800 via-purple-900 to-pink-900 bg-opacity-80 rounded-xl p-6 flex flex-col gap-10 shadow-xl max-h-[85vh] overflow-y-auto border border-indigo-500/30">

                    <section>
                        <h2 className="text-2xl font-extrabold mb-5 text-indigo-400 drop-shadow-md">Bildirimler</h2>
                        {mockNotifications.length > 0 ? (
                            <ul className="list-disc list-inside space-y-3 text-gray-300 font-medium">
                                {mockNotifications.map((n) => (
                                    <li key={n.id} className="hover:text-indigo-300 transition cursor-pointer">{n.text}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="italic text-gray-400">Yeni bildiriminiz yok.</p>
                        )}
                    </section>

                    <section>
                        <h2 className="text-2xl font-extrabold mb-5 text-indigo-400 drop-shadow-md">Destek</h2>
                        <p className="text-gray-300 mb-2">Her zaman buradayız 👨‍💻</p>
                        <a
                            href="mailto:help@kayraexport.com"
                            className="text-indigo-300 hover:underline font-semibold"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            help@kayraexport.com
                        </a>
                    </section>

                    <section>
                        <h2 className="text-2xl font-extrabold mb-5 text-indigo-400 drop-shadow-md">Hızlı Erişim</h2>
                        <ul className="space-y-2 text-gray-300 font-medium">
                            <li>
                                <a href="/profile" className="hover:text-indigo-300 transition">Profilimi Düzenle</a>
                            </li>
                            <li>
                                <a href="/billing" className="hover:text-indigo-300 transition">Abonelik Bilgileri</a>
                            </li>
                            <li>
                                <a href="/security" className="hover:text-indigo-300 transition">Güvenlik Ayarları</a>
                            </li>
                        </ul>
                    </section>

                </aside>

                <section className="flex-1 flex flex-col gap-12">

                    <header className="flex justify-between items-center">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center shadow-lg text-3xl font-bold text-white select-none">
                                {getInitials(session.user?.name || session.user?.email)}
                            </div>
                            <h1 className="text-5xl font-extrabold drop-shadow-lg tracking-wide">
                                {getGreeting()}, {session.user?.name || session.user?.email} 👋
                            </h1>
                        </div>
                        <button
                            onClick={toggleTheme}
                            aria-label="Toggle Theme"
                            className="text-white hover:text-indigo-300 transition text-4xl p-3 rounded-md bg-indigo-700/60 shadow-lg shadow-indigo-900/80"
                            title={theme === "dark" ? "Açık Tema" : "Koyu Tema"}
                        >
                            {theme === "dark" ? <FiSun /> : <FiMoon />}
                        </button>
                    </header>

                    <div className="bg-gradient-to-tr from-indigo-900 via-purple-900 to-pink-900 bg-opacity-80 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-[1.03] border border-indigo-500/50">
                        <h2 className="text-3xl font-bold text-indigo-300 mb-4 drop-shadow-md">Abonelik Bilgileri</h2>
                        <p className="text-lg font-semibold">
                            Plan: <span className="text-indigo-400">{mockPlan}</span>
                        </p>
                        <p className="text-lg font-semibold mt-2">
                            Kullanım: <span className="text-indigo-400">{mockUsage.used} / {mockUsage.limit} işlem</span>
                        </p>
                        <progress
                            value={mockUsage.used}
                            max={mockUsage.limit}
                            className="w-full h-5 rounded-lg bg-indigo-600/30 mt-3"
                        />
                        <button
                            onClick={() => alert("Plan yükseltme sayfası yakında")}
                            className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white font-semibold shadow-md transition"
                        >
                            Planımı Yükselt
                        </button>
                    </div>

                    <div className="bg-gradient-to-tr from-indigo-900 via-purple-900 to-pink-900 bg-opacity-80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-indigo-500/50 flex flex-col">
                        <h2 className="text-3xl font-bold text-indigo-300 mb-4 drop-shadow-md">Güvenlik ve Oturumlar</h2>
                        <ul className="list-disc list-inside text-gray-300 max-h-48 overflow-auto font-medium">
                            {mockActiveSessions.map((s) => (
                                <li key={s.id} className={s.current ? "font-semibold text-indigo-400" : ""}>
                                    {s.device} - IP: {s.ip} {s.current && "(Şu an)"}
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={() => alert("Tüm oturumlar kapatıldı!")}
                            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white font-semibold shadow-md transition self-start"
                        >
                            Tüm Oturumları Kapat
                        </button>
                    </div>

                    <div className="bg-gradient-to-tr from-indigo-900 via-purple-900 to-pink-900 bg-opacity-80 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-[1.03] border border-indigo-500/50">
                        <h3 className="text-2xl font-bold text-indigo-300 mb-6 drop-shadow-md">Kayıt Bilgisi</h3>
                        <p className="text-lg font-semibold">
                            E-posta: <span className="text-indigo-400">{session.user?.email}</span>
                        </p>
                        <p className="text-lg font-semibold mt-2">
                            Son Giriş: <span className="text-indigo-400">{mockLastLogin}</span>
                        </p>
                    </div>

                    <section className="bg-gradient-to-tr from-indigo-900 via-purple-900 to-pink-900 bg-opacity-80 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-indigo-500/50">
                        <h2 className="text-3xl font-extrabold mb-6 text-indigo-300 drop-shadow-md">Genel İstatistikler</h2>
                        <p className="mb-6 text-indigo-400 font-medium select-none">
                            Aşağıdaki değerler, platformdaki genel performansınıza ait özet bilgiler sunar.
                        </p>
                        <div className="grid grid-cols-4 gap-8 text-center text-white font-semibold select-none">
                            <div className="bg-indigo-700 bg-opacity-40 p-6 rounded-xl shadow-inner shadow-indigo-900/60 hover:bg-indigo-600 transition cursor-default">
                                <p className="text-4xl font-extrabold mb-1">124</p>
                                <p>Kullanıcı</p>
                            </div>
                            <div className="bg-indigo-700 bg-opacity-40 p-6 rounded-xl shadow-inner shadow-indigo-900/60 hover:bg-indigo-600 transition cursor-default">
                                <p className="text-4xl font-extrabold mb-1">321</p>
                                <p>Aktif İşlem</p>
                            </div>
                            <div className="bg-indigo-700 bg-opacity-40 p-6 rounded-xl shadow-inner shadow-indigo-900/60 hover:bg-indigo-600 transition cursor-default">
                                <p className="text-4xl font-extrabold mb-1">12</p>
                                <p>Destek Talebi</p>
                            </div>
                            <div className="bg-indigo-700 bg-opacity-40 p-6 rounded-xl shadow-inner shadow-indigo-900/60 hover:bg-indigo-600 transition cursor-default">
                                <p className="text-4xl font-extrabold mb-1">75</p>
                                <p>Partner</p>
                            </div>
                        </div>
                    </section>

                </section>
            </main>
        </div>
    );
}
