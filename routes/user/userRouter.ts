import { Router, Request, Response } from "express";
import * as userController from "../../controller/user/userController";
const userRouter: Router = Router();

// REGISTER USER
userRouter.post("/register-user", async (request: Request, response: Response) => {
    await userController.registerAdmin(request, response);
});

// Login USER
userRouter.post("/login", async (request: Request, response: Response) => {
    await userController.loginAdmin(request, response);
});

// Update USER
userRouter.put("/update-user", async (request: Request, response: Response) => {
    await userController.updateUser(request, response);
});

// DELETE USER
userRouter.delete("/delete-user", async (request: Request, response: Response) => { 
    await userController.deleteUser(request, response);
});

export default userRouter;
