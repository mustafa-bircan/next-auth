"use client";

import React, { Suspense } from "react";
import { useInView } from "react-intersection-observer";

interface LazyLoadProps {
    children: React.ReactNode;
}

export default function LazyLoadComponent({ children }: LazyLoadProps) {
    const { ref, inView } = useInView({
        triggerOnce: true,
        rootMargin: "200px",
    });

    return (
        <div ref={ref} style={{ minHeight: "300px" }}>
            {inView ? (
                <Suspense fallback={<div className="text-white">Yükleniyor...</div>}>
                    {children}
                </Suspense>
            ) : (
                <div className="text-gray-400 text-center py-12">Yükleniyor...</div>
            )}
        </div>
    );
}
