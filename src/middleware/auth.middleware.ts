import { NextFunction, Request, Response } from "express";
import ErrorResponse from "../utils/error.util";
import asyncHandler from "./async.middleware";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "config";
import { getUserById } from "../service/user.service";

export const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if ( req.headers.authorization && req.headers.authorization.startsWith("Bearer") ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(new ErrorResponse("Not authorized", 401));
    }

    try {
      //verify token
      const JWT_SECRET = config.get<string>("JWT_SECRET");
      const decoded = <JwtPayload>jwt.verify(token, JWT_SECRET);

     /**
      * !important
      * session type is extended from Request in util.d.ts and included in tsconfig
      */
      req.session = await getUserById(decoded.id);

      next();
    } catch (err) {
      return next(new ErrorResponse("Not authorized", 401));
    }
  }
);

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {

    if (!roles.includes(req.session.role) && req.session.role != "admin") {
      return next(  new ErrorResponse(`${req.session.role} is not authorized`, 401));
    }

    next();
  };
};
