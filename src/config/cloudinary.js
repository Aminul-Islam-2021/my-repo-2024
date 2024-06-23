const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// Configure configure
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// upload single image function for now it no used
const uploadSingleImage = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "my-image",
    });
    return { secure_url: result.secure_url, public_id: result.public_id };
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw error;
  }
};

// upload multiple images function now it no used
const uploadMultipleImages = async (files) => {
  try {
    return await Promise.all(files.map((file) => uploadSingleImage(file)));
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw error;
  }
};

const deleteImage = async (public_id) => {
  try {
    const result = await cloudinary.uploader.destroy(public_id);
    return result;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw error;
  }
};

async function deleteMultipleImages(public_id) {
  try {
    const deletePromises = public_id.map(public_id => cloudinary.uploader.destroy(public_id));
    const results = await Promise.all(deletePromises);
    return results;
  } catch (error) {
    throw new Error('Error deleting multiple images from Cloudinary');
  }
}




module.exports = { uploadSingleImage, uploadMultipleImages,deleteImage,cloudinary,deleteMultipleImages };
