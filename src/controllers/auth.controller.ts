import { Request, Response } from "express";
import { OAuth2Client, TokenPayload } from "google-auth-library";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import logger from "../config/logger.config";

export class AuthController {
  private client: OAuth2Client;
  private JWT_SECRET: string;
  private GOOGLE_CLIENT_ID: string;

  constructor() {
    this.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID ?? "";
    this.client = new OAuth2Client({ clientId: this.GOOGLE_CLIENT_ID });
    this.JWT_SECRET = process.env.JWT_SECRET ?? "secret";
  }

  public googleAuthController = async (req: Request, res: Response) => {
    const { token } = req.body;

    try {
      const ticket = await this.client.verifyIdToken({
        idToken: token,
        audience: this.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload() as TokenPayload;

      const { name, email, picture } = payload;

      let user = await User.findOne({ email });

      if (!user) {
        user = new User({ name, email, picture });
        await user.save();
      }

      // Generate JWT for session management (optional)
      const jwtToken = jwt.sign({ userId: user._id, email: user.email }, this.JWT_SECRET, { expiresIn: "1h" });

      res.status(201).json({ jwtToken, user });
    } catch (error) {
      logger.error({ error });
      res.status(400).json({ error: "Authentication failed" });
    }
  };
}
