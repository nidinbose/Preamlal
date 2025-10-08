import { NextResponse } from "next/server";
import { dbConnect } from "@/app/Lib/mongoConnect";
import Session from "@/app/Lib/models/Session";
import { COOKIE_NAME } from "@/app/Lib/jwt";

export async function verifyAuth(request) {
  try {
    await dbConnect();

    const cookies = request.headers.get('cookie') || '';
    const tokenMatch = cookies.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
    
    if (!tokenMatch) {
      return { user: null, error: "No token found" };
    }

    const token = tokenMatch[1];
    const session = await Session.findActiveSession(token);
    
    if (!session) {
      return { user: null, error: "Invalid session" };
    }

    // Update last accessed time
    await Session.updateOne(
      { _id: session._id },
      { lastAccessedAt: new Date() }
    );

    return { user: session.user, error: null };
  } catch (e) {
    return { user: null, error: "Authentication error" };
  }
}

export function withAuth(handler) {
  return async (request, ...args) => {
    const { user, error } = await verifyAuth(request);
    
    if (!user) {
      return NextResponse.json({ message: error || "Authentication required" }, { status: 401 });
    }

    // Add user to request object
    request.user = user;
    return handler(request, ...args);
  };
}
