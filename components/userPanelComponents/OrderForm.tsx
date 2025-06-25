"use client";

import React, { useState } from "react";
import { useOrders } from "@/src/context/OrderContext";

export default function OrderForm() {
    const { addOrder } = useOrders();

    const [product, setProduct] = useState("");
    const [quantity, setQuantity] = useState<number>(1);
    const [pricePerUnit, setPricePerUnit] = useState<number>(0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!product || quantity <= 0 || pricePerUnit <= 0) return;

        addOrder({
            product,
            quantity,
            pricePerUnit,
            orderDate: new Date().toISOString(),
            id: Date.now(),
            customerName: "",
            status: "Yolda"
        });
        setProduct("");
        setQuantity(1);
        setPricePerUnit(0);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white/10 p-6 rounded-xl border border-white/20 shadow-xl text-white">
            <h2 className="text-xl font-bold mb-4">🛒 Sipariş Ver</h2>
            <div>
                <label className="block mb-1">Ürün Adı</label>
                <input
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    className="w-full p-2 rounded bg-indigo-900 border border-indigo-500 text-white"
                    placeholder="Örn: MacBook Air"
                />
            </div>
            <div>
                <label className="block mb-1">Adet</label>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full p-2 rounded bg-indigo-900 border border-indigo-500 text-white"
                />
            </div>
            <div>
                <label className="block mb-1">Birim Fiyat (TL)</label>
                <input
                    type="number"
                    value={pricePerUnit}
                    onChange={(e) => setPricePerUnit(Number(e.target.value))}
                    className="w-full p-2 rounded bg-indigo-900 border border-indigo-500 text-white"
                />
            </div>
            <button
                type="submit"
                className="bg-indigo-700 hover:bg-indigo-600 px-4 py-2 rounded-md shadow text-white"
            >
                Siparişi Gönder
            </button>
        </form>
    );
}
