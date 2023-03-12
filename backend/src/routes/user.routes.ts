import { Router } from 'express'
import UserController from '../controller/user.controller';
import authorization from '../middleware/authorization.middleware';
const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
    try {
        const userController = new UserController(req, res);
        await userController.signUpUser();
    } catch (error) {
        console.log("User's Global Error : ", error)
    }
})

userRouter.post("/login", async (req, res) => {
    try {
        const userController = new UserController(req, res);
        await userController.loginUser()
    } catch (error) {
        console.log("User's Global Error : ", error)
    }
})

userRouter.post("/forgetPass", async (req, res) => {
    try {
        const userController = new UserController(req, res);
        await userController.forgetPassword();
    } catch (error) {
        console.log("User's Global Error : ", error)
    }
})

userRouter.post("/resetPass/:id", async (req, res) => {
    try {
        const userController = new UserController(req, res);
        await userController.resetPassword();
    } catch (error) {
        console.log("User's Global Error : ", error)
    }
})

export default userRouter