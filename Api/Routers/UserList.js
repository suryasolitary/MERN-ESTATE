import express from "express";
import {
  creatingList,
  deletingList,
  updateListing,
  getlisting,
  getListings,
} from "../Controllers/ListingController.js";
import { verifyuser } from "../utils/verifyuser.js";

const router = express.Router();

router.post("/create", verifyuser, creatingList);
router.delete("/delete/:id", verifyuser, deletingList);
router.post("/update/:id", verifyuser, updateListing);
router.get("/get/:id", getlisting);
router.get("/get", getListings);

export default router;
