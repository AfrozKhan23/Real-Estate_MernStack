import express from "express";
import { upload } from "../middlewares/imagesUpload.js";
import {
  getAllProperties,
  getPropertyById,
  createProperty,
  deleteProperty,
} from "../controllers/property.js";
import authenticateJWT from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getAllProperties);
router.get("/:id", getPropertyById);

router.post(
  "/create",
  authenticateJWT,
  upload.fields([
    { name: "photos", maxCount: 5 },
    { name: "videos", maxCount: 1 },
  ]),
  createProperty
);

router.delete("/delete/:id", authenticateJWT, deleteProperty);

export default router;
