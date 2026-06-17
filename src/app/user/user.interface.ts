import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "superAdmin" | "admin" | "user" | "seller";
  lastLogin?: Date;
  isActive: boolean;
}
