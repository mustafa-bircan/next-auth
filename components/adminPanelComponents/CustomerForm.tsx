"use client";

import { useState } from "react";

type Customer = {
    company: string;
    contactName: string;
    phone: string;
    email: string;
    country: string;
};

type Props = {
    onAddCustomer: (customer: Customer) => void;
};

export default function CustomerForm({ onAddCustomer }: Props) {
    const [form, setForm] = useState<Customer>({
        company: "",
        contactName: "",
        phone: "",
        email: "",
        country: "",
    });

    const [errors, setErrors] = useState<Partial<Customer>>({});

    function validate() {
        const newErrors: Partial<Customer> = {};
        if (!form.company.trim()) newErrors.company = "Şirket adı zorunlu";
        if (!form.contactName.trim()) newErrors.contactName = "İlgili kişi zorunlu";
        if (!form.phone.trim()) newErrors.phone = "Telefon zorunlu";
        if (!form.email.trim()) newErrors.email = "E-posta zorunlu";
        else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Geçerli e-posta girin";
        if (!form.country.trim()) newErrors.country = "Ülke zorunlu";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!validate()) return;
        onAddCustomer(form);
        setForm({ company: "", contactName: "", phone: "", email: "", country: "" });
        setErrors({});
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-indigo-800 p-6 rounded-xl shadow-lg max-w-lg mx-auto space-y-6"
            noValidate
        >
            <h2 className="text-2xl font-bold text-indigo-300 mb-4">➕ Yeni Müşteri Ekle</h2>

            <div>
                <label htmlFor="company" className="block font-semibold text-indigo-200 mb-1">
                    Şirket Adı
                </label>
                <input
                    type="text"
                    id="company"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    className={`w-full p-3 rounded-md border ${errors.company ? "border-red-500" : "border-indigo-600"
                        } bg-indigo-900 text-indigo-100 placeholder-indigo-400`}
                    placeholder="Örnek: Kayra İhracat A.Ş."
                />
                {errors.company && <p className="text-red-500 mt-1 text-sm">{errors.company}</p>}
            </div>

            <div>
                <label htmlFor="contactName" className="block font-semibold text-indigo-200 mb-1">
                    İlgili Kişi
                </label>
                <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    value={form.contactName}
                    onChange={handleChange}
                    className={`w-full p-3 rounded-md border ${errors.contactName ? "border-red-500" : "border-indigo-600"
                        } bg-indigo-900 text-indigo-100 placeholder-indigo-400`}
                    placeholder="Örnek: Mustafa Yılmaz"
                />
                {errors.contactName && (
                    <p className="text-red-500 mt-1 text-sm">{errors.contactName}</p>
                )}
            </div>

            <div>
                <label htmlFor="phone" className="block font-semibold text-indigo-200 mb-1">
                    Telefon
                </label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className={`w-full p-3 rounded-md border ${errors.phone ? "border-red-500" : "border-indigo-600"
                        } bg-indigo-900 text-indigo-100 placeholder-indigo-400`}
                    placeholder="+90 555 123 45 67"
                />
                {errors.phone && <p className="text-red-500 mt-1 text-sm">{errors.phone}</p>}
            </div>

            <div>
                <label htmlFor="email" className="block font-semibold text-indigo-200 mb-1">
                    E-posta
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`w-full p-3 rounded-md border ${errors.email ? "border-red-500" : "border-indigo-600"
                        } bg-indigo-900 text-indigo-100 placeholder-indigo-400`}
                    placeholder="ornek@kayra.com"
                />
                {errors.email && <p className="text-red-500 mt-1 text-sm">{errors.email}</p>}
            </div>

            <div>
                <label htmlFor="country" className="block font-semibold text-indigo-200 mb-1">
                    Ülke
                </label>
                <input
                    type="text"
                    id="country"
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    className={`w-full p-3 rounded-md border ${errors.country ? "border-red-500" : "border-indigo-600"
                        } bg-indigo-900 text-indigo-100 placeholder-indigo-400`}
                    placeholder="Türkiye"
                />
                {errors.country && <p className="text-red-500 mt-1 text-sm">{errors.country}</p>}
            </div>

            <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold py-3 rounded-md shadow-md"
            >
                Müşteriyi Ekle
            </button>
        </form>
    );
}
