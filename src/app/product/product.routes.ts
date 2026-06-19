import { generateCrudRoutes, partialFilterMiddlewares, notFoundMiddleware } from "xmcrud";
import ProductModel from "./product.model";
import { Router } from "express";
import { validatorMiddleware } from "../../middleware/zodValidator";
import { productCreateZodSchema, productUpdateZodSchema } from "./product.validation";

const partialFilterItems = ["name", "description", "tags", "brand"];
const productRouter = Router();

const curdRouter = generateCrudRoutes({
  mongooseModel: ProductModel,
  name: "product",

  middlewares: {
    getAll: [partialFilterMiddlewares(partialFilterItems)],
    updateMany: [notFoundMiddleware],
    removeMany: [notFoundMiddleware],
    create: [validatorMiddleware(productCreateZodSchema)],
    update: [validatorMiddleware(productUpdateZodSchema)],
  },
});

// Other custom routes

// productRouter.get('/test', async (req, res) => {
//   const data = await ProductModel.find()
//   res.send(data)
// })

// must be end of router
productRouter.use(curdRouter);

export default productRouter;
