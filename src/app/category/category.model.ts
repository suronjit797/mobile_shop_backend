import { Schema, model } from "mongoose";
import type { ICategory } from "./category.interface";


const CategorySchema: Schema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, trim: true },
    image: { type: String, required: true },
  },
  { timestamps: true },
);

const CategoryModel = model<ICategory>("Category", CategorySchema);

export default CategoryModel;
