import express from "express";
import {
  creatingList,
  deletingList,
  updateListing,
} from "../Controllers/ListingController.js";
import { verifyuser } from "../utils/verifyuser.js";

const router = express.Router();

router.post("/create", verifyuser, creatingList);
router.delete("/delete/:id", verifyuser, deletingList);
router.post("/update/:id", verifyuser, updateListing);

export default router;
