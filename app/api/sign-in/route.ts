import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/firebase/admin";

export async function POST(request: NextRequest) {
  try {
    const { email, idToken } = await request.json();
    if (!idToken || !email) {
      return NextResponse.json({ success: false, message: "Missing credentials." }, { status: 400 });
    }

    // Verify the ID token
    const decodedToken = await auth.verifyIdToken(idToken);
    if (!decodedToken || decodedToken.email !== email) {
      return NextResponse.json({ success: false, message: "Invalid token or email." }, { status: 401 });
    }

    // Create a session cookie (valid for 7 days)
    const expiresIn = 60 * 60 * 24 * 7 * 1000; // 7 days in ms
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });

    // Set the session cookie
    const response = NextResponse.json({ success: true });
    response.cookies.set("session", sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
    });
    return response;
  } catch (error) {
    console.error("Sign-in error:", error);
    return NextResponse.json({ success: false, message: "Sign-in failed." }, { status: 500 });
  }
} 