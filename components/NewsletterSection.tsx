"use client";

import { Send } from "lucide-react";
import { useState } from "react";

export default function NewsletterSection() {
    const [email, setEmail] = useState("");

    return (
        <section className="bg-gray-950 text-white py-20">
            <div className="max-w-3xl mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold mb-6">Bültenimize Abone Ol</h2>
                <p className="text-indigo-200 mb-8">
                    Güncellemelerden haberdar olmak için e-posta adresinizi bırakın.
                </p>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        alert(`Abone olundu: ${email}`);
                        setEmail("");
                    }}
                    className="flex flex-col md:flex-row justify-center items-center gap-4"
                >
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E-posta adresiniz"
                        className="px-6 py-3 rounded-lg text-black w-full md:w-2/3"
                    />
                    <button
                        type="submit"
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition"
                    >
                        <Send size={18} />
                        Abone Ol
                    </button>
                </form>
            </div>
        </section>
    );
}
