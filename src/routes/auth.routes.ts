import express from "express";
import { login, signup } from "../controller/auth.controller";
import validate from "../middleware/validate.middleware";
import { loginUserSchema, userSchema } from "../schema/user.schema";

const router = express.Router();

router.post("/auth/signup", validate(userSchema),signup);
router.post("/auth/login", validate(loginUserSchema),login);

export default router;