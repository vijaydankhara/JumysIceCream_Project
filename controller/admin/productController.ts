import { Request, Response, response } from "express";
import jwt from "jsonwebtoken";
import ProductModel from "../../schemas/admin/productSchema";
import { IProduct } from "../../models/Iproduct";



// ADD NEW PRODUCT
export const addNewProduct = async (req: Request, res: Response) => {
    try {
        let product = await ProductModel.findOne({ title: req.body.title, isDelete: false });
        // console.log("product is:", product);
        
        if (product) {
            return res.status(400).json({ message: 'Product already exists' });
        }
        
        req.body.price = Number(req.body.price);
        // console.log((req as any).files);
        if (!(req as any).files || (req as any).files.length === 0) {
            return res.status(400).json({ message: 'No 📁📁📁 files uploaded !!! ' });
        }
        
        const imagePath: string[] = [];
        const files: any[] = (req as any).files;
        files.forEach((file: any) => {
            const path = file.path;
            imagePath.push(path);
        });
        // console.log(imagePath);
         
        product = await ProductModel.create({...req.body, productImage: imagePath });
        product.save();
        console.log(product);
        res.status(201).json({ product, message: 'Product Added' });

    
} catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
}
};


