import { Schema, model } from "mongoose";
import type { IProduct } from "./product.interface";


const ProductSchema: Schema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    images: { type: [String], required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    brand: { type: String, required: true },
    rating: { type: Number, required: true },
    reviewCount: { type: Number, required: true },
    stock: { type: Number, required: true },
    tags: { type: [String], required: true },
    seller: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

const ProductModel = model<IProduct>("Product", ProductSchema);

export default ProductModel;
