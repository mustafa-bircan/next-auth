"use client";

import React from "react";

type SidebarProps = {
    selected: string;
    onSelect: (key: string) => void;
};

const menuItems = [
    { key: "kpi", label: "KPI Paneli" },
    { key: "fireRate", label: "Fire Oranları" },
    { key: "customerForm", label: "Müşteri Ekle" },
    { key: "customerRadar", label: "Müşteri Sadakat" },
    { key: "enhancedFilters", label: "Filtreler" },
    { key: "logistics", label: "Lojistik" },
    { key: "notifications", label: "Bildirimler" },
    { key: "orders", label: "Siparişler" },
];

export default function Sidebar({ selected, onSelect }: SidebarProps) {
    return (
        <nav className="w-60 bg-indigo-900 text-indigo-100 min-h-screen p-6">
            <h2 className="text-2xl font-bold mb-8">Admin Menü</h2>
            <ul className="space-y-3">
                {menuItems.map((item) => (
                    <li
                        key={item.key}
                        onClick={() => onSelect(item.key)}
                        className={`cursor-pointer rounded-md px-4 py-2 hover:bg-indigo-700 transition ${selected === item.key ? "bg-indigo-700 font-semibold" : ""
                            }`}
                    >
                        {item.label}
                    </li>
                ))}
            </ul>
        </nav>
    );
}
