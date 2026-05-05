import express from "express";
import cors from "cors";
import session from "express-session";
import registerRoutes from "./routes/index"; // point to your route loader
import { setting } from "@config/setting";
import path from "path";



const app = express();
app.use(express.static(path.resolve("public")));
const PORT = process.env.PORT ?? 3000;

// Middleware
// Allow requests from your React dev server
app.use(cors({
  origin: setting.corsOrigin, // ✅ now comes from .env
  credentials: true
}));


app.use(express.json());
app.use(session({
  secret: "sEdkuntNudtTeMudomer318U",
  resave: false,
  saveUninitialized: false,
}));

// Use centralized routes
registerRoutes(app);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});