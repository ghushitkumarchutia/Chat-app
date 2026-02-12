const mongoose = require("mongoose");

const threadSchema = new mongoose.Schema(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    lastMessage: { type: String },
    lastMessageAt: { type: Date },
    unReadCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Thread", threadSchema);
