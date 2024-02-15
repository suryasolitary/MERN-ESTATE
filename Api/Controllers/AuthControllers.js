import User from "../Models/Usermodels.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const hashPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashPassword });
  await newUser.save();
  res.status(200).json("User Created Successfully...");
};
