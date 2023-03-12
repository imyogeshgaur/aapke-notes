import { Request, Response } from "express"
import decodeUser from "../helpers/decodeUser.helper";
import UserService from "../service/user.service";

class UserController {
    private req: Request;
    private res: Response;
    private service: UserService;
    constructor(request: Request, response: Response) {
        this.req = request;
        this.res = response;
        this.service = new UserService();
    }

    async signUpUser() {
        try {
            const data = this.req.body;
            const value: any = await this.service.signUpUser(data);
            switch (value.user) {
                case -1:
                    return this.res.status(200).send({ message: "Please Fill ALl Data !!!" })
                case 0:
                    return this.res.status(200).send({ message: "User already exist !!!" })
                default:
                    return this.res.status(200).send({ message: "Welcome to our Platform !!!", user: value.user })
            }
        } catch (error) {
            console.log("User's Controller Error : ", error)
        }
    }

    async loginUser() {
        try {
            const email = this.req.body.email;
            if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
                const value: any = await this.service.loginUserByEmail(this.req.body);
                switch (value.token) {
                    case -1:
                        return this.res.status(200).send({ message: "Invalid Credentials !!!", token: value.token })
                    case 0:
                        return this.res.status(200).send({ message: "Invalid Credentials !!!", token: value.token })
                    default:
                        return this.res.status(200).send({ token: value.token })
                }
            } else {
                const value: any = await this.service.loginUserByUserName(this.req.body);
                switch (value.token) {
                    case -1:
                        return this.res.status(200).send({ message: "Invalid Credentials !!!", token: value.token })
                    case 0:
                        return this.res.status(200).send({ message: "Invalid Credentials !!!", token: value.token })
                    default:
                        return this.res.status(200).send({token: value.token })
                }
            }
        } catch (error) {
            console.log("User's Controller Error : ", error)
        }
    }

    async forgetPassword() {
        try {
            const email = this.req.body.email;
            if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
                const value: any = await this.service.forgetPasswordEmail(email);
                switch (value.token) {
                    case 0:
                        return this.res.status(200).send({ message: "Invalid Credentials !!!", })
                    default:
                        return this.res.status(200).send({ message: value.message })
                }
            } else {
                const value: any = await this.service.forgetPasswordUserName(email);
                switch (value) {
                    case 0:
                        return this.res.status(200).send({ message: "Invalid Credentials !!!", value })
                    default:
                        return this.res.status(200).send({ message: value.message })
                }
            }
        } catch (error) {
            console.log("User's Controller Error : ", error)
        }
    }

    async resetPassword() {
        try {
            const password = this.req.body.password;
            const userId = this.req.params.id;
            const data: any = await this.service.resetPassword(password, userId);
            if (data[0]) {
                return this.res.status(200).send({ message: "Password Reset Successfully !!!" })
            } else {
                return this.res.status(200).send({ message: "Password Not Reset Successfully !!!" })
            }
        } catch (error) {
            console.log("User's Controller Error : ", error)
        }
    }
}

export default UserController