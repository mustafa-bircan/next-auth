"use client";
import { ShieldCheck, Users, LockKeyhole } from "lucide-react";

const features = [
    {
        icon: <ShieldCheck className="w-10 h-10 text-indigo-500" />,
        title: "Güçlü Güvenlik",
        description: "JWT ve Auth0 ile iki katmanlı güvenlik sunar, kullanıcı verileri koruma altındadır.",
    },
    {
        icon: <Users className="w-10 h-10 text-indigo-500" />,
        title: "Rol Bazlı Yetkilendirme",
        description: "Farklı kullanıcı rolleri (admin, user) için özelleştirilmiş erişim kontrolü.",
    },
    {
        icon: <LockKeyhole className="w-10 h-10 text-indigo-500" />,
        title: "Kolay Giriş & Kayıt",
        description: "Google, GitHub gibi OAuth sağlayıcılarıyla entegre hızlı giriş deneyimi.",
    },
];

export default function FeaturesSection() {
    return (
        <section className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white py-28">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-4xl md:text-5xl font-extrabold mb-20 drop-shadow-lg">Öne Çıkan Özellikler</h2>
                <div className="grid md:grid-cols-3 gap-14">
                    {features.map(({ icon, title, description }, i) => (
                        <div
                            key={i}
                            className="bg-white bg-opacity-10 rounded-2xl p-10 shadow-lg hover:shadow-2xl transition-shadow duration-400 cursor-pointer transform hover:-translate-y-1"
                        >
                            <div className="flex justify-center mb-6">{icon}</div>
                            <h3 className="text-3xl font-semibold mb-3">{title}</h3>
                            <p className="text-indigo-200 text-lg leading-relaxed">{description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

    );
}

