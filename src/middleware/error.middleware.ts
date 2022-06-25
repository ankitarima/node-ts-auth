import { NextFunction, Request, Response } from "express";
import ErrorResponse from "../utils/error.util";
import log from "../utils/logger.util";

const errorHandler = ( err: any, req: Request, res: Response, next: NextFunction ) => {

  let error = { ...err };
  console.log(err);
  

  log.error(err.message);

  error.message = err.message;

  if (err.name === "CastError") {
    error = new ErrorResponse(`Resource not found`, 404);
  }

  // error handling for duplicate entry
  if (err.code === 11000) {
    error = new ErrorResponse(`Duplicate entry`, 400);
  }

  if (err.name === "ValidationError") {
    const message = <any>(
      Object.values(err.errors).map((val: any) => val.message)
    );
    error = new ErrorResponse(message, 400);
  }

  // custom error code and message generator
  res
    .status(error.statusCode || 500)
    .json({ sucess: false, data: error.message || " Server Error" });
};

export default errorHandler;
