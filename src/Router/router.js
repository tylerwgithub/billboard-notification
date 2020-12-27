import express from "express";
import { getHot100 } from "../Controller/BillboardController.js";

const router = express.Router();
router.get("/", getHot100);
export default router;
