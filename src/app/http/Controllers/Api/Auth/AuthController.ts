import { Request, Response } from "express";
import { UserService } from "@ServiceAction/UserService";

export class AuthController {
  private userService: UserService;

  static readonly instance = new AuthController();

  constructor() {
    this.userService = new UserService();
  }

  /**
   * Handle logout request
   */
  async logout(req: Request, res: Response): Promise<void> {
    try {
      req.session.destroy((err) => {
        if (err) {
          res.status(500).json({ message: "Failed to logout" });
          return;
        }
        res.json({ message: "Logout successful" });
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }

  /**
   * Check if user is authenticated
   */
  async checkAuth(req: Request, res: Response): Promise<void> {
    if (req.session.userId) {
      res.json({ authenticated: true, userId: req.session.userId });
    } else {
      res.json({ authenticated: false });
    }
  }

  /**
   * Get full logged-in user info
   */
  async loggeduseinfo(req: Request, res: Response): Promise<void> {
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
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }
}

