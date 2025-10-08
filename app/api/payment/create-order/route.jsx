import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(request) {
  try {
    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;
    
    if (!key_id || !key_secret) {
      return NextResponse.json({ message: "Razorpay keys not configured" }, { status: 500 });
    }

    const { amount } = await request.json();
    const paymentAmount = amount || 300; // Default to ₹3 in paise

    const instance = new Razorpay({ key_id, key_secret });
    const receipt = `unstuck_${Date.now()}`;

    const order = await instance.orders.create({
      amount: paymentAmount,
      currency: "INR",
      receipt,
    });

    return NextResponse.json({ 
      order,
      message: "Order created successfully"
    });
  } catch (e) {
    console.error("Payment order creation error:", e);
    return NextResponse.json({ 
      message: "Failed to create order", 
      error: e.message 
    }, { status: 500 });
  }
}



