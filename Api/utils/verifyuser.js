import { errHandlers } from "./Error.js";
import Jwt from "jsonwebtoken";

export const verifyuser = (req, res, next) => {
  const token = req.cookies.Access_token;

  if (!token) {
    return next(errHandlers(401, "UnAuthorizition"));
  }
  Jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errHandlers(403, "Forbiddan"));
    }
    req.user = user;
    next();
  });
};
