import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Product name is required"],
  },
  description: {
    type: String,
    required: [true, "description is required"],
  },
  price: {
    type: Number,
    required: [true, "price s required"],
  },
  stock: {
    type: Number,
    required: [true, "stock is required"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  images: [
    {
      public_id: String,
      url: String,
    },
  ],
});

export const productModel = mongoose.model("Products", productSchema);
export default productModel;
