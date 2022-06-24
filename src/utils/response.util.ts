import { Response } from "express";

const response = (
  statusCode: number,
  status: boolean,
  payload: any,
  res: Response,
) => {
  res.status(statusCode).json({ success: status, data: payload });
};

export default response;
