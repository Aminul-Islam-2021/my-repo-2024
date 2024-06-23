const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    images: [
      {
        public_id: { type: String },
        secure_url: { type: String },
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    rating: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
