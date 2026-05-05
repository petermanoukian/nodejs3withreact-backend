import { body } from "express-validator";
export const LoginRequest = [
    body("identifier")
        .exists()
        .withMessage("Email or username is required")
        .isString()
        .withMessage("Identifier must be a string")
        .notEmpty()
        .withMessage("Email or username cannot be empty"),
    body("password")
        .exists()
        .withMessage("Password is required")
        .isString()
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),
];
//# sourceMappingURL=LoginRequest.js.map