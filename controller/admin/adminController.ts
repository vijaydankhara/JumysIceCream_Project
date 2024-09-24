import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";

import AdminModel from "../../schemas/admin/adminSchema";
import { IUser } from "../../models/IUser";
import { ThrowError } from "../../utils/ErrorUtils";

// REGISTER ADMIN
export const registerAdmin = async (request: Request, response: Response) => {
  try {
    const { firstName, lastName, gender, email, password, mobileNo,dateOfBirth } =
      request.body;

    // Validate if all fields are provided
    if (!firstName || !lastName || !gender || !email || !password || !mobileNo || !dateOfBirth) {
      return response.status(400).json({ message: "All fields are required." });
    }

    // Check if admin already exists
    let adminobj = await AdminModel.findOne({ email: email });
    if (adminobj) {
      return response.status(409).json({ message: "Admin already exists." });
    }

    // Hash password
    const salt = await bcrypt.genSalt(11);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create new admin
    let newAdmin: IUser = {
      firstName: firstName,
      email: email,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      gender: gender,
      mobileNo: mobileNo,
      password: hashPassword,
      isAdmin: true,
    };

    let admin = await new AdminModel(newAdmin).save();
    if (admin) {
      return response.status(201).json({ message: "Registered successfully." });
    }
  } catch (error) {
    return ThrowError(response);
  }
};

