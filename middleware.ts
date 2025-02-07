import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default withAuth(
    function middleware(req: NextRequest) {
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }: { token: any }) => token !== null,
        },
    }
);

export const config = {
    matcher: ["/dashboard/:path*", "/profile"]
};