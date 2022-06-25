import { NextFunction, Request, Response } from "express";
import asyncHandler from "../middleware/async.middleware";
import ErrorResponse from "../utils/error.util";
import response from "../utils/response.util";
import { loginUserInput, userInput } from "../schema/user.schema";
import {
  createUser,
  getUserByEmailWithPassword,
} from "../service/user.service";

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
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    //Check for password
    const isMatch = await user.comparePassword(body.password);

    if(!isMatch){
        return next(new ErrorResponse('Invalid credentials', 401))
    }

    //create token
    const token = user.getSignedJWT();

    const responseData = {
      user:{
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    }

    response(201, true, responseData, res);

  }
);
