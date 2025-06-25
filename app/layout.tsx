import "@/styles/globals.css";
import type { Metadata } from "next";
import AuthProvider from "@/components/AuthProvider";
import PageTransitionWrapper from "@/components/PageTransitionWrapper";
import { ThemeProvider } from "@/src/context/ThemeContext";

export const metadata: Metadata = {
    title: "KAYRA EXPORT NEXTAUTH",
    description: "Role-based Auth",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="tr">
            <body>
                <AuthProvider>
                    <ThemeProvider>
                        <PageTransitionWrapper>
                            {children}
                        </PageTransitionWrapper>
                    </ThemeProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
