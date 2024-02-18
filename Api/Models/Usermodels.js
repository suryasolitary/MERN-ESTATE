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
    profilePic: {
      type: String,
      default:
        "https://cdn.vectorstock.com/i/1000x1000/51/87/student-avatar-user-profile-icon-vector-47025187.webp",
    },
  },
  { timestamps: true, versionKey: false }
);

const model = mongoose.model("User", UserSchema);
export default model;
