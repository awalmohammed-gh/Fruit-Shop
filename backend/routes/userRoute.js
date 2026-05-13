import express from "express"
import { register,logins, isAuth, logout, getUserData } from "../controller/userController.js"
import { usersAuth } from "../middleware/userAuth.js";

const userRouter = express.Router();

userRouter.post("/register", register)
userRouter.post("/login", logins)
userRouter.get("/is-auth", usersAuth, isAuth)
userRouter.post("/logout", usersAuth, logout);
userRouter.get("/user-data", usersAuth, getUserData);


export default userRouter