import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";

// Initialize the auth handler
const handler = handleAuth();

// Export both GET and POST methods
export const GET = handleAuth();
export { handler as POST };