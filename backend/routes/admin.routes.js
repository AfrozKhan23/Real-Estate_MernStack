import express from "express";
import { getAdmin, createAdmin, updateAdmin } from "../controllers/admin.js";
import authenticateJWT from "../middlewares/auth.js";

const router = express.Router();

router.post("/", getAdmin);
router.post("/create", authenticateJWT, createAdmin);
router.put("/update/:id", authenticateJWT, updateAdmin);
export default router;
