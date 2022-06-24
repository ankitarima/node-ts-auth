import express from "express";
import { signup } from "../controller/auth.controller";
import validate from "../middleware/validate.middleware";
import { userSchema } from "../schema/user.schema";

const router = express.Router();

router.post("/auth/signup", validate(userSchema),signup);

export default router;