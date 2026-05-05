import { Router } from "express";

const router = Router();

// Example: homepage route
router.get("/", (req, res) => {
  res.send("Version 9.0.0 - Welcome to the API!");
});


export default router;
