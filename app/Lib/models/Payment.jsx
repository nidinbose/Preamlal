import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    razorpayOrderId: { type: String, required: true, unique: true },
    razorpayPaymentId: { type: String, unique: true, sparse: true },
    razorpaySignature: { type: String },
    amount: { type: Number, required: true }, // in paise
    currency: { type: String, required: true, default: "INR" },
    status: { 
      type: String, 
      enum: ["pending", "completed", "failed", "cancelled"], 
      default: "pending" 
    },
    receipt: { type: String, required: true },
    description: { type: String, default: "Pro Membership" },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

// Index for faster queries
PaymentSchema.index({ user: 1, createdAt: -1 });
PaymentSchema.index({ razorpayOrderId: 1 });
PaymentSchema.index({ razorpayPaymentId: 1 });

export default mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);
