"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const logisticsMonthlyMock = [
    { month: "Ocak", inTransit: 120, delivered: 95 },
    { month: "Şubat", inTransit: 80, delivered: 110 },
    { month: "Mart", inTransit: 140, delivered: 130 },
    { month: "Nisan", inTransit: 100, delivered: 105 },
    { month: "Mayıs", inTransit: 130, delivered: 125 },
    { month: "Haziran", inTransit: 90, delivered: 115 },
    { month: "Temmuz", inTransit: 110, delivered: 120 },
];

export default function LogisticsLineChart() {
    return (
        <div className="bg-indigo-800 p-6 rounded-xl shadow-lg text-white">
            <h2 className="text-2xl font-bold mb-4">🚚 Aylık Lojistik Dağılımı</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart
                    data={logisticsMonthlyMock}
                    margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                    <XAxis dataKey="month" stroke="#e0e7ff" />
                    <YAxis stroke="#e0e7ff" />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="inTransit"
                        name="Yolda"
                        stroke="#60a5fa"
                        strokeWidth={3}
                        activeDot={{ r: 8 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="delivered"
                        name="Teslim Edilen"
                        stroke="#34d399"
                        strokeWidth={3}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
