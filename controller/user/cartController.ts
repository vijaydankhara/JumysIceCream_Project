import { Request, Response } from 'express';
import CartModel from '../../schemas/cartSchema';



const cartModel = new CartModel();
declare global {
    namespace Express {
        interface Request {
            user? : any;
        }
    }
}

// ADD TO CART
export const addToCart = async (req: Request, res: Response) => {
    try {
        let cart = await CartModel.findOne({
            user: (req.user as any)._id, 
            cartItem: req.body.cartItem,
            isDelete: false
        });
        console.log("cart find  ===> ",cart);

        if (cart) {
            return res.json({ message: "This Item Already In your Cart" });
        }
        cart = await CartModel.create({
            user: (req.user as any)._id,
            ...req.body
        });
        console.log("cart creat  ===> ",cart);

        return res.status(201).json({ cart, message: `New Item Is Added To The Cart......` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


// // GET ALL CART
// export const getAllCart = async (req: Request, res: Response) => {
//     try {
//         let userCarts = req.query.me === 'true' ? [
//             {
//                 $match: { user: req.user._id }
//             }
//         ] : [];

//         let aggregateQuery = [
//             { $match: { isDelete: false } },
//             ...userCarts,
//             {
//                 $lookup: {
//                     from: "products",
//                     localField: 'cartItem',
//                     foreignField: '_id',
//                     as: 'cartItem'
//                 }
//             },
//             { $set: { "cartItem": { $first: "$cartItem" } } }
//         ];

//         let carts = await CartModel.aggregate(aggregateQuery);

//         res.status(200).json(carts);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };




// //  GET CART
// export const getCart = async (req: Request, res: Response) => {
//     try {
//         let cartId = (req.query.cartId);
//         let cart = await CartModel.findById(cartId);   
//         if(!cart){
//             return res.status(404).json({ message: `No Cart Found with this ID`});
//         }
//         res.status(200).json(cart);  
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };


// //  UPDATE CART
// export const updateCart = async (req: Request, res: Response) => {
//     try {
//         let cart = await CartModel.findOne({_id: req.query.cartId , isDelete: false});
//         if (!cart) {
//             return res.status(404).json({ message: `No Cart Found with this ID`});
//         }
//         cart = await CartModel.findByIdAndUpdate(cart._id,{ ...req.body});
//         res.status(200).json({ cart, message: `Cart Item Updated SuccessFully.....`});
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };


// // DELETE CART
// export const deleteCart = async (req: Request, res: Response) => {
//     try {
//         let cart = await CartModel.findOne({_id: req.query.cartId});
//         if(!cart){
//             return res.status(404).json({ message: `No Cart Found with this ID`});
//         }
//         cart = await CartModel.findByIdAndUpdate(cart._id ,{isDelete: true});
//         // console.log("cart is :",cart);
        
//         res.status(200).json({message:`Cart Deleted Successfully......`}); 
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };