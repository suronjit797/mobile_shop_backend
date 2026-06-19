import { generateCrudRoutes, partialFilterMiddlewares, notFoundMiddleware } from "xmcrud";
import OrderModel from "./order.model";
import { Router } from "express";
import { validatorMiddleware } from "../../middleware/zodValidator";
import { orderCreateZodSchema, orderUpdateZodSchema } from "./order.validation";
import { orderMiddleware } from "./order.middleware";

const partialFilterItems = ["status"];
const orderRouter = Router();

const curdRouter = generateCrudRoutes({
  mongooseModel: OrderModel,
  name: "order",
  middlewares: {
    getAll: [partialFilterMiddlewares(partialFilterItems)],
    updateMany: [notFoundMiddleware],
    removeMany: [notFoundMiddleware],
    create: [validatorMiddleware(orderCreateZodSchema), orderMiddleware.IncreaseOrderId],
    update: [validatorMiddleware(orderUpdateZodSchema)],
  },
});

orderRouter.use(curdRouter);

export default orderRouter;
