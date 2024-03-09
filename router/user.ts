const express = require("express");
import { PrismaClient } from '@prisma/client';
import type { Request, Response } from 'express';
const { Auth } = require("../middleware/auth")
const prisma = new PrismaClient()
const router = express.Router();

interface User {
    id: string;
    email: string;
    name: string
    avatar: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}
//current user
router.get("/user/current", Auth, async (req: Request, res: Response) => {
    try {
        const currentUser = await req.user
        const user = await prisma.user.findUnique({
            where: {
                id: currentUser?.id,
            },
            select: {
                id: true,
                avatar: true,
                name: true,
                email: true,
                posts: true,
                created: true
            }
        })
        return res.json(user)
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

//getAll
router.get('/user', Auth, async (req: Request, res: Response) => {
    try {
        const currentUserId = req.user?.id
        const allPost = await prisma.user.findMany({
            // include: {
            //     posts: true
            // }
            where: {
                id: { not: currentUserId }
            },
            select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                posts: true,
            },
        })
        return res.json(allPost)
    } catch (error) {
        res.status(500).json({ error: error })
    }

})

router.get('/user/test',  async (req: Request, res: Response) => {
    try {
        const allPost = await prisma.user.findMany({
            // include: {
            //     posts: true
            // }
            where: {
                name:"user-test"
            },
            select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                posts: true,
            },
        })
        return res.json(allPost)
    } catch (error) {
        res.status(500).json({ error: error })
    }

})
//getUsetById
router.get("/user/:id", Auth, async (req: Request, res: Response) => {
    try {
        const userId: string = req.params.id
        const user = await prisma.user.findUnique({
            where: { id: userId, },

            // include: { posts: true }
            select: {
                id: true,
                avatar: true,
                name: true,
                email: true,
                posts: {
                    orderBy: {
                        created: 'desc' 
                    }
                },

                // posts: {
                //     select:{
                //         author: true,
                //     }
                // },
                // created: true
            },

        })
        return res.json(user)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

//update name user
router.put('/user/:id', Auth, async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { name }: { name: string } = req.body
        const updateUser = await prisma.user.update({
            where: { id },
            data: { name: name }
        })
        return res.status(200).json(updateUser)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.delete('/user/:id', Auth, async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        await prisma.user.delete({
            where: { id }
        })
        return res.status(200).json({ message: "User deleted successfully" })
    } catch (error) {
        res.status(500).json({ at: "delete user", error: error })
    }
})


module.exports = router;