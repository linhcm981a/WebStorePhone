import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true },
    phone: { type: String },
    email: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    image: { type: String },
    gender: { type: String },
  },
  {
    versionKey: false,
  }
);

const User = mongoose.model('User', userSchema);

export default User;
