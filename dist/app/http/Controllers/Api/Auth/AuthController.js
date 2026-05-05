import { UserService } from "@ServiceAction/UserService";
export class AuthController {
    userService;
    static instance = new AuthController();
    constructor() {
        this.userService = new UserService();
    }
    /**
     * Handle logout request
     */
    async logout(req, res) {
        try {
            req.session.destroy((err) => {
                if (err) {
                    res.status(500).json({ message: "Failed to logout" });
                    return;
                }
                res.json({ message: "Logout successful" });
            });
        }
        catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    }
    /**
     * Check if user is authenticated
     */
    async checkAuth(req, res) {
        if (req.session.userId) {
            res.json({ authenticated: true, userId: req.session.userId });
        }
        else {
            res.json({ authenticated: false });
        }
    }
    /**
     * Get full logged-in user info
     */
    async loggeduseinfo(req, res) {
        if (!req.session.userId) {
            res.status(401).json({ message: "Not authenticated" });
            return;
        }
        try {
            const user = await this.userService.findUserById(req.session.userId);
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            res.json({ authenticated: true, user });
        }
        catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    }
}
//# sourceMappingURL=AuthController.js.map