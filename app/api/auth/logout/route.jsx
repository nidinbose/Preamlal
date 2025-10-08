import { NextResponse } from "next/server";
import { dbConnect } from "@/app/Lib/mongoConnect";
import Session from "@/app/Lib/models/Session";
import { clearAuthCookie, COOKIE_NAME } from "@/app/Lib/jwt";

export async function POST(request) {
  try {
    await dbConnect();
    
    // Get token from cookie
    const cookies = request.headers.get('cookie') || '';
    const tokenMatch = cookies.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
    
    if (tokenMatch) {
      const token = tokenMatch[1];
      // Deactivate session
      await Session.updateOne(
        { token },
        { isActive: false }
      );
    }

    const res = NextResponse.json({ message: "Logged out" });
    res.headers.set("Set-Cookie", clearAuthCookie());
    return res;
  } catch (e) {
    const res = NextResponse.json({ message: "Logged out" });
    res.headers.set("Set-Cookie", clearAuthCookie());
    return res;
  }
}



