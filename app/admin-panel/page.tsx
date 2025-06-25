/* "use client";

import { adminDashboardData } from "@/data/adminData";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Legend,
} from "recharts";

export default function AdminPanel() {
    const {
        products,
        fireRates,
        salesByCountry,
        payments,
        productionStats,
        logistics,
    } = adminDashboardData;

    const productionData = Object.entries(products).map(([name, data]) => ({
        name,
        Günlük: data.dailyProduced,
        Toplam: data.totalProduced,
        Satış: data.totalSold,
        Fire: data.waste,
    }));

    return (
        <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-10 text-white space-y-12">
            <header className="text-center">
                <h1 className="text-4xl font-extrabold drop-shadow-lg">
                    🏭 Admin Paneline Hoşgeldiniz
                </h1>
                <p className="text-indigo-200 mt-2">Üretim ve Satış Raporları</p>
            </header>

            <section className="bg-indigo-800 p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-4">📊 Ürün Üretim Grafiği</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={productionData} margin={{ top: 20, right: 20, left: -20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                        <XAxis dataKey="name" stroke="#e0e7ff" />
                        <YAxis stroke="#e0e7ff" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Günlük" fill="#6366f1" />
                        <Bar dataKey="Toplam" fill="#a78bfa" />
                        <Bar dataKey="Satış" fill="#f472b6" />
                    </BarChart>
                </ResponsiveContainer>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-4">📦 Ürün Detayları</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Object.entries(products).map(([productName, product]) => (
                        <div key={productName} className="bg-white/10 backdrop-blur-sm shadow-xl p-4 rounded-xl border border-white/10 transition hover:scale-105">
                            <h3 className="text-xl font-bold capitalize text-pink-300">{productName}</h3>
                            <ul className="text-sm mt-2 text-indigo-100 space-y-1">
                                <li>Günlük Üretim: {product.dailyProduced}</li>
                                <li>Fire: {product.waste}</li>
                                <li>Fire Oranı: {fireRates[productName as keyof typeof fireRates].toFixed(2)}%</li>
                                <li>Toplam Üretim: {product.totalProduced}</li>
                                <li>Toplam Satış: {product.totalSold}</li>
                                <li>Stok: {product.stock}</li>
                                <li>Birim Fiyat: {product.pricePerUnit} TL</li>
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-4">🌍 Ülkelere Göre Satış</h2>
                <div className="space-y-6">
                    {salesByCountry.map((country) => (
                        <div key={country.country} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/10">
                            <h3 className="text-xl font-bold text-indigo-200">{country.country}</h3>
                            <p>Satılan Ürün: {country.totalSoldUnits}</p>
                            <p>Toplam Tutar: {country.amountSoldTL.toLocaleString()} TL</p>
                            <p>Yolda: {country.amountInTransitUnits} ürün – {country.amountInTransitTL.toLocaleString()} TL</p>
                            <h4 className="mt-2 font-semibold text-indigo-300">Müşteriler:</h4>
                            <ul className="list-disc list-inside text-sm text-indigo-100">
                                {country.topClients.map((client) => (
                                    <li key={client.email}>
                                        {client.company} – {client.contactName} ({client.email})
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
} */


"use client";

import AdminPanel from "@/components/adminPanelComponents/AdminPanel";



export default function AdminPanelPage() {
    return <AdminPanel />;
}