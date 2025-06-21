"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");

    const handleLogin = async () => {
        await signIn("auth0", { email, redirect: true, callbackUrl: "/" });
    };

    return (
        <main style={{ maxWidth: 400, margin: "auto", padding: "2rem" }}>
            <h1>Giriş Yap</h1>

            <input
                type="email"
                placeholder="Email adresinizi girin"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
            />

            <button
                onClick={handleLogin}
                disabled={!email}
                style={{ width: "100%", padding: "0.5rem", cursor: email ? "pointer" : "not-allowed" }}
            >
                Giriş Yap
            </button>
        </main>
    );
}
