import { Router } from "express";
import { LoginController } from "@Http/Controllers/Api/Auth/LoginController";
import { LoginRequest } from "@HttpRequest/Auth/LoginRequest";
const router = Router();
router.post("/login", LoginRequest, (req, res) => {
    return LoginController.instance.login(req, res);
});
export default router;
//# sourceMappingURL=login.js.map