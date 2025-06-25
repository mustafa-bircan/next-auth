"use client";

import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { motion } from 'framer-motion';

export default function HeroSection() {
    const [text] = useTypewriter({
        words: ['Güvenli Kimlik Doğrulaması', 'NextAuth ile Kolay Giriş', 'Auth0 ile Hızlı Entegrasyon'],
        loop: true,
        delaySpeed: 2000,
    });

    return (
        <main className="flex-grow flex flex-col justify-center items-center text-center px-6 max-w-4xl mx-auto pt-32 md:pt-40 text-white">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg leading-tight">
                Geleceğin <span className="text-indigo-400">{text}<Cursor /></span> Burada.
            </h1>
            <p className="text-xl md:text-2xl mb-12 max-w-lg leading-relaxed tracking-wide text-indigo-200">
                NextAuth ve Auth0 ile kullanıcı deneyiminizi <span className="font-semibold">bir üst seviyeye taşıyın</span>.
            </p>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold shadow-lg drop-shadow-lg"
            >
                Hemen Başla
            </motion.button>
        </main>
    );
}
