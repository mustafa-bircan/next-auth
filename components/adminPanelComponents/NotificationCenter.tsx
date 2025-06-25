"use client";

import { useState, useEffect } from "react";
import { FiTrash2, FiCheckCircle } from "react-icons/fi";

type Notification = {
    id: number;
    type: "new_customer" | "delayed_payment" | "info";
    message: string;
    date: string;
    read: boolean;
};

const mockNotifications: Notification[] = [
    {
        id: 1,
        type: "new_customer",
        message: "Yeni müşteri kaydı: Mustafa Yılmaz",
        date: "2025-06-24 10:15",
        read: false,
    },
    {
        id: 2,
        type: "delayed_payment",
        message: "Geciken ödeme var: Fatura #1234",
        date: "2025-06-23 17:30",
        read: false,
    },
    {
        id: 3,
        type: "info",
        message: "Sistem güncellemesi tamamlandı",
        date: "2025-06-22 09:00",
        read: true,
    },
];

export default function NotificationCenter() {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        setNotifications(mockNotifications);
    }, []);

    const handleMarkAllRead = () => {
        setNotifications((prev) =>
            prev.map((n) => ({ ...n, read: true }))
        );
    };

    const handleClear = () => {
        setNotifications([]);
    };

    return (
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 shadow-xl max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Bildirimler</h3>
                <div className="flex gap-2">
                    <button
                        onClick={handleMarkAllRead}
                        className="flex items-center gap-1 px-3 py-1 text-sm bg-indigo-600 hover:bg-indigo-500 text-white rounded-md transition"
                    >
                        <FiCheckCircle /> Tümünü Okundu Yap
                    </button>
                    <button
                        onClick={handleClear}
                        className="flex items-center gap-1 px-3 py-1 text-sm bg-red-600 hover:bg-red-500 text-white rounded-md transition"
                    >
                        <FiTrash2 /> Temizle
                    </button>
                </div>
            </div>

            {notifications.length === 0 ? (
                <p className="text-indigo-200 text-center py-8">Hiç bildirim bulunamadı.</p>
            ) : (
                <ul className="space-y-4">
                    {notifications.map((n) => (
                        <li
                            key={n.id}
                            className={`p-4 rounded-lg border border-indigo-700 transition ${n.read ? "bg-indigo-800/50" : "bg-indigo-900"
                                }`}
                        >
                            <div className="font-semibold text-white mb-1">
                                {n.type === "new_customer" && "🆕 Yeni Müşteri"}
                                {n.type === "delayed_payment" && "⚠️ Geciken Ödeme"}
                                {n.type === "info" && "ℹ️ Bilgi"}
                            </div>
                            <div className="text-sm text-indigo-200">{n.message}</div>
                            <div className="text-xs text-indigo-400 mt-1">{n.date}</div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
