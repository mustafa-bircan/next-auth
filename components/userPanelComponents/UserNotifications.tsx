"use client";

import React, { useState, useEffect, useRef } from "react";

type Notification = {
    id: number;
    message: string;
    date: string;
    read: boolean;
};

const mockNotifications: Notification[] = [
    { id: 1, message: "Siparişiniz kargoya verildi.", date: "2025-06-24", read: false },
    { id: 2, message: "Yeni kampanya: %20 indirim!", date: "2025-06-22", read: true },
    { id: 3, message: "Profil bilgileriniz güncellendi.", date: "2025-06-20", read: false },
];

export default function UserNotifications() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setNotifications(mockNotifications);
    }, []);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }

        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div ref={containerRef} className="relative">
            <button
                onClick={() => setOpen(prev => !prev)}
                className="relative p-2 rounded-full hover:bg-indigo-700 transition"
                aria-label="Bildirimler"
            >
                🔔
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                        {unreadCount}
                    </span>
                )}
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-80 bg-indigo-800 rounded-lg shadow-lg border border-indigo-700 z-50 max-h-96 overflow-auto">
                    <h3 className="p-4 font-bold text-indigo-300 border-b border-indigo-700">Bildirimler</h3>
                    <ul>
                        {notifications.length === 0 && (
                            <li className="p-4 text-indigo-400 text-center">Bildirim bulunmamaktadır.</li>
                        )}
                        {notifications.map(({ id, message, date, read }) => (
                            <li
                                key={id}
                                className={`p-4 border-b border-indigo-700 cursor-default hover:bg-indigo-700 transition ${!read ? "bg-indigo-900" : ""
                                    }`}
                            >
                                <p className="text-sm">{message}</p>
                                <p className="text-xs text-indigo-500 mt-1">{new Date(date).toLocaleDateString()}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
