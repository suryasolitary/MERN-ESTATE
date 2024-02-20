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

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("Access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random.toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashPassword = bcrypt.hashSync(generatedPassword, 10);
      const username =
        req.body.username.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-4);
      const newuser = new User({
        username: username,
        email: req.body.email,
        password: hashPassword,
        profilePic: req.body.profilePic,
      });
      await newuser.save();
      const token = jwt.sign({ id: newuser._id }, process.env.JWT_SECRET);
      res
        .cookie("Access_token", token, { httpOnly: true })
        .status(200)
        .json(newuser);
    }
  } catch (err) {
    console.log(err);
  }
};

export const signOut = (req, res, next) => {
  try {
    res.clearCookie("Access_token");
    res.status(200).json({ message: " User Sign out Successfull..." });
  } catch (err) {
    next(err);
  }
};
