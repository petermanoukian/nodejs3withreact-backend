"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginRequest = void 0;
const express_validator_1 = require("express-validator");
exports.LoginRequest = [
    (0, express_validator_1.body)("identifier")
        .exists()
        .withMessage("Email or username is required")
        .isString()
        .withMessage("Identifier must be a string")
        .notEmpty()
        .withMessage("Email or username cannot be empty"),
    (0, express_validator_1.body)("password")
        .exists()
        .withMessage("Password is required")
        .isString()
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),
];
//# sourceMappingURL=LoginRequest.js.map