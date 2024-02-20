import { errHandlers } from "../utils/Error.js";
import User from "../Models/Usermodels.js";
import bcrypt from "bcrypt";

export const test = (req, res) => {
  res.status(200).json({ Message: "Api Routes Created..." });
};

export const updateUser = async (req, res, next) => {
  console.log("update User : ", req.user.id);
  if (req.user.id !== req.params.id) {
    return next(errHandlers(401, "You can update only on your Account"));
  }
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePic: req.body.profilePic,
        },
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
  }
};

export const deleteUser = async (req, res, next) => {
  console.log(req.user.id);
  console.log(req.params.id);
  if (req.user.id !== req.params.id) {
    return next(errHandlers(401, "You can Delete on your own Account..."));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("Access_token");
    res.status(200).json({ Message: "User Account Delected Successfull..." });
  } catch (err) {
    next(err);
  }
};
