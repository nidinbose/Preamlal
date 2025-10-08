import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    token: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
    userAgent: { type: String },
    ipAddress: { type: String },
    lastAccessedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Index for faster queries and automatic cleanup
SessionSchema.index({ token: 1 });
SessionSchema.index({ user: 1, isActive: 1 });
SessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL index

// Method to check if session is valid
SessionSchema.methods.isValid = function() {
  return this.isActive && this.expiresAt > new Date();
};

// Static method to find active session by token
SessionSchema.statics.findActiveSession = function(token) {
  return this.findOne({ 
    token, 
    isActive: true, 
    expiresAt: { $gt: new Date() } 
  }).populate('user', 'name email');
};

export default mongoose.models.Session || mongoose.model("Session", SessionSchema);
