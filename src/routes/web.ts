import { Router } from "express";

const router = Router();

// Example: homepage route
router.get("/", (req, res) => {
  res.send("Node JS Backend for React Front End - Online Version");
});


export default router;
