import { NextFunction, Request, Response } from 'express'
import User from '../model/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

async function Health(
    req: Request,
    res: Response
) {
    try {
        res.status(200).send({ data: "Health", msg: "Success" })
    } catch (error) {
        res.status(400).send({ data: {}, msg: "Error in Health" })
        console.log("Error in Health::");
    }
}

async function signUp(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { name, email, password } = req.body

    let user = await User.findOne({ email: email })
    if (!user) {
        let hashPassword = await bcrypt.hash(password, 10)
        user = await User.create({
            name,
            email,
            password: hashPassword
        })
        res.status(200).send({ data: {}, success: true, msg: "user register succesfully" })
    } else {
        next(new Error('User is not found'))
    }

}

async function login(
    req: Request,
    res: Response,
    next: NextFunction) {
    const { email, password } = req.body

    let isUser = await User.findOne({ email: email })
    if (!isUser) {
        res.status(400).send({ data: "email does not exist" })
    } else {

        let isPassword = await bcrypt.compare(password, isUser.password)
        if (isPassword) {
            let secret = process.env.SECRET as string;
            let token = jwt.sign({ id: isUser._id }, secret)

            let user = await User.findOneAndUpdate({ _id: isUser._id }, { $set: { token: token } })

            let data = {
                name: user?.name,
                email: user?.email
            }

            res.status(200).send({ data: data, success: true, msg: "user login succesfully" })
        } else {
            next(new Error("password does not match"))
        }
    }

}

export { Health, signUp, login }