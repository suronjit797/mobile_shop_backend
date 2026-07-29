import { RequestHandler } from "express";
import httpStatus from "http-status";
import { ApiError } from "xmcrud";
import ProductModel from "../product/product.model";
import OrderModel from "./order.model";

const IncreaseOrderId: RequestHandler = async (req, res, next) => {
  try {
    const previousOrderId = await OrderModel.findOne().sort({ orderId: -1 }).select("orderId");
    const newOrderId = previousOrderId ? previousOrderId.orderId + 1 : 1;
    req.body.orderId = newOrderId;
    next();
  } catch (error) {
    next(error);
  }
};

const reduceStockOnOrder: RequestHandler = async (req, res, next) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      return next();
    }

    // 1. Verify stock availability for all products
    for (const item of items) {
      const product = await ProductModel.findById(item.product);
      if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
      }
      if (product.stock < item.quantity) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          `Insufficient stock for ${product.name}. Available: ${product.stock}, Requested: ${item.quantity}`,
        );
      }
    }

    // 2. Deduct stock for each product
    for (const item of items) {
      await ProductModel.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity },
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

const handleStatusStockChange: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status: newStatus } = req.body;

    if (!newStatus) return next();

    const existingOrder = await OrderModel.findById(id);
    if (!existingOrder) return next();

    // Restore stock if order is being cancelled
    if (existingOrder.status !== "cancelled" && newStatus === "cancelled") {
      if (Array.isArray(existingOrder.items)) {
        for (const item of existingOrder.items) {
          await ProductModel.findByIdAndUpdate(item.product, {
            $inc: { stock: item.quantity },
          });
        }
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const orderMiddleware = {
  IncreaseOrderId,
  reduceStockOnOrder,
  handleStatusStockChange,
};
