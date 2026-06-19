import { RequestHandler } from "express";
import OrderModel from "./order.model";

const IncreaseOrderId: RequestHandler = async (req, res, next) => {
    try {
        const previousOrderId = await OrderModel.findOne().sort({ orderId: -1 }).select("orderId");
        const newOrderId = previousOrderId ? previousOrderId.orderId + 1 : 1;
        req.body.orderId = newOrderId;
        next()
    } catch (error) {
        next(error);
    }
};

export const orderMiddleware = { IncreaseOrderId};
