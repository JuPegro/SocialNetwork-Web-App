import { Router } from "express";

// INITIALIZE ROUTER
const router = Router();

// IMPORT CONTROLLER [AUTH]
import * as authCtrl from "../controllers/auth.controller.js";

router.post("/signup", authCtrl.signUp); // NEW USER REGISTER

router.post("/signin", authCtrl.signIn) // LOGIN 

router.put("/active/user/:id", authCtrl.activationUser) // ACTIVATE USER

export default router;
