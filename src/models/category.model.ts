import { model, Schema } from "mongoose";

const CategorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    color: String,
  },
  {
    timestamps: true,
  }
);

const Category = model("categories", CategorySchema);

export default Category;
