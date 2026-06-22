import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { login } from "@/modules/auth/auth/services/auth";
import { UserSession } from "@/modules/auth/auth/types/auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!API_BASE) {
      console.error("Critical Error: NEXT_PUBLIC_API_BASE_URL is not defined in environment.");
      return NextResponse.json(
        { error: "System configuration error" },
        { status: 500 }
      );
    }

    const DIRECTUS_URL = `${API_BASE}/items/user?filter[user_email][_eq]=${encodeURIComponent(email)}`;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (process.env.DIRECTUS_API_BASE_TOKEN) {
      headers["Authorization"] = `Bearer ${process.env.DIRECTUS_API_BASE_TOKEN}`;
    }

    const response = await fetch(DIRECTUS_URL, {
      method: "GET",
      headers,
      next: { revalidate: 0 } // Disable caching for auth
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Internal authentication error" },
        { status: 500 }
      );
    }

    const { data } = await response.json();

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const user = data[0];

    // Password comparison using bcrypt
    const isPasswordMatch = await bcrypt.compare(password, user.hash_password);

    if (!isPasswordMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Prepare user session data
    const sessionData: UserSession = {
      userId: user.user_id,
      email: user.user_email,
      name: `${user.user_fname} ${user.user_lname}`,
      role: user.role,
      image: user.user_image,
      isAdmin: !!user.isAdmin,
    };

    // Set secure cookie
    await login(sessionData);

    return NextResponse.json({
      success: true,
      user: sessionData
    });

  } catch (error) {
    console.error("Auth Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
