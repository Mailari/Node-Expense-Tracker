import express, { Request, Response } from "express";
import { authRoutes } from "./auth.routes";
import { categoryRoutes } from "./category.routes";

export function buildRouter() {
  const router = express.Router();

  router.get("/status", (_req: Request, res: Response) => {
    res.json({ message: "Hello World from Express and TypeScript!" });
  });

  router.use("/auth", authRoutes());
  router.use("/categories", categoryRoutes());

  return router;
}
