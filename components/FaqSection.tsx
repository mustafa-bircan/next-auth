"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqList = [
    {
        question: "NextAuth nedir?",
        answer: "NextAuth.js, Next.js projeleri için güvenli ve özelleştirilebilir bir kimlik doğrulama çözümüdür.",
    },
    {
        question: "Auth0 ile nasıl entegre olunur?",
        answer: "Auth0, OAuth sağlayıcısıdır. NextAuth içindeki Auth0 provider'ı ile kolayca entegre edilebilir.",
    },
    {
        question: "JWT token'lar güvenli mi?",
        answer: "Evet, doğru şekilde saklanır ve kullanılırsa JWT token'lar oldukça güvenlidir.",
    },
];

export default function FaqSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="bg-gray-950 text-white py-24">
            <div className="max-w-4xl mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-12">Sıkça Sorulan Sorular</h2>
                <div className="space-y-6">
                    {faqList.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-gray-900 rounded-lg shadow-md p-6 cursor-pointer hover:border-l-4 border-indigo-500 transition-all"
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold">{faq.question}</h3>
                                <ChevronDown
                                    className={`transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""
                                        }`}
                                />
                            </div>
                            {openIndex === index && (
                                <p className="mt-4 text-gray-300">{faq.answer}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
