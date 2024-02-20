import express from "express";
import mongoose from "mongoose";
import UserRouter from "./Routers/UserRouters.js";
import AuthRouter from "./Routers/AuthRouter.js";
import UserList from "./Routers/UserList.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 5000;

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Conneted to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(cookieParser());

app.listen(port, () => {
  console.log(`Server is Running on ${process.env.PORT}`);
});

app.use("/api/user", UserRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/list", UserList);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errMessage = err.message || "Inernal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    errMessage,
  });
});
