/* Credits: https://github.com/omer-os/firebase-nextjs14-template/commits?author=omer-os */
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // Remove the value and expire the cookie
  const options = {
    name: "auth-session",
    value: "",
    maxAge: -1,
  };

  cookies().set(options);
  return NextResponse.json({}, { status: 200 });
}