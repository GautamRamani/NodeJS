import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";
import User from "../model/user";

export async function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const authHeaders: any = req.headers.authorization;
        const secret = process.env.SECRET as string;

        const data: any = Jwt.verify(authHeaders, secret)

        let user = await User.findOne({ _id: data.id })
        
        if (!user) {
            throw new Error("token has been expired")
        }
        next();
        return true;
    } catch (error) {
        console.log(error);
        next(error)
    }
}