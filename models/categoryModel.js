import mongoose from "mongoose";

export const categorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      require: [true, "category is required"],
    },
  },
  { timestamps: true }
);
export const categoryModel = mongoose.model("Category", categorySchema);
export default categoryModel;
