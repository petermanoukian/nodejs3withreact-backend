import { Application } from "express";
import apiRoutes from "./api";
import webRoutes from "./web";

export default function registerRoutes(app: Application): void {
  app.use("/api", apiRoutes);
  app.use("/", webRoutes);
}
 
