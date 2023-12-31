import express from "express";
import dotenv from "dotenv";
import postRoutes from "./routes/post.routes.js";
import connectDB from "./config/db.js";
import cors from "cors";

dotenv.config({ path: ".env" });

const app = express();
const port = process.env.PORT;

// Database connection
connectDB();

// Configuration for cors policy
const corsOptions = {
  origin: process.env.CLIENT_URL !== undefined ? process.env.CLIENT_URL : "*",
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};

// Intercept all requests to apply cors configuration before all requests
app.use(cors(corsOptions));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/post", postRoutes);

// Launch server
app.listen(port, () => console.log("server is on port : " + port));
