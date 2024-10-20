import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";

export function categoryRoutes() {
  const router = Router();

  const categoryController = new CategoryController();

  router.post("", categoryController.create);
  router.get("", categoryController.get);
  router.get("/:id", categoryController.getById);
  router.put("/:id", categoryController.update);
  router.delete("/:id", categoryController.delete);

  return router;
}
