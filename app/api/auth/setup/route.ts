import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Check if user exists in your database
  // Implement this according to your database schema
  // This is just an example:
  /*
  const dbUser = await db.user.findUnique({
    where: {
      kindeId: user.id
    }
  });

  if (!dbUser) {
    // Create new user
    await db.user.create({
      data: {
        kindeId: user.id,
        email: user.email ?? "",
        name: user.given_name ?? ""
      }
    });
  }
  */

  return NextResponse.json({
    authenticated: true,
    user
  });
} 