
import { resetPassword } from "@/lib/firebase-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();

        const response = await resetPassword(email);

        return NextResponse.json(response);
    } catch (error: any | unknown) {
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
}
