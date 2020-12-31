import express from "express";
import { getHot100, createUser } from "../Controller/BillboardController.js";
import { getSubscribe } from "../Template/Subscribe.js";
const router = express.Router();
router.get("/hot100", getHot100);
router.get("/port", (req, res) => {
  res.send(process.env.PORT);
});
router.get("/user", createUser);
router.get("/subscribe", (req, res) => {
  res.send(getSubscribe());
});
router.get("/", (req, res) => {
  res.send(
    "Welcome to Apakee! This site is reserved for our official website."
  );
});

export default router;
