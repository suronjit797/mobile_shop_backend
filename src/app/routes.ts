import express from "express";
import userRouter from "./user/user.routes";

import { limiter } from "../global/global.middleware";
import { auth } from "../middleware/auth";

const router = express.Router();
const defaultRateLimit = 500;

const moduleRoute = [{ path: "/user", routes: userRouter, auth: false, rateLimit: defaultRateLimit }];

moduleRoute.forEach((route) => {
  const middlewares = [];

  if (route.auth) middlewares.push(auth());
  if (Number(route.rateLimit) > 0) middlewares.push(limiter(route.rateLimit));

  router.use(route.path, ...middlewares, route.routes);
});



export default router;
