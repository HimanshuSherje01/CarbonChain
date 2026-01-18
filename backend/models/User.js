import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      // required: true, // Not required for Supabase auth users
    },
    supabaseId: {
      type: String,
      unique: true,
      sparse: true
    },

    role: {
      type: String,
      enum: ["admin", "verifier", "ngo", "corporate", "user"],
      required: true,
    },

    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const user = mongoose.model("User", userSchema);

export default user; 
