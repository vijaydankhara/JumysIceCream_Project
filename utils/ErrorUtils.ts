import { Response } from "express";

export const ThrowError = (response: Response, statusCode: number = 500, msg: string = 'Server Error') => {
  return response.status(statusCode).json({
    message: msg,
    data: null,
  });
};
