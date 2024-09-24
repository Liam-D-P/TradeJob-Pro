import { NextResponse } from 'next/server'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

// Define a new interface to include token
interface ExtendedKindeUser {
  token: string; // Add token property
}

export async function POST(req: Request) {
  const { getUser } = getKindeServerSession();
  const { username } = await req.json()
  try {
    const user = await getUser() as unknown as ExtendedKindeUser; // Cast to ExtendedKindeUser through unknown
    
    if (!user) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    if (!username) {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    // Update the user's username using Kinde's API
    const response = await fetch(`${process.env.KINDE_ISSUER_URL}/api/v1/user`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ given_name: username }),
    });

    if (!response.ok) {
      throw new Error('Failed to update username');
    }

    return NextResponse.json({ message: 'Username updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating username:', error);
    return NextResponse.json({ error: 'Failed to update username' }, { status: 500 });
  }
}