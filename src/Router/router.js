import express from "express";
import { getHot100, createUser } from "../Controller/BillboardController.js";

const router = express.Router();
router.get("/hot100", getHot100);
router.get("/port", (req, res) => {
  res.send(process.env.PORT);
});
router.get("/user", createUser);
export default router;
