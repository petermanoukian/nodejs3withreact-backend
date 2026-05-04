import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, VerifyOptions, Secret } from "jsonwebtoken";
import { setting } from "@config/setting";

export function authTokenMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const secret: Secret = setting.jwtSecret;        // ✅ same trick as SignOptions
    const options: VerifyOptions = {};

    const test: string = setting.jwtSecret; // force TS to tell us the type
    console.log("JWT Secret type:", typeof test); // should log "string"
    const decoded = (jwt.verify as Function)(token, setting.jwtSecret, options) as JwtPayload;

    (req as any).user = decoded;
    return next();
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(401).json({ message: "Invalid token" });
  }
}