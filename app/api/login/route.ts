/* Credits: https://github.com/omer-os/firebase-nextjs14-template/commits?author=omer-os */

import { firebaseAdminApp } from "@/configs/firebase-admin.config";
import { auth } from "firebase-admin";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

firebaseAdminApp();

export async function POST(request: NextRequest, response: NextResponse) {
  const authorization = headers().get("Authorization");
  if (authorization?.startsWith("Bearer ")) {
    const idToken = authorization.split("Bearer ")[1];
    const decodedToken = await auth().verifyIdToken(idToken);

    if (decodedToken) {
      // If user isn't labeled as admin, do not proceed
      if (!decodedToken?.admin) {
        return NextResponse.json({ message: 'Invalid Access' }, { status: 400 }); 
      }

      const expiresIn = 60 * 60 * 24 * 5 * 1000;
      const sessionCookie = await auth().createSessionCookie(idToken, {
        expiresIn,
      });
      const options = {
        name: "auth-session",
        value: sessionCookie,
        maxAge: expiresIn,
        httpOnly: true,
        secure: true,
      };

      cookies().set(options);
    }
  }

  return NextResponse.json({}, { status: 200 });
}
export async function GET(request: NextRequest) {
  const session = cookies().get("auth-session")?.value || "";

  // Validate if the cookie exist in the request
  if (!session) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }

  // Use Firebase Admin to validate the session cookie
  const decodedClaims = await auth().verifySessionCookie(session, true);

  if (!decodedClaims) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }

  return NextResponse.json({ isLogged: true }, { status: 200 });
}

// export async function GET(request: NextRequest) {
//   auth().setCustomUserClaims()
// }