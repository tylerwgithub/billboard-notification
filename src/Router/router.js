import express from "express";
import { getHot100 } from "../Controller/BillboardController.js";

const router = express.Router();
router.get("/hot100", getHot100);
router.get("/port", () => {
  return process.env.PORT;
});
export default router;
