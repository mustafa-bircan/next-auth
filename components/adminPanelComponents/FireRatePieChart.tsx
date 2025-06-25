"use client";

import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from "recharts";

const COLORS = ["#e879f9", "#8b5cf6", "#0ea5e9", "#facc15", "#34d399", "#fb7185"];

const data = [
    { name: "Pamuk", value: 3.4 },
    { name: "Keten", value: 2.8 },
    { name: "Viskon", value: 4.1 },
    { name: "Polyester", value: 5.2 },
];

export default function FireRatePieChart() {
    return (
        <div className="bg-indigo-800 p-6 rounded-xl shadow-lg text-white">
            <h2 className="text-2xl font-bold mb-4">🔥 Ürünlere Göre Fire Oranı</h2>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        dataKey="value"
                        nameKey="name"
                        data={data}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                        fill="#8884d8"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
