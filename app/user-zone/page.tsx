/* "use client";

import React, { useState } from "react";
import ProfileEditor from "@/components/userPanelComponents/ProfileEditor";
import OrderForm from "@/components/userPanelComponents/OrderForm";
import OrderHistory from "@/components/userPanelComponents/OrderHistory";
import { Order, useOrders } from "@/src/context/OrderContext";
import { Profile } from "@/components/userPanelComponents/types";
import UserAnalytics from "@/components/userPanelComponents/UserAnalytics";
import UserInfoCard from "@/components/userPanelComponents/UserInfoCard";
import UserNotifications from "@/components/userPanelComponents/UserNotifications";

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
        <main className="p-8 bg-indigo-900 min-h-screen text-white rounded-xl max-w-5xl mx-auto space-y-10">
            <h1 className="text-4xl font-bold mb-8">Kullanıcı Alanına Hoşgeldiniz!</h1>

            <ProfileEditor initialProfile={profile} onSave={handleProfileSave} />

            <OrderForm />

            <OrderHistory customerName={profile.name} />

            <UserAnalytics customerName={profile.name} />

            <UserInfoCard
                name={profile.name}
                email={profile.email}
                phone={profile.phone ?? ""}
            />

            <UserNotifications />

        </main>
    );
}
 */

"use client";

import UserPanel from "@/components/userPanelComponents/UserPanel";

export default function UserZonePage() {
    return <UserPanel />;
}