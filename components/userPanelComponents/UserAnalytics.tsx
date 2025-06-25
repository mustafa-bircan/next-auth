"use client";

import React from "react";
import { useOrders, Order } from "@/src/context/OrderContext";

type Props = {
    customerName: string;
};

export default function UserAnalytics({ customerName }: Props) {
    const { orders } = useOrders();

    const userOrders = orders.filter((o) => o.customerName === customerName);

    const totalOrders = userOrders.length;

    const totalSpent = userOrders.reduce(
        (acc, curr) => acc + curr.quantity * curr.pricePerUnit,
        0
    );

    const productCountMap: Record<string, number> = {};
    userOrders.forEach(({ product, quantity }) => {
        productCountMap[product] = (productCountMap[product] || 0) + quantity;
    });
    const topProducts = Object.entries(productCountMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3); // ilk 3

    const statusCountMap: Record<string, number> = {};
    userOrders.forEach(({ status }) => {
        statusCountMap[status] = (statusCountMap[status] || 0) + 1;
    });

    return (
        <div className="bg-white/10 p-6 rounded-xl border border-white/20 shadow-xl text-white max-w-xl">
            <h2 className="text-xl font-bold mb-4">Sipariş Analitiği</h2>

            <p>
                <strong>Toplam Sipariş:</strong> {totalOrders}
            </p>
            <p>
                <strong>Toplam Harcama:</strong> {totalSpent.toFixed(2)} TL
            </p>

            <div className="mt-4">
                <strong>En Çok Alınan Ürünler:</strong>
                {topProducts.length === 0 ? (
                    <p>Henüz siparişiniz yok.</p>
                ) : (
                    <ul className="list-disc list-inside">
                        {topProducts.map(([product, quantity]) => (
                            <li key={product}>
                                {product} - {quantity} adet
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="mt-4">
                <strong>Sipariş Durumları:</strong>
                {Object.keys(statusCountMap).length === 0 ? (
                    <p>Henüz siparişiniz yok.</p>
                ) : (
                    <ul className="list-disc list-inside">
                        {Object.entries(statusCountMap).map(([status, count]) => (
                            <li key={status}>
                                {status} - {count} adet
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
