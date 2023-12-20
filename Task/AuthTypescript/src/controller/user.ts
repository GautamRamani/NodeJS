import { NextFunction, Request, Response } from "express";
import User from "../model/user";

async function user(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    let id = req.user._id;

    let user = await User.findOne({ _id: id })
    if (user) {
        let data = {
            name: user.name,
            email: user.email,
        }
        res.status(200).send({ data: data, success: true, msg: "user profile has been fetch successfuly" })
    } else {
        next(new Error("User not found"))
    }
}

export { user }