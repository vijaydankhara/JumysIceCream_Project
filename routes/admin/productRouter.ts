import { Router, Request, Response } from "express";
import * as productController from "../../controller/admin/productController";
import { adminVerifyToken } from "../../middleware/adminVerifyToken";
import upload from "../../middleware/imageUpload";
const productRouter: Router = Router();

// ADD PRODUCT
productRouter.post("/add-New-Product",adminVerifyToken,upload.array("productImage"),
productController.addNewProduct);


export default productRouter;