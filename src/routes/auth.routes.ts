import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

export function authRoutes() {
  const router = Router();

  const authC = new AuthController();

  router.post("/google", authC.googleAuthController);
  return router;
}
