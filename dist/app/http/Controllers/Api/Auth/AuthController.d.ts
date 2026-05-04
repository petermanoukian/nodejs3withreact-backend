import { Request, Response } from "express";
export declare class AuthController {
    private userService;
    static readonly instance: AuthController;
    constructor();
    /**
     * Handle logout request
     */
    logout(req: Request, res: Response): Promise<void>;
    /**
     * Check if user is authenticated
     */
    checkAuth(req: Request, res: Response): Promise<void>;
    /**
     * Get full logged-in user info
     */
    loggeduseinfo(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=AuthController.d.ts.map