import { Request, Response } from 'express'
let handler = (
    error: any,
    req: Request,
    res: Response,
    next: any
) => {
    const statusCode = 404 || 500 || error.status
    const message = error.message || "Something went wrong"
    res.send({
        message,
        status: "error",
        success: false,
        statusCode
    })
}

export default handler;