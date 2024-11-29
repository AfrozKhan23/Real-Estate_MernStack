import { v2 as cloudinary } from "cloudinary";
import { configDotenv } from "dotenv";
configDotenv();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (file, resourceType = "auto") => {
  try {
    const uploadResult = await cloudinary.uploader.upload(file.path, {
      folder: "Real-Estate",
      resource_type: resourceType,
      transformation: [{ width: 500, height: 500, crop: "fill" }],
    });
    return uploadResult;
  } catch (error) {
    throw new Error("Cloudinary upload failed: " + error.message);
  }
};
