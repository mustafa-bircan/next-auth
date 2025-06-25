"use client";

import React, { useState } from "react";

import CustomerForm from "@/components/adminPanelComponents/CustomerForm";
import CustomerRadarChart from "@/components/adminPanelComponents/CustomerRadarChart";
import EnhancedFilters from "@/components/adminPanelComponents/EnhancedFilters";
import FireRatePieChart from "@/components/adminPanelComponents/FireRatePieChart";
import KpiCard from "@/components/adminPanelComponents/KpiCard";
import LogisticsLineChart from "@/components/adminPanelComponents/LogisticsLineChart";
import NotificationCenter from "@/components/adminPanelComponents/NotificationCenter";
import OrderListSection from "@/components/adminPanelComponents/OrderListSection";
import Sidebar from "@/components/adminPanelComponents/Sidebar";
import { useOrders } from "@/src/context/OrderContext";
import Navbar from "../NavBar";
import { FiInfo, FiTrendingUp, FiZap } from "react-icons/fi";

type Customer = {
    company: string;
    contactName: string;
    phone: string;
    email: string;
    country: string;
};

export default function AdminPanel() {
    const [selectedSection, setSelectedSection] = useState<string>("kpi");

    const { orders } = useOrders();

    const [customers, setCustomers] = useState<Customer[]>([]);
    const handleAddCustomer = (customer: Customer) => {
        setCustomers((prev) => [...prev, customer]);
    };

    const countries = ["Türkiye", "Almanya", "Fransa"];
    const [selectedCountry, setSelectedCountry] = useState<string>("");
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);

    const [sortOrder, setSortOrder] = useState("latest");
    const [customerStatus, setCustomerStatus] = useState("");
    const [keyword, setKeyword] = useState<string>("");
    const [showFilters, setShowFilters] = useState(false);


    const kpiTitle = "Toplam Satış";
    const kpiValue = orders.reduce((acc, order) => acc + order.quantity * order.pricePerUnit, 0).toFixed(2);

    const renderContent = () => {
        switch (selectedSection) {
            case "kpi":
                const toplamSatis = orders.reduce((acc, order) => acc + order.quantity * order.pricePerUnit, 0);
                const siparisSayisi = orders.length;
                const ortalamaSiparisTutari = siparisSayisi > 0 ? (toplamSatis / siparisSayisi) : 0;

                const enCokSatanUrun = orders.reduce((acc, order) => {
                    acc[order.product] = (acc[order.product] || 0) + order.quantity;
                    return acc;
                }, {} as Record<string, number>);

                const populerUrun = Object.entries(enCokSatanUrun)
                    .sort((a, b) => b[1] - a[1])[0]?.[0] || "Veri Yok";

                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <KpiCard
                                title="Toplam Satış"
                                value={`${toplamSatis.toFixed(2)} TL`}
                                description="Bu ay toplam satışlar geçen aya göre %12 arttı."
                                color="indigo"
                            />
                            <KpiCard
                                title="Sipariş Sayısı"
                                value={siparisSayisi}
                                description="En çok sipariş 5 Haziran’da alındı."
                                color="purple"
                            />
                            <KpiCard
                                title="Ortalama Sipariş Tutarı"
                                value={`${ortalamaSiparisTutari.toFixed(2)} TL`}
                                description="Ortalama tutar %8 yükseldi, bu kârlılığı artırıyor."
                                color="pink"
                            />
                            <KpiCard
                                title="En Çok Satan Ürün"
                                value={populerUrun}
                                description={`‘${populerUrun}’, toplam siparişlerin %25’ini oluşturdu.`}
                                color="blue"
                            />
                        </div>
                        <div className="max-w-4xl mx-auto mt-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-white shadow-xl space-y-6">
                            <div className="flex items-start gap-4">
                                <FiTrendingUp size={24} className="text-green-400 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-lg">Satışlarda Artış Var 📈</h3>
                                    <p className="text-sm text-indigo-100">
                                        Bu ay satışlar geçen aya göre %12 arttı. Bu eğilimi sürdürmek için en çok satan ürünlere odaklanmak faydalı olacaktır.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <FiZap size={24} className="text-yellow-300 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-lg">Ortalama Tutarı Artır</h3>
                                    <p className="text-sm text-indigo-100">
                                        Ortalama sipariş tutarı yüksek. Çapraz satış ve paket tekliflerle bu rakam daha da yukarı çekilebilir.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <FiInfo size={24} className="text-cyan-300 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-lg">En Popüler Ürün: {populerUrun}</h3>
                                    <p className="text-sm text-indigo-100">
                                        '{populerUrun}' toplam siparişlerin büyük kısmını oluşturdu. Bu ürüne özel kampanyalar planlanabilir.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case "fireRate":
                return <FireRatePieChart />;
            case "customerForm":
                return <CustomerForm onAddCustomer={handleAddCustomer} />;
            case "customerRadar":
                return <CustomerRadarChart />;
            case "enhancedFilters":
                return (
                    <div className="space-y-6">
                        <div className="flex justify-end mb-4">
                            <button
                                onClick={() => setShowFilters((prev) => !prev)}
                                className="bg-indigo-700 hover:bg-indigo-600 text-white px-4 py-2 rounded-md shadow transition duration-300 transform hover:scale-105"
                            >
                                {showFilters ? "Filtreleri Gizle" : "Filtreleri Göster"}
                            </button>
                        </div>

                        {showFilters && (
                            <>
                                <EnhancedFilters
                                    countries={countries}
                                    selectedCountry={selectedCountry}
                                    onCountryChange={setSelectedCountry}
                                    dateRange={dateRange}
                                    onDateRangeChange={setDateRange}
                                    keyword={keyword}
                                    onKeywordChange={setKeyword}
                                    sortOrder={sortOrder}
                                    onSortOrderChange={setSortOrder}
                                    customerStatus={customerStatus}
                                    onCustomerStatusChange={setCustomerStatus}
                                />
                                <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-white shadow-xl space-y-4">
                                    <div className="flex items-start gap-4">
                                        <FiInfo size={24} className="text-cyan-300 mt-1" />
                                        <div>
                                            <h3 className="font-semibold text-lg">Akıllı Filtreleme</h3>
                                            <p className="text-sm text-indigo-100">
                                                Tarih aralığı, ülke ve müşteri durumuna göre özel listeleme yapabilirsin. Bu sayede doğru müşteri segmentine odaklanabilirsin.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <FiZap size={24} className="text-yellow-300 mt-1" />
                                        <div>
                                            <h3 className="font-semibold text-lg">Performans İçgörüsü</h3>
                                            <p className="text-sm text-indigo-100">
                                                Özellikle belirli ülkelerdeki müşteri alışkanlıklarını analiz ederek daha doğru kampanyalar geliştirebilirsin.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                );


            case "logistics":
                return <LogisticsLineChart />;
            case "notifications":
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-white">Bildirim Merkezi</h2>
                        <NotificationCenter />
                    </div>
                );

            case "orders":
                return <OrderListSection orders={orders} />;
            default:
                return <div>Seçim yapınız</div>;
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
            <Navbar />
            <div className="flex justify-end mb-4">
                <button
                    onClick={() => setShowFilters((prev) => !prev)}
                    className="bg-indigo-700 hover:bg-indigo-600 text-white px-4 py-2 rounded-md shadow"
                >
                    {showFilters ? "Filtreleri Gizle" : "Filtreleri Göster"}
                </button>
            </div>

            <div className="flex flex-1 mt-20">
                <Sidebar selected={selectedSection} onSelect={setSelectedSection} />
                <main className="flex-1 p-10 overflow-auto">{renderContent()}</main>
            </div>
        </div>
    );
}
