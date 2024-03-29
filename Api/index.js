import express from "express";
import mongoose from "mongoose";
import UserRouter from "./Routers/UserRouters.js";
import AuthRouter from "./Routers/AuthRouter.js";
import UserList from "./Routers/UserList.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errMessage = err.message || "Inernal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    errMessage,
  });
});
