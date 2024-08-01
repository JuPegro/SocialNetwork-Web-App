import { Router } from "express";

// INITIALIZE ROUTER
const router = Router();

// IMPORT CONTROLLER [AUTH]
import * as authCtrl from "../controllers/auth.controller.js";

router.post("/signup", authCtrl.signUp); // NEW USER REGISTER

export default router;
