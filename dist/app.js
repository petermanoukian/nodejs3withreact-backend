"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const index_1 = __importDefault(require("./routes/index")); // point to your route loader
const setting_1 = require("./config/setting");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.static(path_1.default.resolve("public")));
const PORT = 3000;
// Middleware
// Allow requests from your React dev server
app.use((0, cors_1.default)({
    origin: setting_1.setting.corsOrigin, // ✅ now comes from .env
    credentials: true
}));
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: "sEdkuntNudtTeMudomer318U",
    resave: false,
    saveUninitialized: false,
}));
// Use centralized routes
(0, index_1.default)(app);
app.listen(PORT, () => {
    console.log(`🚀 From API, Server running at http://localhost:${PORT}`);
});
//# sourceMappingURL=app.js.map