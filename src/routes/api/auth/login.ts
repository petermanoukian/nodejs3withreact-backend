import { Router, Request, Response } from "express";
import { LoginController } from "@Http/Controllers/Api/Auth/LoginController";
import { LoginRequest } from "@HttpRequest/Auth/LoginRequest";

const router = Router();

router.post("/login", LoginRequest, (req: Request, res: Response) => {
    return LoginController.instance.login(req, res);
});

export default router;

