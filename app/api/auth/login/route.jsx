import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { dbConnect } from "@/app/Lib/mongoConnect";
import User from "@/app/Lib/models/User";
import Session from "@/app/Lib/models/Session";
import { signUserToken, buildAuthCookie } from "@/app/Lib/jwt";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body || {};

    if (!email || !password) {
      return NextResponse.json({ message: "Missing credentials" }, { status: 400 });
    }

    await dbConnect();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // Create session
    const token = signUserToken({ id: user._id.toString(), email: user.email });
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    
    await Session.create({
      user: user._id,
      token,
      expiresAt,
      userAgent: request.headers.get('user-agent') || '',
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    });

    const res = NextResponse.json({
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email },
    });
    res.headers.set("Set-Cookie", buildAuthCookie(token));
    return res;
  } catch (e) {
    return NextResponse.json({ message: "Server error", error: e.message }, { status: 500 });
  }
}



