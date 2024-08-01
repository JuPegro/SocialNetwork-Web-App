// IMPORT PACKAGES
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";

// IMPORT ROUTES
import authRoutes from "./routes/auth.routes.js";

// CREATE SERVER
const app = express();

// SET MIDDLEWARE FOR COOKIES
app.use(cookieParser());

// SET MORGAN
app.use(morgan("dev"));

// SET CORS
app.use(cors());

// READ ENVIROMENTS VARIABLES
dotenv.config();

// SERVER READ JSON FILES
app.use(express.json());

// SERVER READ DATA FROM FORMS
app.use(express.urlencoded({ extended: true }));

// SET ROUTES
app.use("/api/auth", authRoutes);

export default app;
