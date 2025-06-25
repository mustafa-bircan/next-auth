"use client";

import { useState } from "react";

type Order = {
    id: number;
    customerName: string;
    product: string;
    quantity: number;
    pricePerUnit: number;
    status: "Hazırlanıyor" | "Yolda" | "Teslim Edildi" | "İptal Edildi";
    orderDate: string;
};

type Props = {
    orders: Order[];
};

export default function OrderListSection({ orders }: Props) {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");

    const filteredOrders = orders.filter((order) => {
        const matchesSearch =
            order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.product.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <section className="bg-indigo-800 bg-opacity-80 rounded-xl p-6 shadow-lg border border-indigo-600 max-w-full overflow-x-auto">
            <h2 className="text-2xl font-bold mb-4 text-indigo-300">🛒 Müşteri Siparişleri</h2>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Müşteri veya ürün ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-grow p-3 rounded-md border border-indigo-500 bg-indigo-900 text-indigo-100 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    aria-label="Sipariş ara"
                />

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="p-3 rounded-md border border-indigo-500 bg-indigo-900 text-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    aria-label="Sipariş durumu filtrele"
                >
                    <option value="all">Tüm Durumlar</option>
                    <option value="Hazırlanıyor">Hazırlanıyor</option>
                    <option value="Yolda">Yolda</option>
                    <option value="Teslim Edildi">Teslim Edildi</option>
                    <option value="İptal Edildi">İptal Edildi</option>
                </select>
            </div>

            <table className="min-w-full text-left border-collapse">
                <thead className="bg-indigo-900 text-indigo-300">
                    <tr>
                        <th className="py-3 px-6 border border-indigo-700">#</th>
                        <th className="py-3 px-6 border border-indigo-700">Müşteri</th>
                        <th className="py-3 px-6 border border-indigo-700">Ürün</th>
                        <th className="py-3 px-6 border border-indigo-700">Adet</th>
                        <th className="py-3 px-6 border border-indigo-700">Birim Fiyat (TL)</th>
                        <th className="py-3 px-6 border border-indigo-700">Toplam (TL)</th>
                        <th className="py-3 px-6 border border-indigo-700">Durum</th>
                        <th className="py-3 px-6 border border-indigo-700">Sipariş Tarihi</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.length === 0 ? (
                        <tr>
                            <td colSpan={8} className="text-center p-6 text-indigo-200">
                                Sipariş bulunamadı.
                            </td>
                        </tr>
                    ) : (
                        filteredOrders.map((order) => (
                            <tr
                                key={order.id}
                                className="even:bg-indigo-900 hover:bg-indigo-700 transition cursor-default"
                            >
                                <td className="py-3 px-6 border border-indigo-700">{order.id}</td>
                                <td className="py-3 px-6 border border-indigo-700">{order.customerName}</td>
                                <td className="py-3 px-6 border border-indigo-700">{order.product}</td>
                                <td className="py-3 px-6 border border-indigo-700">{order.quantity}</td>
                                <td className="py-3 px-6 border border-indigo-700">{order.pricePerUnit.toFixed(2)}</td>
                                <td className="py-3 px-6 border border-indigo-700">
                                    {(order.quantity * order.pricePerUnit).toFixed(2)}
                                </td>
                                <td
                                    className={`py-3 px-6 border border-indigo-700 font-semibold ${order.status === "Teslim Edildi"
                                            ? "text-green-400"
                                            : order.status === "İptal Edildi"
                                                ? "text-red-500"
                                                : "text-yellow-300"
                                        }`}
                                >
                                    {order.status}
                                </td>
                                <td className="py-3 px-6 border border-indigo-700">{order.orderDate}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </section>
    );
}
