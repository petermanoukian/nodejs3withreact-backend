"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LoginController_1 = require("../../../app/http/Controllers/Api/Auth/LoginController");
const LoginRequest_1 = require("../../../app/http/Request/Auth/LoginRequest");
const router = (0, express_1.Router)();
router.post("/login", LoginRequest_1.LoginRequest, (req, res) => {
    return LoginController_1.LoginController.instance.login(req, res);
});
exports.default = router;
//# sourceMappingURL=login.js.map