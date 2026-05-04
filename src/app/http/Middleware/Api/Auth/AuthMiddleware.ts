import { Request, Response, NextFunction } from "express";

/**
 * Middleware to enforce authentication
 */
export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.userId) {
    // User is authenticated
    return next();
  }

  // Not authenticated
  return res.status(401).json({ message: "Unauthorized" });
}
