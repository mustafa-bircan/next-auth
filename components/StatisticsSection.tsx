"use client";

import CountUp from 'react-countup';

const stats = [
    { label: 'Kullanıcı', value: 12000 },
    { label: 'İşlem', value: 450000 },
    { label: 'İşlem Süresi (ms)', value: 250 },
];

export default function StatisticsSection() {
    return (
        <section className="py-20 bg-gray-900 text-white text-center">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
                {stats.map(({ label, value }) => (
                    <div key={label} className="bg-gray-800 p-8 rounded-lg shadow-lg">
                        <h3 className="text-5xl font-bold mb-2">
                            <CountUp end={value} duration={3} separator="," />
                        </h3>
                        <p className="text-indigo-400 text-xl">{label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
