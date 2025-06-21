import { NextRequest } from "next/server";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: {
            role?: "admin" | "user";
            email?: string;
            name?: string;
        };
        accessToken?: string;
    }

    interface JWT {
        accessToken?: string;
        role?: "admin" | "user";
    }
}

declare module "next/server" {
    interface NextRequest {
        nextauth: {
            token: JWT;
        };
    }
}
