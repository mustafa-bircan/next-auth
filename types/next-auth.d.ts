import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: {
            name?: string;
            email?: string;
            role: "admin" | "user";
        };
        accessToken?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role: "admin" | "user";
        accessToken?: string;
    }
}

declare module "next/server" {
    interface NextRequest {
        nextauth: {
            token: JWT;
        };
    }
}
