"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/NavBar";
import AnimatedBackground from "@/components/AnimatedBackground";

import { FiUsers, FiServer, FiPlusCircle, FiLogOut, FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "@/hooks/useTheme";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const mockStats = {
    totalUsers: 1234,
    activeSessions: 85,
    systemStatus: "Tüm sistemler sorunsuz çalışıyor",
    newRequests: 7,
};

const mockUserListInitial = [
    { id: 1, name: "Ahmet Yılmaz", email: "ahmet@example.com", role: "user", status: "aktif" },
    { id: 2, name: "Mehmet Demir", email: "mehmet@example.com", role: "admin", status: "aktif" },
    { id: 3, name: "Ayşe Kaya", email: "ayse@example.com", role: "user", status: "pasif" },
    { id: 4, name: "Fatma Öztürk", email: "fatma@example.com", role: "user", status: "aktif" },
    { id: 5, name: "Hasan Koç", email: "hasan@example.com", role: "user", status: "aktif" },
];

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { theme, toggleTheme } = useTheme();

    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [userList, setUserList] = useState(mockUserListInitial);

    useEffect(() => {
        if (status === "unauthenticated") router.push("/login");
        else if (status === "authenticated" && session?.user?.role !== "admin") router.push("/");
    }, [session, status, router]);

    if (status === "loading")
        return <p className="text-center mt-20 text-white">Yükleniyor...</p>;

    if (!(status === "authenticated" && session.user?.role === "admin")) return null;

    const filteredUsers = userList.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase())
            || user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === "all" || user.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    const handleRoleChange = (userId: number, newRole: string) => {
        setUserList(prev =>
            prev.map(u => (u.id === userId ? { ...u, role: newRole } : u))
        );
        alert(`Kullanıcı ID ${userId} rolü '${newRole}' olarak güncellendi (Backend entegre değil)`);
    };

    const data = {
        labels: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz"],
        datasets: [
            {
                label: "Yeni Kayıtlar",
                data: [50, 75, 150, 100, 200, 180, 220],
                backgroundColor: "rgba(99, 102, 241, 0.7)",
            },
            {
                label: "Aktif Oturumlar",
                data: [30, 50, 100, 80, 150, 120, 180],
                backgroundColor: "rgba(139, 92, 246, 0.7)",
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                labels: { color: "#c7d2fe" },
            },
            title: {
                display: true,
                text: "Aylık Kullanıcı ve Oturum Grafiği",
                color: "#a5b4fc",
                font: { size: 20, weight: "bold" as const },
            },
            tooltip: {
                enabled: true,
            },
        },
        scales: {
            x: {
                ticks: { color: "#c7d2fe" },
                grid: { color: "rgba(255,255,255,0.1)" },
            },
            y: {
                ticks: { color: "#c7d2fe" },
                grid: { color: "rgba(255,255,255,0.1)" },
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="min-h-screen bg-gradient-to-tr from-indigo-900 via-purple-900 to-pink-900 relative text-white flex flex-col">
            <Navbar />
            <AnimatedBackground />

            <main className="mt-[80px] flex flex-1 max-w-7xl mx-auto p-6 sm:p-10 gap-8 z-10">
                <aside className="w-64 bg-indigo-800 bg-opacity-80 rounded-xl p-6 flex flex-col justify-between shadow-lg border border-indigo-600">
                    <div>
                        <h2 className="text-3xl font-extrabold mb-8 text-indigo-300 drop-shadow-md">Admin Panel</h2>

                        <nav className="flex flex-col gap-5 font-semibold text-indigo-200">
                            <a href="/admin/users" className="hover:text-indigo-400 transition flex items-center gap-3">
                                <FiUsers size={20} /> Kullanıcılar
                            </a>
                            <a href="/admin/system" className="hover:text-indigo-400 transition flex items-center gap-3">
                                <FiServer size={20} /> Sistem Durumu
                            </a>
                            <a href="/admin/new-user" className="hover:text-indigo-400 transition flex items-center gap-3">
                                <FiPlusCircle size={20} /> Yeni Kullanıcı Ekle
                            </a>
                        </nav>
                    </div>

                    <div className="mt-8 border-t border-indigo-600 pt-6 flex items-center justify-between">
                        <div>
                            <p className="font-semibold">{session.user?.name || "Admin"}</p>
                            <p className="text-indigo-400 text-sm">{session.user?.email}</p>
                        </div>
                        <button
                            onClick={() => signOut({ callbackUrl: "/login" })}
                            aria-label="Çıkış yap"
                            className="hover:text-red-500 transition"
                            title="Çıkış yap"
                        >
                            <FiLogOut size={24} />
                        </button>
                    </div>
                </aside>

                <section className="flex-1 flex flex-col gap-10">

                    <header className="flex justify-between items-center">
                        <h1 className="text-4xl font-extrabold tracking-wide drop-shadow-lg">
                            Hoş geldin, {session.user?.name || "Admin"} 👋
                        </h1>

                        <button
                            onClick={toggleTheme}
                            aria-label="Tema değiştir"
                            title={theme === "dark" ? "Açık Tema" : "Koyu Tema"}
                            className="p-2 rounded-md bg-indigo-700/70 hover:bg-indigo-600 transition text-white shadow-lg"
                        >
                            {theme === "dark" ? <FiSun size={24} /> : <FiMoon size={24} />}
                        </button>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        <div className="bg-indigo-700 bg-opacity-70 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:scale-[1.04] cursor-default flex flex-col">
                            <div className="flex items-center gap-3 mb-3">
                                <FiUsers size={30} className="text-indigo-300" />
                                <h2 className="text-2xl font-semibold text-indigo-300">Toplam Kullanıcı</h2>
                            </div>
                            <p className="text-5xl font-extrabold text-white">{mockStats.totalUsers}</p>
                            <p className="mt-2 text-indigo-200">Platformdaki kayıtlı kullanıcı sayısı</p>
                        </div>

                        <div className="bg-indigo-700 bg-opacity-70 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:scale-[1.04] cursor-default flex flex-col">
                            <div className="flex items-center gap-3 mb-3">
                                <FiServer size={30} className="text-indigo-300" />
                                <h2 className="text-2xl font-semibold text-indigo-300">Sistem Durumu</h2>
                            </div>
                            <p className="text-lg font-medium text-indigo-200">{mockStats.systemStatus}</p>
                            <p className="mt-2 text-indigo-200">Sistemde herhangi bir sorun yoktur.</p>
                        </div>

                        <div className="bg-indigo-700 bg-opacity-70 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:scale-[1.04] cursor-pointer flex flex-col">
                            <div className="flex items-center gap-3 mb-3">
                                <FiPlusCircle size={30} className="text-indigo-300" />
                                <h2 className="text-2xl font-semibold text-indigo-300">Hızlı Erişim</h2>
                            </div>
                            <button
                                onClick={() => alert("Yeni kullanıcı ekleme modülü yakında!")}
                                className="mt-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition shadow-md"
                            >
                                Yeni Kullanıcı Ekle
                            </button>
                        </div>
                    </div>


                    <div className="bg-indigo-700 bg-opacity-70 p-6 rounded-2xl shadow-lg border border-indigo-500/50">
                        <Bar data={data} options={options} />
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
                        <input
                            aria-label="Kullanıcı ara"
                            type="text"
                            placeholder="İsim veya e-posta ara..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full sm:w-1/2 p-3 rounded-md border border-indigo-400 bg-indigo-800 text-indigo-100 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />

                        <select
                            aria-label="Rol filtrele"
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            className="w-full sm:w-1/3 p-3 rounded-md border border-indigo-400 bg-indigo-800 text-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="all">Tüm Roller</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>

                    </div>

                    <section className="bg-indigo-700 bg-opacity-70 rounded-2xl shadow-lg border border-indigo-500/50 overflow-x-auto">
                        <h2 className="text-3xl font-extrabold mb-6 text-indigo-300 p-6 drop-shadow-md">Kullanıcı Listesi</h2>
                        <table className="min-w-full text-left border-collapse">
                            <thead className="bg-indigo-800">
                                <tr>
                                    <th className="py-3 px-6 font-semibold text-indigo-300 border-b border-indigo-600">#</th>
                                    <th className="py-3 px-6 font-semibold text-indigo-300 border-b border-indigo-600">İsim</th>
                                    <th className="py-3 px-6 font-semibold text-indigo-300 border-b border-indigo-600">E-posta</th>
                                    <th className="py-3 px-6 font-semibold text-indigo-300 border-b border-indigo-600">Rol</th>
                                    <th className="py-3 px-6 font-semibold text-indigo-300 border-b border-indigo-600">Durum</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="even:bg-indigo-800 hover:bg-indigo-600 transition cursor-pointer">
                                        <td className="py-3 px-6 border-b border-indigo-600">{user.id}</td>
                                        <td className="py-3 px-6 border-b border-indigo-600">{user.name}</td>
                                        <td className="py-3 px-6 border-b border-indigo-600">{user.email}</td>
                                        <td className="py-3 px-6 border-b border-indigo-600">
                                            <select
                                                value={user.role}
                                                onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                                className="bg-indigo-800 text-indigo-100 rounded-md p-1 w-full"
                                            >
                                                <option value="user">User</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        </td>
                                        <td
                                            className={`py-3 px-6 border-b border-indigo-600 font-semibold ${user.status === "aktif" ? "text-green-400" : "text-red-400"
                                                }`}
                                        >
                                            {user.status}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>

                </section>
            </main>
        </div>
    );
}
