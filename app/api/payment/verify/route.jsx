import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request) {
  try {
    const body = await request.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ message: "Missing payment details" }, { status: 400 });
    }

    // Verify signature
    const key_secret = process.env.RAZORPAY_KEY_SECRET;
    const body_signature = razorpay_order_id + "|" + razorpay_payment_id;
    const expected_signature = crypto
      .createHmac("sha256", key_secret)
      .update(body_signature)
      .digest("hex");

    if (expected_signature !== razorpay_signature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 400 });
    }

    // Payment verification successful
    return NextResponse.json({ 
      message: "Payment verified successfully",
      payment: {
        order_id: razorpay_order_id,
        payment_id: razorpay_payment_id,
        status: "completed"
      }
    });
  } catch (e) {
    console.error("Payment verification error:", e);
    return NextResponse.json({ 
      message: "Verification failed", 
      error: e.message 
    }, { status: 500 });
  }
}
