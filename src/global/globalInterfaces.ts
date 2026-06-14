import { IUser } from "../app/user/user.interface";

export interface CustomJwtPayload {
  user: IUser;
}
