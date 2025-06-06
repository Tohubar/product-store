import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import path from 'path';
import ProductRoutes from "./routes/product.route.js"

dotenv.config();
const app = express();
app.use(express.json()); // allows us to accept JSON data from the req.body

// Get the current directory name correctly
const __dirname = path.resolve();

// API routes
app.use("/api/products", ProductRoutes)

if (process.env.NODE_ENV === "production") {
    // Serve static files from frontend/dist
    app.use(express.static(path.join(__dirname, "frontend", "dist")));
    
    // Handle all other routes by serving index.html
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running at http://localhost:${PORT}`);
});