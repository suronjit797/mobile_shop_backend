import { generateCrudRoutes, partialFilterMiddlewares, notFoundMiddleware } from "xmcrud";
import UserModel from "./user.model";
import { Router } from "express";
import { validatorMiddleware } from "../../middleware/zodValidator";
import { userCreateZodSchema, userUpdateZodSchema } from "./user.validation";
import { userController } from "./user.controller";

const partialFilterItems = [""];
const userRouter = Router();

const curdRouter = generateCrudRoutes({
  mongooseModel: UserModel,
  name: "user",
  middlewares: {
    getAll: [partialFilterMiddlewares(partialFilterItems)],
    updateMany: [notFoundMiddleware],
    removeMany: [notFoundMiddleware],
    create: [validatorMiddleware(userCreateZodSchema)],
    update: [validatorMiddleware(userUpdateZodSchema)],
    // remove: [],
    // getSingle: [],
  },
});

// Other custom routes
userRouter.post("/login", userController.login);

userRouter.use(curdRouter);
export default userRouter;
