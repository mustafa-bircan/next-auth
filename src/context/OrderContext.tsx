"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { mockOrders } from "@/data/orders";

export type Order = {
    id: number;
    customerName: string;
    product: string;
    quantity: number;
    pricePerUnit: number;
    status: "Hazırlanıyor" | "Yolda" | "Teslim Edildi" | "İptal Edildi";
    orderDate: string;
};

type OrderContextType = {
    orders: Order[];
    addOrder: (order: Order) => void;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
    const [orders, setOrders] = useState<Order[]>(mockOrders);

    const addOrder = (order: Order) => {
        setOrders((prev) => [...prev, order]);
    };

    return (
        <OrderContext.Provider value={{ orders, addOrder }}>
            {children}
        </OrderContext.Provider>
    );
}

export function useOrders() {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error("useOrders must be used within an OrderProvider");
    }
    return context;
}
