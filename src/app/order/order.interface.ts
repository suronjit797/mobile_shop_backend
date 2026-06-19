import { Document, ObjectId } from "mongoose";

export interface ICustomerOrderInfo {
  city: string;
  country: string;
  name: string;
  phone: string;
  state: string;
  street: string;
  zipCode: string;
  paymentMethod: string;
}

export interface IOrder extends Document {
  orderId: number;
  items: {
    product: ObjectId;
    quantity: number;
  };
  customer: ObjectId;
  customerOrderInfo: ICustomerOrderInfo;
  status: "delivered" | "processing" | "shipped" | "pending" | "cancelled";
}
