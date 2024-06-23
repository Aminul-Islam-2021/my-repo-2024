const fs = require("fs");

const {
  uploadMultipleImages,
  deleteMultipleImages,
  cloudinary,
} = require("../config/cloudinary");
const Product = require("../models/productModel");
const apiFeatures = require("../utils/apiFeature");

// Route: localhost:8000/api/product/create
const createproduct = async (req, res) => {
  try {
    const file = req.files;
    const { name, brand, category, desc, price, stock } = req.body;
    if (!name || !brand || !category || !desc || !price || !stock) {
      return res.json("Please fill all the fields");
    }
    const savedImg = await uploadMultipleImages(file);
    const product = await Product.create({
      name,
      brand,
      category,
      desc,
      images: savedImg,
      price,
      stock,
    });
    if (!product) {
      return res.json({ message: "Product not created" });
    }
    return res.json({ message: "Product created", product });
  } catch (error) {
    console.log(error);
    return res.json(error.message);
  }
};

// Route: localhost:8000/api/product/getall
const getAllproduct = async (req, res) => {
  try {
    const productCount = await Product.countDocuments();
    const features = new apiFeatures(Product.find(), req.query)
      .search()
      .filter()
      .sort()
      .paginate();
    const allProduct = await features.query;
    if (!allProduct) {
      return res.json("Product not found");
    }
    return res.json({
      message: "Get All Product",
      productCount,
      total: allProduct.length,
      allProduct,
    });
  } catch (error) {
    console.log(error);
    return res.json(error.message);
  }
};

// Route: localhost:8000/api/product/getone
const getOneproduct = async (req, res) => {
  try {
    const { id } = req.params;
    const getProduct = await Product.findById(id);
    if (!getProduct) {
      return res.json("Product not found");
    }
    return res.json({ message: "Get One Product", getProduct });
  } catch (error) {
    console.log(error);
    return res.json(error.message);
  }
};

// Route: localhost:8000/api/product/update
const updateproduct = async (req, res) => {
  const { id } = req.params;
  const file = req.files;
  const { name, desc, brand, stock, category, price } = req.body;

  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Update product fields
    if (name) product.name = name;
    if (desc) product.desc = desc;
    if (price) product.price = price;
    if (category) product.category = category;
    if (brand) product.brand = brand;
    if (stock) product.stock = stock;

    if (product.images.length) {
      const oldimgDel = product.images.map((img) => img.public_id);
      // Delete images from cloudinary
      for (const publicId of oldimgDel) {
        await cloudinary.uploader.destroy(publicId);
      }
    }

    const newImg = await uploadMultipleImages(file);
    product.images = newImg;

    {
      /* 
       // Handle image updates
    if (product.images && product.images.length) {
      // Delete old images from Cloudinary
      for (const image of product.images) {
        await cloudinary.uploader.destroy(image.public_id);
      }

      const savedImg = await uploadMultipleImages(file);
      // Add new images
      product.images = savedImg; // Assume images is an array of { url: '', public_id: '' }
    }
      */
    }

    {
      /*
    if (product.images.length) {
      // Extract the public_ids of images
      const allImg = product.images.map((img) => img.public_id);
      // Delete images from cloudinary
      for (const publicId of allImg) {
        await cloudinary.uploader.destroy(publicId);
      }
      const savedImg = await uploadMultipleImages(file);
      // Add new images
      product.images = savedImg;
    }
      */
    }

    await product.save();
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Route: localhost:8000/api/product/delete
const deleteproduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.json("Product not found");
    }
    // Extract the public_ids of images
    const allImg = product.images.map((img) => img.public_id);
    // Delete images from cloudinary
    for (const publicId of allImg) {
      await cloudinary.uploader.destroy(publicId);
    }
    await Product.findByIdAndDelete(id);
    return res.json({ message: "product deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.json(error.message);
  }
};

module.exports = {
  createproduct,
  getAllproduct,
  getOneproduct,
  updateproduct,
  deleteproduct,
};
