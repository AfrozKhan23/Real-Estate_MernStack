configDotenv();
import express from "express";
import connectDb from "./config/dbConn.js";
import cors from "cors";
import { configDotenv } from "dotenv";
import admin from "./routes/admin.routes.js";
import property from "./routes/property.routes.js";

const app = express();
const PORT = process.env.PORT || 4000;

// const corsOptions = {
//   origin: ["https://real-state-mern-stack.vercel.app", "http://localhost:5173"],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// };

// app.use(cors(corsOptions));
const allowedOrigins = [
  "https://real-state-mern-stack.vercel.app",
  "http://localhost:5173",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200);
});

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
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
