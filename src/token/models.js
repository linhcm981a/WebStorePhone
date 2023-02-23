import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const TokenModel = mongoose.model("Token", tokenSchema);

export default TokenModel;
