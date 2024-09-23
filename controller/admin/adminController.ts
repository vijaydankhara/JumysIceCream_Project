import { Request, Response,response} from "express";
import bcrypt from "bcrypt";
import AdminModel from "../../schemas/admin/adminSchema";
import { IUser } from "../../models/IUser";
import { ThrowError } from "../../utils/ErrorUtils";


// REGISTER ADMIN
export const registerAdmin = async (request: Request, response: Response) => {
  try {
    let { firstName, lastName, gender, email, password, mobileNo } =
      request.body;

    let adminobj = await AdminModel.findOne({ email: email });

    if (adminobj) {
      return response
        .status(401)
        .json({ message: "Admin Is Alredy Exist...." });
    }
    // hash password
    const salt = await bcrypt.genSalt(11);
    const hashPassword = await bcrypt.hash(password, salt);

    // create user
    let newAdmin: IUser = {
      firstName: firstName,
      email: email,
      lastName: lastName,
      gender: gender,
      mobileNo: mobileNo,
      password: hashPassword,
      isAdmin: true,
    };

    let admin = await new AdminModel(newAdmin).save();
    if (admin) {
      return response.status(201).json({ message: "Register Sucessfully..." });
    }
  } catch (error) {
    return ThrowError(response);
  }
};


