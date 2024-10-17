import express, { json } from "express";
import { buildRouter } from "./routes";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import logger from "./config/logger.config";

dotenv.config({ path: ".env" });

const app = express();

// Allowed origins
const allowedOrigins = ["https://expense-tracker.mailarigh.com", "http://localhost:3000"];

// CORS options
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true); // Allow if origin is in the allowed list
    } else {
      callback(new Error("Not allowed by CORS")); // Deny otherwise
    }
  },
  credentials: true, // Allow cookies or credentials to be sent
};

// inject global middlewares
app.use(json());
app.use(cors(corsOptions));

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
