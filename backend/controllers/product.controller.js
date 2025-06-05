import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProduct = async (req, res) => { // we get something from server by get method
    try {
        const products = await Product.find(); // find all products
        return res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            products: products
        });
    }catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
    
}
export const createProduct = async (req, res) => {// we get something from server by post method
    const product = req.body // user will send this data
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({
            success: false,
            message: "please provide all field data"
        })
    }
    const newProduct = new Product(product)
    try {
        await newProduct.save();
        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            product: newProduct
        }); 
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
        
    }
}
export const updateProduct = async (req, res) => {
    const { id } = req.params
    console.log(id)
    const product = req.body
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json ({
            success: false,
            message: "product not found with this id"
        })
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true})
        res.status(200).json({
            success: true,
            product: updatedProduct
        })
    }catch(err) {
        res.status(500).json({
            success: false,
            message : "server side erroror"
        })
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params; // get the id from the url
    console.log(id);
    try {
        const product = await Product.findByIdAndDelete(id); // find the product by id and delete it
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}