export interface IUser{
    firstName?: string;
    lastName?: string;
    gender?: string;
    email?: string;
    dateOfBirth?: Date;
    password?: string;
    mobileNo?:number;
    isAdmin?: boolean;
    isdelete?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}