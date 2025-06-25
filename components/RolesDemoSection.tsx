"use client";

import { ShieldCheck, UserCircle2 } from "lucide-react";

const roles = [
    {
        icon: <ShieldCheck className="w-12 h-12 text-indigo-500" />,
        title: "Admin Rolü",
        description: "Kullanıcı yönetimi, sistem kontrolü ve erişim denetimi gibi yetkilerle donatılmıştır.",
    },
    {
        icon: <UserCircle2 className="w-12 h-12 text-indigo-500" />,
        title: "Kullanıcı Rolü",
        description: "Kendi verilerine güvenli bir şekilde erişebilir ve uygulamayı özgürce kullanabilir.",
    },
];

export default function RolesDemoSection() {
    return (
        <section className="bg-gray-950 text-white py-24">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold mb-16">Rol Bazlı Erişim</h2>
                <div className="grid md:grid-cols-2 gap-12">
                    {roles.map((role, i) => (
                        <div
                            key={i}
                            className="bg-gray-900 rounded-xl p-10 shadow-lg hover:shadow-indigo-500/30 transition"
                        >
                            <div className="flex justify-center mb-4">{role.icon}</div>
                            <h3 className="text-2xl font-semibold mb-2">{role.title}</h3>
                            <p className="text-gray-400">{role.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
