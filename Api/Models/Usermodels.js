import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      unique: true,
      require: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      require: true,
    },
    password: {
      type: String,
      trim: true,
      require: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const model = mongoose.model("User", UserSchema);
export default model;
