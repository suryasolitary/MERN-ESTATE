import express from "express";
import {
  deleteUser,
  test,
  updateUser,
  getListingData,
} from "../Controllers/UserControllers.js";
import { verifyuser } from "../utils/verifyuser.js";

const router = express.Router();

router.get("/test", test);
router.post("/update/:id", verifyuser, updateUser);
router.delete("/delete/:id", verifyuser, deleteUser);
router.get("/list/:id", verifyuser, getListingData);

export default router;
