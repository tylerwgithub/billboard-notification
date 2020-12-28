import express from "express";
import router from "./Router/router.js";
const app = express();
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
app.use("/", router);
