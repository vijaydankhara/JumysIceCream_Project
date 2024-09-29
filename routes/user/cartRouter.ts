import { Router, Request, Response } from "express";
import * as cartController from "../../controller/user/cartController";
const userCartRouter: Router = Router();
import { adminVerifyToken } from "../../middleware/adminVerifyToken";
import { request } from "http";


// ADD CART
userCartRouter.post("/add-cart",adminVerifyToken,cartController.addToCart);

// GET ALL CART
// userCartRouter.get("/get-All-Carts",adminVerifyToken,cartController.getAllCart);
  

// GET CART
// userCartRouter.get("/get-Cart",adminVerifyToken,cartController.getCart);
 

// UPDATE CART
// userCartRouter.put("/update-Cart",adminVerifyToken,cartController.updateCart);


// DELETE CART
// userCartRouter.delete("/delete-Cart",adminVerifyToken,cartController.deleteCart);
  

export default userCartRouter;