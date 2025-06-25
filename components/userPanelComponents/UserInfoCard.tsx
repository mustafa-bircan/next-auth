"use client";

import React from "react";

type Props = {
    name: string;
    email: string;
    phone: string;
};

export default function UserInfoCard({ name, email, phone }: Props) {
    return (
        <div className="bg-white/10 p-6 rounded-xl border border-white/20 shadow-xl text-white max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Kullanıcı Bilgileri</h2>
            <div className="space-y-2">
                <p>
                    <strong>İsim:</strong> {name}
                </p>
                <p>
                    <strong>Email:</strong> {email}
                </p>
                <p>
                    <strong>Telefon:</strong> {phone}
                </p>
            </div>
        </div>
    );
}
