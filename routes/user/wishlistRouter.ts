import { Router} from "express";
import * as whishlistController from "../../controller/user/wishlistController"
import { userVerifyToken } from "../../middleware/adminVerifyToken"; 

const userWhishlistRouter: Router = Router();


// ADD WISHLIST
userWhishlistRouter.post("/add-whishlist",userVerifyToken,whishlistController.addToWishlist);

// GET ALL WISHISH
userWhishlistRouter.get("/get-All-wishlist",userVerifyToken,whishlistController.getAllWishlist);

// DELETE WISHISH
userWhishlistRouter.delete("/delete-wishlist",userVerifyToken,whishlistController.deleteWishlist);



export default userWhishlistRouter;