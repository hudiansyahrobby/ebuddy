import { Response } from "express";

export const sendSuccessResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data: any = null
) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const sendErrorResponse = (
  res: Response,
  statusCode: number,
  message: string,
  details: any = null
) => {
  res.status(statusCode).json({
    success: false,
    message,
    details,
  });
};
