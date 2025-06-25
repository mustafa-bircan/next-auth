import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;

        if (!token) {
            return NextResponse.redirect(new URL("/login", req.url));
        }

        if (req.nextUrl.pathname.startsWith("/admin") && token.role !== "admin") {
            return NextResponse.redirect(new URL("/", req.url));
        }

        if (req.nextUrl.pathname === "/admin-panel" && token.role !== "admin") {
            return NextResponse.redirect(new URL("/", req.url));
        }

        if (req.nextUrl.pathname === "/user-zone" && token.role !== "user" && token.role !== "admin") {
            return NextResponse.redirect(new URL("/", req.url));
        }


        return NextResponse.next();
    },
    {
        callbacks: { authorized: ({ token }) => !!token },
    }
);

export const config = {
    matcher: ["/admin/:path*", "/admin-panel", "/user-zone"],
};

