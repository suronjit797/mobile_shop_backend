import { generateCrudRoutes, partialFilterMiddlewares, notFoundMiddleware } from "xmcrud";
import CategoryModel from "./category.model";
import { Router } from "express";

const partialFilterItems = [""];
const categoryRouter = Router();

const curdRouter = generateCrudRoutes({
  mongooseModel: CategoryModel,
  name: "category",

  middlewares: {
    getAll: [partialFilterMiddlewares(partialFilterItems)],
    updateMany: [notFoundMiddleware],
    removeMany: [notFoundMiddleware],
  },
});

// Other custom routes

// categoryRouter.get('/test', async (req, res) => {
//   const data = await CategoryModel.find()
//   res.send(data)
// })

// must be end of router
categoryRouter.use(curdRouter);

export default categoryRouter;
