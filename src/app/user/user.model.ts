import { Schema, model } from "mongoose";
import type { IUser } from "./user.interface";
import bcrypt from "bcryptjs";
import config from "../../config/envConfig";

const UserSchema: Schema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, trim: true },
    role: { type: String, enum: ["superAdmin", "admin", "seller", "user"], default: "user" },
    password: { type: String, required: true, select: false, minlength: 6 },
    lastLogin: { type: Date, default: null },
  },
  { timestamps: true },
);

UserSchema.pre<IUser>("save", async function (next) {
  if (this.isModified("password")) {
    if (this.password) {
      try {
        const saltRounds = Number(config.salt_round);
        if (isNaN(saltRounds)) {
          console.error("Invalid salt_round in config. It must be a number.");
          return next(new Error("Server configuration error for password hashing."));
        }
        const salt = await bcrypt.genSalt(saltRounds);
        this.password = await bcrypt.hash(this.password, salt);
      } catch (error) {
        console.error("Error hashing password:", error);
        return next(error instanceof Error ? error : new Error("Error hashing password"));
      }
    }
  }
  next();
});

const UserModel = model<IUser>("User", UserSchema);

export default UserModel;
