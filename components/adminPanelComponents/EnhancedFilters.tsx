"use client";

import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
    countries: string[];
    selectedCountry: string;
    onCountryChange: (value: string) => void;
    dateRange: [Date | null, Date | null];
    onDateRangeChange: (range: [Date | null, Date | null]) => void;
    keyword: string;
    onKeywordChange: (value: string) => void;
    sortOrder: string;
    onSortOrderChange: (value: string) => void;
    customerStatus: string;
    onCustomerStatusChange: (value: string) => void;
};



export default function EnhancedFilters({
    countries,
    selectedCountry,
    onCountryChange,
    dateRange,
    onDateRangeChange,
    keyword,
    onKeywordChange,
    sortOrder,
    onSortOrderChange,
    customerStatus,
    onCustomerStatusChange,
}: Props) {


    return (
        <div className="flex flex-col md:flex-row gap-4 bg-indigo-800 p-4 rounded-xl border border-indigo-600 mb-6 items-center">
            <select
                value={selectedCountry}
                onChange={(e) => onCountryChange(e.target.value)}
                className="p-3 rounded-md bg-indigo-900 text-indigo-100 border border-indigo-500"
            >
                <option value="">Tüm Ülkeler</option>
                {countries.map((country) => (
                    <option key={country} value={country}>
                        {country}
                    </option>
                ))}
            </select>

            <div className="flex items-center gap-2">
                <label className="text-indigo-100 whitespace-nowrap">Tarih Aralığı:</label>
                <DatePicker
                    selectsRange
                    startDate={dateRange[0]}
                    endDate={dateRange[1]}
                    onChange={(update) => onDateRangeChange(update as [Date | null, Date | null])}
                    isClearable
                    className="p-2 rounded-md bg-indigo-900 text-indigo-100 border border-indigo-500"
                    placeholderText="Tarih seç..."
                />
            </div>

            <input
                type="text"
                value={keyword}
                onChange={(e) => onKeywordChange(e.target.value)}
                placeholder="Müşteri veya ürün ara..."
                className="p-3 rounded-md bg-indigo-900 text-indigo-100 border border-indigo-500 w-full md:w-auto"
            />
            <select
                value={sortOrder}
                onChange={(e) => onSortOrderChange(e.target.value)}
                className="p-3 rounded-md bg-indigo-900 text-indigo-100 border border-indigo-500"
            >
                <option value="latest">En Yeni</option>
                <option value="oldest">En Eski</option>
                <option value="amount-asc">Tutar Artan</option>
                <option value="amount-desc">Tutar Azalan</option>
            </select>

            <select
                value={customerStatus}
                onChange={(e) => onCustomerStatusChange(e.target.value)}
                className="p-3 rounded-md bg-indigo-900 text-indigo-100 border border-indigo-500"
            >
                <option value="">Tüm Müşteriler</option>
                <option value="active">Aktif</option>
                <option value="inactive">Pasif</option>
            </select>

        </div>
    );

}
