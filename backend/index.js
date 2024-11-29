configDotenv();
import express from "express";
import connectDb from "./config/dbConn.js";
import cors from "cors";
import { configDotenv } from "dotenv";
import admin from "./routes/admin.routes.js";
import property from "./routes/property.routes.js";

const app = express();
const PORT = process.env.PORT || 4000;

const corsOptions = {
  origin: "https://real-state-mern-stack.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDb();

app.get("/", (req, res) => {
  res.status(200).json({
    Message: "server is running",
  });
});

app.use("/files", express.static("files"));

app.use("/api/v1/admin", admin);
app.use("/api/v1/property", property);

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
