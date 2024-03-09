const express = require("express");
import { PrismaClient } from '@prisma/client';
import type { Request, Response } from 'express';

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient()
const router = express.Router();


router.post('/register', async (req: Request, res: Response) => {
    try {
        const { email, password, username }: { email: string, password: string, username: string } = req.body
        const checkUser = await prisma.user.findUnique({
            where: { email }
        })

        const photoBoy =  `https://avatar.iran.liara.run/public/boy?username=${username}`;
        // const photogirl = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        if (checkUser) {
            return res.json({ message: "user already go login" })
        }

        //เข้ารหัส password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword: string = await bcrypt.hash(password, salt)

        //เพิ่ม newUser เข้าใน db
        const newUser = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
                name: username,
                avatar: photoBoy
            }
        })

        return res.status(200).json(newUser)

    } catch (error) {
        res.status(500).json({ at: '/register', error: error })
    }
})

router.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password }: { email: string, password: string } = req.body
        const user = await prisma.user.findUnique({
            where: { email }
        })

        if (!user) {
            return res.status(404).json({ message: 'user not found go register' })
        }

        const passwordMatch: boolean = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return res.status(400).json({ message: "password invalid" })
        }

        const token = await jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
            expiresIn: "5d"
        })

        res.cookie("token", token, {
            maxAge: 15 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            // sameSite: "strict",
            sameSite: "none",
        })
        res.status(200).json({ token: token, id: user.id })

    } catch (error) {
        res.status(500).json({ at: "/login", error: error })
    }
})

router.post('/logout', async (req: Request, res: Response) => {
    try {
        // Clear the 'token' cookie
    //    await res.cookie("token", "", { maxAge: 0 });
        res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'none' });

        // Send a response indicating successful logout
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
   
        res.status(500).json({ message: 'Internal server error', error });
    }
});











module.exports = router;