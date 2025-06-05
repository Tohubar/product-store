import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';
import mongoose from 'mongoose';
import ProductRoutes from "./routes/product.route.js"

dotenv.config();
const app = express();
app.use(express.json()); // allows us to accept JSON data from the req.body
app.use("/api/products", ProductRoutes)

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running at http://localhost:${PORT}`);
});
