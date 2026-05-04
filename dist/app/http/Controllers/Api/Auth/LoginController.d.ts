import { Request, Response } from "express";
export declare class LoginController {
    private userService;
    static readonly instance: LoginController;
    constructor();
    /**
     * Handle login request
     */
    login(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=LoginController.d.ts.map