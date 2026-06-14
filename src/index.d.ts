import { IUser } from "./app/user/user.interface";

declare global {
  namespace Express {
    interface Request {
      user: IUser;
      partialFilter: array;
    }
  }

  namespace jwt {
    interface JwtPayload {
      user: IUser;
    }
  }
}
