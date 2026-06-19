import { Schema, model } from "mongoose";
import type { IOrder } from "./order.interface";

const OrderSchema: Schema = new Schema<IOrder>(
  {
    orderId: { type: Number, required: true },
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
      },
    ],
    customer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    customerOrderInfo: {
      city: String,
      country: String,
      name: String,
      phone: String,
      state: String,
      street: String,
      zipCode: String,
      paymentMethod: String,
    },
    status: { type: String, enum: ["delivered", "processing", "shipped", "pending", "cancelled"], default: "pending" },
  },
  { timestamps: true },
);

const OrderModel = model<IOrder>("Order", OrderSchema);

export default OrderModel;
