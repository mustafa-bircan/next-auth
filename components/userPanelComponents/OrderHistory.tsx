"use client";

import React from "react";
import { useOrders, Order } from "@/src/context/OrderContext";

type Props = {
    customerName: string;
};

export default function OrderHistory({ customerName }: Props) {
    const { orders } = useOrders();

    const userOrders = orders.filter(order => order.customerName === customerName);

    if (userOrders.length === 0) {
        return <p className="text-white">Henüz siparişiniz bulunmamaktadır.</p>;
    }

    return (
        <div className="bg-white/10 p-6 rounded-xl border border-white/20 shadow-xl text-white">
            <h2 className="text-xl font-bold mb-4">Sipariş Geçmişiniz</h2>
            <ul className="space-y-4 max-h-96 overflow-y-auto">
                {userOrders.map(({ id, product, quantity, pricePerUnit, status, orderDate }) => (
                    <li key={id} className="border-b border-indigo-700 pb-3">
                        <p><strong>Ürün:</strong> {product}</p>
                        <p><strong>Adet:</strong> {quantity}</p>
                        <p><strong>Birim Fiyat:</strong> {pricePerUnit} TL</p>
                        <p><strong>Durum:</strong> {status}</p>
                        <p><strong>Tarih:</strong> {new Date(orderDate).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
