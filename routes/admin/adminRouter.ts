import { Router, Request, Response } from "express";
import * as adminController from "../../controller/admin/adminController";
const adminRouter: Router = Router();



// REGISTER ADMIN
adminRouter.post("/register-admin",async (request: Request, response: Response) => {
    await adminController.registerAdmin(request, response);});






export default adminRouter;