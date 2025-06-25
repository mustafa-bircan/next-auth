"use client";

import { ReactNode } from "react";
import { OrderProvider } from "@/src/context/OrderContext";

export default function AdminLayout({ children }: { children: ReactNode }) {
    return <OrderProvider>{children}</OrderProvider>;
}