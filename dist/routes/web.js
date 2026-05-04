"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// Example: homepage route
router.get("/", (req, res) => {
    res.send("NodeJS backend Updated !");
});
exports.default = router;
//# sourceMappingURL=web.js.map