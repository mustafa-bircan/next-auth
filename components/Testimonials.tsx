import { motion } from "framer-motion";

export default function Testimonials() {
    const testimonials = [
        {
            name: "Ayşe K.",
            role: "Full Stack Developer",
            feedback:
                "NextAuth ile kurduğum sistem çok daha güvenli ve kullanıcı dostu hale geldi. Şiddetle tavsiye ederim!",
        },
        {
            name: "Emre B.",
            role: "Siber Güvenlik Uzmanı",
            feedback:
                "Auth0'nun entegrasyonu o kadar kolay ve esnek ki, projeme hiç zaman kaybetmeden entegre ettim.",
        },
        {
            name: "Zeynep T.",
            role: "Product Manager",
            feedback:
                "Bu proje ile kullanıcı giriş-çıkış yönetimimizi profesyonel seviyeye taşıdık. Harika bir altyapı!",
        },
    ];

    return (
        <section className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white py-24">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-14 drop-shadow-lg">Kullanıcı Yorumları</h2>
                <div className="grid md:grid-cols-3 gap-12">
                    {testimonials.map(({ name, role, feedback }, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white bg-opacity-10 p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                        >
                            <p className="text-lg italic mb-5 leading-relaxed">“{feedback}”</p>
                            <h3 className="text-2xl font-semibold">{name}</h3>
                            <span className="text-indigo-400">{role}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>

    );
}
