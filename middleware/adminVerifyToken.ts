import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../schemas/user/userSchema";


declare global {
  namespace Express {
    interface Request {
      user?: any; 
      admin?: any; 
      isAdmin?: boolean; 
    }
  }
}

// ADMIN VERIFY TOKEN
export const adminVerifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorization = req.headers["authorization"];
    if (!authorization) {
      return res.status(401).json({ message: "Invalid Authorization" });
    }
    const token = authorization.split(" ")[1];
    console.log("Token is Backend side ===>",token);
    
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const payLoad: any = jwt.verify(token, process.env.SECRETE_KEY as string);
    console.log("payload ===> ",payLoad);
    
    const adminId = payLoad.adminId;
    console.log("admin id ==> ",adminId);
    const user = await UserModel.findOne({_id: adminId, isAdmin: true, isDelete: false});
    console.log("Req adminId ==> ",user);

    if (user) {
      req.admin = user;
      next();
      
    } else {
      return res.status(401).json({ message: "Invalid Admin (token)" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error From Admin Token" });
  }
};

// USER VERIFY TOKEN
export const userVerifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorization = req.headers["authorization"];
    if (!authorization) {
      return res.status(401).json({ message: "Invalid Authorization" });
    }
    const token = authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const payLoad: any = jwt.verify(token, process.env.SECRETE_KEY as string);
    const userId = payLoad.userId;
    const user = await UserModel.findOne({_id: userId, isAdmin: false, isDelete: false});

    if (user) {
      req.user = user;
      next();
    } else {
      return res.status(401).json({ message: "Invalid User (token)" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error From Admin Token" });
  }
};