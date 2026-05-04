"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = registerRoutes;
const api_1 = __importDefault(require("./api"));
const web_1 = __importDefault(require("./web"));
function registerRoutes(app) {
    app.use("/api", api_1.default);
    app.use("/", web_1.default);
}
//# sourceMappingURL=index.js.map