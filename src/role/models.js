import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    nameRole: {
      type: String,
      enum: ["admin", "employee", "customer"],
      required: true,
    },
    username: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

const Role = mongoose.model("Role", roleSchema);

export default Role;
