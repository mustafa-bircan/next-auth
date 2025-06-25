"use client";

import React, { useState } from "react";
import { Profile } from "./types";

type Props = {
    initialProfile: Profile;
    onSave: (profile: Profile) => void;
};

export default function ProfileEditor({ initialProfile, onSave }: Props) {
    const [profile, setProfile] = useState<Profile>(initialProfile);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(profile);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8 p-6 bg-indigo-800 rounded-xl text-white">
            <h2 className="text-2xl font-semibold mb-4">Profil Düzenle</h2>
            <label className="block mb-2">
                İsim:
                <input
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 rounded bg-indigo-900 border border-indigo-600"
                />
            </label>
            <label className="block mb-2">
                Email:
                <input
                    name="email"
                    type="email"
                    value={profile.email}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 rounded bg-indigo-900 border border-indigo-600"
                />
            </label>
            <label className="block mb-4">
                Telefon:
                <input
                    name="phone"
                    value={profile.phone || ""}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 rounded bg-indigo-900 border border-indigo-600"
                    placeholder="Opsiyonel"
                />
            </label>
            <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded font-semibold"
            >
                Kaydet
            </button>
        </form>
    );
}
