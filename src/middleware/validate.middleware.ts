import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import log from "../utils/logger.util";
import response from "../utils/response.util";

const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e: any) {
      log.error(e.errors);
      response(400,false,e.errors,res);
    }
  };

export default validate;
