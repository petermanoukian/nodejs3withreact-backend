import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { LoginRequest } from "@HttpRequest/Auth/LoginRequest";
import { UserService } from "@ServiceAction/UserService";
import jwt, { SignOptions } from "jsonwebtoken";
import { setting } from "@config/setting";

export class LoginController {
  private userService: UserService;

    static readonly instance = new LoginController();  // 👈 add this


  constructor() {
    this.userService = new UserService();
  }

  /**
   * Handle login request
   */

  async login(req: Request, res: Response): Promise<void> {
    await Promise.all(LoginRequest.map((rule) => rule.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    const { identifier, email, username, password, rememberMe } = req.body; // 👈 rememberMe

    const loginIdentifier = identifier || email || username;

    try {
      const user = await this.userService.login(loginIdentifier, password);
      if (!user) {
        res.status(401).json({ message: "Invalid credentials, what you provided is not valid AMIGO" });
        return;
      }

      req.session.userId = user.id;

      const options: SignOptions = {
        expiresIn: rememberMe ? "30d" : setting.jwtExpiresIn, // 👈
      };

      const token = jwt.sign(
        { userId: user.id, fullname: user.fullname },
        setting.jwtSecret,
        options
      );

      res.json({ message: "Login successful", user, token, rememberMe }); // 👈 send rememberMe back

    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }


}
