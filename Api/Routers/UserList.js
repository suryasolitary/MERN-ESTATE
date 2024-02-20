import express from "express";
import { creatingList } from "../Controllers/ListingController.js";

const router = express.Router();

router.post("/create", creatingList);

export default router;
