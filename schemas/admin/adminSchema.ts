import mongoose from "mongoose";
import { IUser } from "../../models/IUser";

const adminSchema = new mongoose.Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female'], required: true },
  email: { type: String, required: true, unique: true },
  dateOfBirth: { type: Date , required: true },
  password: { type: String, required: true },
  mobileNo: { type: Number, required: true, unique: true },
  isAdmin: { type: Boolean, default: true },
  isdelete: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { versionKey: false });

const AdminModel = mongoose.model('admin', adminSchema);

export default AdminModel;
