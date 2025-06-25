"use client";

import Image from "next/image";

const partners = [
    { name: "Auth0", src: "/partners/auth0.svg" },
    { name: "Stripe", src: "/partners/stripe.svg" },
    { name: "Vercel", src: "/partners/vercel.svg" },
    { name: "Google Cloud", src: "/partners/google-cloud.svg" },
    { name: "GitHub", src: "/partners/github.svg" },
];

export default function PartnersSection() {
    return (
        <section className="bg-gray-950 text-white py-24">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold mb-12">Güvenilir Entegrasyon Ortaklarımız</h2>

                <div className="flex flex-wrap justify-center items-center gap-12">
                    {partners.map((partner, i) => (
                        <div
                            key={i}
                            className="group w-32 flex flex-col items-center transition-transform duration-300 transform hover:scale-105"
                        >
                            <div className="w-28 h-12 relative grayscale group-hover:grayscale-0 transition-all duration-300 ease-in-out 
                border border-transparent group-hover:border-indigo-400 group-hover:shadow-md rounded-md bg-opacity-10 backdrop-blur-sm">
                                <Image
                                    src={partner.src}
                                    alt={partner.name}
                                    layout="fill"
                                    objectFit="contain"
                                    className="invert"
                                />
                            </div>
                            <p className="mt-2 text-sm text-indigo-300 group-hover:text-indigo-400 transition">
                                {partner.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
