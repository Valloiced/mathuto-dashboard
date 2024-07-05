import { auth } from "firebase-admin";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: { email?: string } }
) {
    try {
        const email = params.email;

        if ((!email || email === '')) {
            return NextResponse.json({ error: 'Missing parameters.' }, { status: 400 });
        }

        // Check if user is exist
        await auth().getUserByEmail(email);
        
        return NextResponse.json({ message: 'User exists' }, { status: 200 });
    } catch (error: any | unknown) {
        return NextResponse.json({ message: 'User does not exists' }, { status: 500 });
    }
}
