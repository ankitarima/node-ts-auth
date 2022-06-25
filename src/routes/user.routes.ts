import express from "express";
import { authorize, protect } from "../middleware/auth.middleware";
import { user } from "../controller/user.controller";

const router = express.Router();

router.get('/user',protect,authorize('manager'), user);

export default router;