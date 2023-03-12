import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

const authorization = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: any = req.headers.authorization;
        const verifyToken = verify(token, process.env.JWT_SECRET as string);
        if (verifyToken) {
            next();
        } else {
            return res.status(401).send({ message: "Not Authorized !!!" })
        }
    } catch (error) {
        console.log("Authorization Error : ", error)
    }
}

export default authorization;