import { NextFunction, Request, Response } from "express";
import asyncHandler from "../middleware/async.middleware";
import { userInput } from "../schema/user.schema";
import { createUser } from "../service/user.service";
import ErrorResponse from "../utils/error.util";
import response from "../utils/response.util";

export const signup = asyncHandler(
  async (req: Request<{},{},userInput>, res: Response, next: NextFunction) => {

    const body = req.body;

    const user = await createUser(body);

    // return  next(new ErrorResponse('Please provide email and password', 400));

    response(201,false,{user},res);
  }
);
