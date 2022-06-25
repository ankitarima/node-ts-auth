import { NextFunction, Request, Response } from "express";
import asyncHandler from "../middleware/async.middleware";
import userModel from "../model/user.model";
import { loginUserInput, userInput } from "../schema/user.schema";
import {
  createUser,
  getUserByEmailWithPassword,
} from "../service/user.service";
import ErrorResponse from "../utils/error.util";
import response from "../utils/response.util";

export const signup = asyncHandler(
  async (
    req: Request<{}, {}, userInput>,
    res: Response,
    next: NextFunction
  ) => {
    const body = req.body;

    const user = await createUser(body);

    response(201, true, { user }, res);
  }
);

export const login = asyncHandler(
  async (
    req: Request<{}, {}, loginUserInput>,
    res: Response,
    next: NextFunction
  ) => {
    const body = req.body;

    const user = await getUserByEmailWithPassword(body.email);

    if (!user) {
      return next(new ErrorResponse("Invalid credentials.User not found", 401));
    }

    //Check for password
    const isMatch = await user.comparePassword(body.password);

    if(!isMatch){
        return next(new ErrorResponse('Invalid credentials', 401))
    }

    response(201, true, { user }, res);
  }
);
