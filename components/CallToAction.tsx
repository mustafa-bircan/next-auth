"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CallToAction() {
    return (
        <section className="bg-gradient-to-r from-purple-700 via-indigo-800 to-blue-700 py-24">
            <div className="max-w-5xl mx-auto text-center px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-5xl font-extrabold text-white mb-8 drop-shadow-xl"
                >
                    Şimdi Katıl, <span className="text-green-400">Güvenli Geleceği İnşa Et!</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-indigo-100 text-xl mb-12"
                >
                    NextAuth.js ve Auth0 ile yeni nesil kimlik doğrulamasına hemen adım at.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <Link
                        href="/register"
                        className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold px-10 py-4 rounded-full shadow-lg transition"
                    >
                        Hemen Kayıt Ol
                    </Link>
                </motion.div>
            </div>
        </section>

    );
}
