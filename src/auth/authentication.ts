import jwt from 'jsonwebtoken'
import express, {Response, NextFunction } from 'express'
import  RequestInterface  from '../interfaces/interface'

function userAuthentication(
    req: RequestInterface,
    res: Response,
    next: NextFunction
) {
    const jwtToken = req.cookies.token || req.headers.token;
    if (!jwtToken) {
        return res.status(401).json({
            status: "unauthenticatedUser",
            message: "Please login to have access to this app"
        })
    }
    try {
        const userAuthentication = jwt.verify(
            jwtToken.toString(),
            process.env.ACCESS_TOKEN_SECRET as string
        )
        req.user = userAuthentication;
        next();

    } catch(err) {
        res.status(401).json({
            status: "Failed",
            message: "Invalid token"
        })
    }
}

export default userAuthentication