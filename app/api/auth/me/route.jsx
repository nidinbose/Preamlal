import { NextResponse } from "next/server";
import { verifyAuth } from "@/app/Lib/middleware/auth";

export async function GET(request) {
  const { user, error } = await verifyAuth(request);
  
  if (!user) {
    return NextResponse.json({ message: error || "Authentication required" }, { status: 401 });
  }

  return NextResponse.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  });
}
