import { NextFunction, Request, Response } from "express";
import asyncHandler from "../middleware/async.middleware";
import ErrorResponse from "../utils/error.util";
import response from "../utils/response.util";

export const user = asyncHandler(async(req:Request,res:Response)=>{
    const user = req.session;
    response(200,true,user,res);
})