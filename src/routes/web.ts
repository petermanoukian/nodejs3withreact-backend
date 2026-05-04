import { Router } from "express";

const router = Router();

// Example: homepage route
router.get("/", (req, res) => {
  res.send("NodeJS backend Updated !");
});


export default router;
