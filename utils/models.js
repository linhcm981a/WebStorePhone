import mongoose from "mongoose";

const { Schema } = mongoose;

const revokedTokenSchema = new Schema({
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const RevokedToken = mongoose.model("RevokedToken", revokedTokenSchema);

export default RevokedToken;
