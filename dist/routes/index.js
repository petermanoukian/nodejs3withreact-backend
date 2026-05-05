import apiRoutes from "./api";
import webRoutes from "./web";
export default function registerRoutes(app) {
    app.use("/api", apiRoutes);
    app.use("/", webRoutes);
}
//# sourceMappingURL=index.js.map