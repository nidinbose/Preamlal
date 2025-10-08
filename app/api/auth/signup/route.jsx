import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/app/Lib/mongoConnect";
import User from "@/app/Lib/models/User";
import Session from "@/app/Lib/models/Session";
import { signUserToken, buildAuthCookie } from "@/app/Lib/jwt";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email, password } = body || {};

    if (!name || !phone || !email || !password) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    await dbConnect();

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ message: "Email already in use" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, phone, email, passwordHash });

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
      message: "Signup successful",
      user: { id: user._id, name: user.name, email: user.email },
    });
    res.headers.set("Set-Cookie", buildAuthCookie(token));
    return res;
  } catch (e) {
    return NextResponse.json({ message: "Server error", error: e.message }, { status: 500 });
  }
}



