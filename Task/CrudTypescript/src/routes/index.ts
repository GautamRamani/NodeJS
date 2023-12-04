import express from 'express'
import { Health, signUp, login } from "../controller/auth"
import { user } from "../controller/user"
import { authMiddleware } from '../middleware/authorization'

const router = express.Router()

//health
router.get("/", Health);

//auth
router.post("/register", signUp);
router.post("/login", login);

//user page
router.post("/user", authMiddleware, user)

export default router;