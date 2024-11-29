import property from "../models/property.models.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import fs from "fs";

const getAllProperties = async (req, res) => {
  try {
    const properties = await property.find();
    res.send(properties);
  } catch (error) {
    console.error("Error while fetching Properties:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;

    const foundProperty = await property.findById(id);

    if (!foundProperty) {
      return res.status(404).send({ error: "Property not found" });
    }

    res.send(foundProperty);
  } catch (error) {
    console.error("Error while fetching Property:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const createProperty = async (req, res) => {
  try {
    const { name, email, address, phone } = req.body;
    const { photos, videos } = req.files;

    if (!photos || photos.length === 0) {
      return res.status(400).send({ error: "At least one photo is required" });
    }
    if (!videos || videos.length === 0) {
      return res.status(400).send({ error: "At least one video is required" });
    }

    const photoUploadPromises = photos.map((photo) =>
      uploadToCloudinary(photo)
    );
    const photoResults = await Promise.all(photoUploadPromises);
    const photoPaths = photoResults.map((result) => result.secure_url);

    const videoResult = await uploadToCloudinary(videos[0], "video");
    const videoUrl = videoResult.secure_url;

    const newProperty = await property.create({
      name,
      email,
      address,
      phone,
      images: photoPaths,
      videos: videoUrl,
    });

    photos.forEach((photo) => {
      fs.unlink(photo.path, (err) => {
        if (err) {
          console.error("Error deleting photo:", err);
        } else {
          console.log("Photo deleted successfully:", photo.path);
        }
      });
    });

    fs.unlink(videos[0].path, (err) => {
      if (err) {
        console.error("Error deleting video:", err);
      } else {
        console.log("Video deleted successfully:", videos[0].path);
      }
    });

    res.status(201).send(newProperty);
  } catch (error) {
    console.error("Error while adding Property:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteProp = await property.findOneAndDelete({ _id: id });

    if (!deleteProp) {
      return res.status(404).send({ error: "Property not found" });
    }

    res.send(deleteProp);
  } catch (error) {
    console.error("Error while deleting Property:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export { getAllProperties, getPropertyById, createProperty, deleteProperty };
