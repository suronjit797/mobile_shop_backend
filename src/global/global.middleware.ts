import { Request } from "express";
import rateLimit from "express-rate-limit";
import { userRole } from "../shared/constant";

export const limiter = (max: number) => {
  return rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: (req: Request) => {
      const role = req.user?.role;
      if (req.originalUrl.includes("/profile")) return 10000;
      if (role && [userRole.superAdmin, userRole.admin].includes(role)) return max * 2;
      return max;
    },
    message: {
      status: 429,
      error: "Too many requests, please try again later.",
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
};
