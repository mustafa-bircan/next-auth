"use client";

import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

const customerMetrics = [
    {
        customer: "ACME Corp",
        orders: 10,
        totalSpent: 45,
        loyalty: 80,
    },
    {
        customer: "GlobalTextiles",
        orders: 8,
        totalSpent: 38,
        loyalty: 75,
    },
    {
        customer: "Yıldız Tekstil",
        orders: 12,
        totalSpent: 52,
        loyalty: 90,
    },
    {
        customer: "Sapphire Imports",
        orders: 6,
        totalSpent: 30,
        loyalty: 60,
    },
];


export default function CustomerRadarChart() {
    return (
        <div className="bg-indigo-800 p-6 rounded-xl shadow-lg text-white">
            <h2 className="text-2xl font-bold mb-4">🧭 Müşteri Sadakat Analizi</h2>
            <ResponsiveContainer width="100%" height={400}>
                <RadarChart outerRadius={130} data={customerMetrics}>
                    <PolarGrid stroke="#64748b" />
                    <PolarAngleAxis dataKey="customer" stroke="#cbd5e1" />
                    <PolarRadiusAxis angle={30} stroke="#cbd5e1" />
                    <Tooltip />
                    <Legend />
                    <Radar
                        name="Sipariş Sayısı"
                        dataKey="orders"
                        stroke="#facc15"
                        fill="#facc15"
                        fillOpacity={0.4}
                    />
                    <Radar
                        name="Toplam Harcama (x1000 TL)"
                        dataKey="totalSpent"
                        stroke="#38bdf8"
                        fill="#38bdf8"
                        fillOpacity={0.4}
                    />
                    <Radar
                        name="Sadakat Puanı"
                        dataKey="loyalty"
                        stroke="#a78bfa"
                        fill="#a78bfa"
                        fillOpacity={0.4}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
