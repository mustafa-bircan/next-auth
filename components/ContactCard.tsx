"use client";

import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactCard() {
    return (
        <section className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-20 text-white">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold mb-10">Bize Ulaş</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-gray-900 rounded-xl p-6 shadow-md hover:shadow-xl transition">
                        <Mail className="w-10 h-10 mx-auto text-indigo-400 mb-4" />
                        <h3 className="text-xl font-semibold">E-Posta</h3>
                        <p className="text-indigo-200">info@kayraexport.com</p>
                    </div>
                    <div className="bg-gray-900 rounded-xl p-6 shadow-md hover:shadow-xl transition">
                        <Phone className="w-10 h-10 mx-auto text-indigo-400 mb-4" />
                        <h3 className="text-xl font-semibold">Telefon</h3>
                        <p className="text-indigo-200">+90 (552) 555 95 77</p>
                    </div>
                    <div className="bg-gray-900 rounded-xl p-6 shadow-md hover:shadow-xl transition">
                        <MapPin className="w-10 h-10 mx-auto text-indigo-400 mb-4" />
                        <h3 className="text-xl font-semibold">Adres</h3>
                        <p className="text-indigo-200">Kayseri, Türkiye</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
