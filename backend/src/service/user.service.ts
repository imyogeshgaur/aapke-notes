import User from "../model/user.entity";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import passwordResetMail from "../helpers/mail.helper";
import { v1 } from "uuid";
import { config } from 'dotenv'
import { resolve } from 'path'
config({path:resolve("src/.env")})

class UserService {
    private user;
    constructor() {
        this.user = User;
    }
    async signUpUser(data: any) {
        try {
            const { userName, email, password } = data;
            if (!userName || !email || !password) {
                return { user: -1 };
            } else {
                const newPassword = await bcryptjs.hash(password, 12);
                const isExist = await this.user.findOne({
                    where: {
                        email
                    }
                });
                if (isExist) {
                    return { user: 0 };
                } else {
                    const newUser = await this.user.create({
                        userId: v1(),
                        ...data,
                        password: newPassword
                    });
                    const userToSave = await newUser.save()
                    return { user: userToSave }
                }
            }
        } catch (error) {
            console.log("User's Service Error : ", error)
        }
    }

    async loginUserByUserName(data: any) {
        try {
            const { email, password } = data;
            const isExist: any = await this.user.findOne({
                where: {
                    userName: email
                }
            })
            if (isExist) {
                const match = await bcryptjs.compare(password, isExist.password)
                if (match) {
                    const token = jsonwebtoken.sign({ userId: isExist.userId }, process.env.JWT_SECRET as string)
                    return { token }
                } else {
                    return { token: 0 };
                }
            } else {
                return { token: -1 };
            }
        } catch (error) {
            console.log("User's Service Error : ", error)
        }
    }
    async loginUserByEmail(data: any) {
        try {
            const { email, password } = data;
            const isExist: any = await this.user.findOne({
                where: {
                    email
                }
            })
            if (isExist) {
                const match = await bcryptjs.compare(password, isExist.password)
                if (match) {
                    const token = jsonwebtoken.sign({ userId: isExist.userId }, process.env.JWT_SECRET as string)
                    return { token }
                } else {
                    return { token: 0 };
                }
            } else {
                return { token: -1 };
            }
        } catch (error) {
            console.log("User's Service Error : ", error)
        }
    }

    async forgetPasswordEmail(email:string) {
        try {
            const isExist:any = await this.user.findOne({
                where:{
                    email
                }
            })
            if(isExist){
                return await passwordResetMail(isExist.email,isExist.userId)
            }else{
                return 0;
            }
        } catch (error) {
            console.log("User's Service Error : ", error)
        }
    }
    async forgetPasswordUserName(userName:string) {
        try {
            const isExist:any = await this.user.findOne({
                where:{
                    userName
                }
            })
            if(isExist){
                return await passwordResetMail(isExist.email,isExist.userId)
            }else{
                return 0;
            }
        } catch (error) {
            console.log("User's Service Error : ", error)
        }
    }

    async resetPassword(password:string,userId:string) {
        try {
            const newPassword = await bcryptjs.hash(password,12);
            const update = await this.user.update({
                password:newPassword
            },{
                where:{
                    userId
                }
            })
            return update
        } catch (error) {
            console.log("User's Service Error : ", error)
        }
    }
}

export default UserService