import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 60,
    },
    desc: {
      type: String,
      required: true,
      maxlength: 200,
    },
    category: {
      type: String,
      required: false,
      default: "Appetizers",
    },
    img: {
      type: String,
      required: true,
    },
    prices: {
      type: Array,
      required: true,
    },
    extraOptions: {
      type: Array,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
