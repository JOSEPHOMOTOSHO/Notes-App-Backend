import userModel from '../model/signupModel'
import express, { Request, Response, NextFunction } from 'express'
import Joi  from 'joi'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'


dotenv.config();

async function signIn(req: Request, res: Response, next: NextFunction) {
    const validateSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(7).max(20).required()
    })

    const validationResult = await validateSchema.validate(req.body)
        if (validationResult.error) {
            return res.status(400).json({
                status: "Not Found",
                message: validationResult.error.details[0].message
            })
        }

        const existingUser = await userModel.findOne({
            email: req.body.email,
        }).select("+password")

        if(!existingUser) {
            return res.status(404).json({
                status: "Not found",
                message: "Account user does not exist"
            })
        }

        const passwordisValid = await bcrypt.compare(
            req.body.password,
            existingUser.password
        )

        if (!passwordisValid) {
            return res.status(400).json({
                status: "Not Found",
                message: "Invalid password"
            })
        }

        const token = jwt.sign(
            { user_id: existingUser._id, user_email: existingUser.email} ,
            process.env.ACCESS_TOKEN_SECRET as string,
            {
                expiresIn: process.env.ACCESS_EXPIRES
            }
        )
        // res.cookie("token", token, { httpOnly: true})
        res.clearCookie("token")

        res.status(200).json({
            status: "Successful",
            message: "Signed in sucessfully",
            token
        })
}


export default signIn;
