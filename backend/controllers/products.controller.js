import Product from '../models/products.models.js';
import { mongoose } from 'mongoose';


export const getProducts = async (req, res) => {

    try {
        const products = await Product.find({});
        res.status(200).json({success:true, data:products});
    } catch (error) {
        console.log("error fetching products: " + error.message);
        res.status(500).json({success:false, message:"provide a field"});
    }
}

export const createProducts = async (req, res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.image){
        return res.status(400).json({success:false, message:"please provide all fields"})
    }
    const newProduct = new Product(product)

    try {
        await newProduct.save();
        res.status(200).json({success:true, data:newProduct, message:"Product saved successfully"});
    } catch (error) {
        console.log("error occured:" , error.message);
        res.status(500).json({success:false, message:'server error'});
    }
}


export const updateProduct =  async (req, res) => {
    const {id} = req.params;
    
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message:"invalid id"});
    }

    try {
      const updatedProduct =  await Product.findByIdAndUpdate(id, product, {new: true});
      res.status(200).json({success:true, data: updatedProduct});
    } catch (error) {
        res.status(500).json({success:false, message:"error occured from server"});
    }
};


export const deleteProduct =  async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message:"invalid id"});
    }

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true, message:"Product deleted"});

    } catch (error) {
        res.status(500).json({success:false, message:"Product not found"});
    }
}