"use client";

import React from "react";
import { FiTrendingUp } from "react-icons/fi";

interface KpiCardProps {
    title: string;
    value: string | number;
    description?: string;
    icon?: React.ReactNode;
    color?: string;
}

export default function KpiCard({
    title,
    value,
    description,
    icon,
    color = "indigo",
}: KpiCardProps) {
    return (
        <div className={`bg-${color}-700 bg-opacity-70 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:scale-[1.03] flex flex-col`}>
            <div className="flex items-center gap-3 mb-3">
                {icon || <FiTrendingUp size={28} className={`text-${color}-300`} />}
                <h2 className={`text-lg font-semibold text-${color}-200`}>{title}</h2>
            </div>
            <p className="text-4xl font-extrabold text-white">{value}</p>
            {description && <p className={`mt-2 text-${color}-100 text-sm`}>{description}</p>}
        </div>
    );
}
