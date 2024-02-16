import User from "../Models/Usermodels.js";
import bcrypt from "bcrypt";
import { errHandlers } from "../utils/Error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashPassword });
  try {
    await newUser.save();
    res.status(200).json("User Created Successfully...");
  } catch (err) {
    next(errHandlers(401, "UnAuthorized "));
  }
};
