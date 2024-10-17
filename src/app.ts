import express, { json } from "express";
import { buildRouter } from "./routes";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import logger from "./config/logger.config";

dotenv.config({ path: ".env" });

const app = express();

// inject global middlewares
app.use(json());
app.use(cors());

// inject routes
app.use("/api", buildRouter());

const port = 5000;
const mongodb_url = process.env.MONGODB_URI as string;

mongoose
  .connect(mongodb_url, {})
  .then(() => {
    logger.info("Database connection successful");
    app.listen(port, () => {
      logger.info(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    logger.error("Unable to connect DB, terminating server", error);
    process.exit(1);
  });
