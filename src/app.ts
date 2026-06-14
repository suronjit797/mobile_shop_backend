import cookieParser from "cookie-parser";
import cors from "cors";
import type { Application, Request, Response } from "express";
import express from "express";
import fs from "fs";
import morgan from "morgan";
import path from "path";
import router from "./app/routes";
import config from "./config/envConfig";
import globalError from "./global/globalError";

const app: Application = express();
const buildPath = config.FRONTEND_BUILD_PATH;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(cookieParser());

// main api routes
app.use("/api/v1", router);
// handle not found route

// frontend
if (fs.existsSync(buildPath + "/index.html")) {
  console.log("Found ----------------> ", buildPath);
  app.use("/", express.static(path.resolve(buildPath)));
  app.use(function (req, res) {
    res.sendFile(path.resolve(buildPath, "index.html"));
  });
} else {
  console.log("Not found ----------------> ", buildPath);
  app.use("/", express.static("public"));
}

app.use((req: Request, res: Response) => {
  res.status(404).send({
    success: false,
    message: "Route not found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "Route not found",
      },
    ],
  });
});

app.use(globalError);

export default app;
