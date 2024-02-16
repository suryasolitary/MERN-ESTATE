import User from "../Models/Usermodels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  //console.log(req.body);
  try {
    const validuser = await User.findOne({ email });
    if (!validuser) {
      return next(errHandlers(403, "Forbidon Error"));
    }
    const validpassword = bcrypt.compareSync(password, validuser.password);
    if (!validpassword) {
      return next(errHandlers(401, "Wrong Credentials"));
    }
    const token = jwt.sign({ id: validuser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validuser._doc;
    res
      .cookie("Access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (err) {
    next(err);
  }
};
