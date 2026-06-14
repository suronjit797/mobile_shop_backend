import { Document, ObjectId } from "mongoose";

export interface IProduct extends Document {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: ObjectId;
  brand: string;
  rating: number;
  reviewCount: number;
  stock: number;
  tags: string[];
  seller: ObjectId;
}
