"use client";

import React, { useState } from "react";
import ProfileEditor from "@/components/userPanelComponents/ProfileEditor";
import OrderForm from "@/components/userPanelComponents/OrderForm";
import OrderHistory from "@/components/userPanelComponents/OrderHistory";
import { useOrders } from "@/src/context/OrderContext";
import { Profile } from "@/components/userPanelComponents/types";
import UserAnalytics from "@/components/userPanelComponents/UserAnalytics";
import UserInfoCard from "@/components/userPanelComponents/UserInfoCard";
import UserNotifications from "@/components/userPanelComponents/UserNotifications";
import Navbar from "../NavBar";

export default function UserZonePage() {
    const { orders } = useOrders();

    const [profile, setProfile] = useState<Profile>({
        name: "Mustafa Yılmaz",
        email: "mustafa@example.com",
        phone: "555-1234",
    });

    const handleProfileSave = (updatedProfile: Profile) => {
        console.log("Profil kaydedildi:", updatedProfile);
        setProfile(updatedProfile);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
            <Navbar />
            <header className="py-8 px-4 md:px-10 border-b mt-20 border-white/10 shadow-sm">
                <h1 className="text-4xl font-bold text-center">👤 Kullanıcı Paneli</h1>
                <p className="text-center text-indigo-200 mt-2">Hoşgeldin {profile.name}, burası senin kontrol alanın!</p>
            </header>

            <main className="flex-1 p-4 md:p-10 space-y-10 max-w-7xl mx-auto">
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white/10 border border-white/20 backdrop-blur-md p-6 rounded-2xl shadow-lg">
                        <ProfileEditor initialProfile={profile} onSave={handleProfileSave} />
                    </div>

                    <div className="bg-white/10 border border-white/20 backdrop-blur-md p-6 rounded-2xl shadow-lg">
                        <UserInfoCard
                            name={profile.name}
                            email={profile.email}
                            phone={profile.phone ?? ""}
                        />
                    </div>

                    <div className="bg-white/10 border border-white/20 backdrop-blur-md p-6 rounded-2xl shadow-lg">
                        <UserNotifications />
                    </div>
                </section>

                <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white/10 border border-white/20 backdrop-blur-md p-6 rounded-2xl shadow-lg">
                        <OrderForm />
                    </div>

                    <div className="bg-white/10 border border-white/20 backdrop-blur-md p-6 rounded-2xl shadow-lg">
                        <UserAnalytics customerName={profile.name} />
                    </div>
                </section>

                <section className="bg-white/10 border border-white/20 backdrop-blur-md p-6 rounded-2xl shadow-lg">
                    <OrderHistory customerName={profile.name} />
                </section>
            </main>
        </div>
    );
}
