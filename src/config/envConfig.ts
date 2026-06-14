/* eslint-disable @typescript-eslint/no-explicit-any */
import dotenv from "dotenv";
import path from "path";
import type { Secret } from "jsonwebtoken";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  PORT: Number(process.env.PORT) || 4000,
  DB_URI: process.env.DB_URI as string,
  NODE_ENV: process.env.NODE_ENV as string,
  salt_round: Number(process.env.SALT_ROUND),
  token: {
    access_token_time: process.env.ACCESS_TOKEN_TIME as any,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET as Secret,
    refresh_token_time: process.env.REFRESH_TOKEN_TIME as any,
    refresh_token_secret: process.env.REFRESH_TOKEN_SECRET as Secret,
  },

  // superadmin
  SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL || "sa@example.com",
  SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD || "sa123#",
  SUPER_ADMIN_NAME: process.env.SUPER_ADMIN_NAME || "Super Admin",

  FRONTEND_BUILD_PATH: process.env.FRONTEND_BUILD_PATH || "../frontend/dist",
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3000",
};
