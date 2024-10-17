import express, { Request, Response } from "express";
import { authRoutes } from "./auth.routes";

export function buildRouter() {
  const router = express.Router();

  router.get("/status", (_req: Request, res: Response) => {
    res.json({ message: "Hello World from Express and TypeScript!" });
  });

  router.use("/auth", authRoutes());

  return router;
}
