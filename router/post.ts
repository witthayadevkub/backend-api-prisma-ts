const express = require("express");
import { PrismaClient } from '@prisma/client';
import type { Request, Response } from 'express';
import fs from 'fs';
import multer, { Multer } from 'multer';

//middleware
const { Auth } = require("../middleware/auth")
//upload post image
const { upload } = require("../middleware/upload")

const prisma = new PrismaClient()
const router = express.Router();

//getAll
router.get('/post', Auth, async (req: Request, res: Response) => {
    try {
        const allPost = await prisma.post.findMany({
            include: {
                author: true
            },
            orderBy: {
                created: 'desc' // Assuming createdAt is the name of the column representing the creation date
            }
        })
        return res.json(allPost)
    } catch (error) {
        res.status(500).json({ error: error })
    }

})

//getById
router.get('/post/:id', Auth, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const getById = await prisma.post.findUnique({
            where: { id }
        })
        if (!getById) {
            return res.status(404).json({ message: 'post not found' })
        }
        return res.json(getById)

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

//create
// {
//         "authorId": "cltexp5tf000012u3haw99530",
//         "title": "new title",
//         "content": "new content"
//         "picture": ""
// }


router.post('/post', Auth, upload.single('picture'), async (req: Request, res: Response) => {
    try {
        interface PostData {
            authorId: string;
            title: string;
            content: string;
            picture: string
        }
        // const { authorId, postData }: RequestBody = req.body;
        const { authorId, title, content }: PostData = req.body;
        const picture = req.file?.filename
        // console.log(picture)
        const newPost = {
            authorId,
            title,
            content,
            picture
        }
        // console.log(newPost)
        const post = await prisma.post.create({
            data: {
                ...newPost
            }
        })

        res.json(post);

    } catch (error) {
        console.error(error);
        res.sendStatus(500).json({ message: error })
    }
})

router.put('/post/:id', Auth, async (req: Request, res: Response) => {
    try {
        const { title, content }: { title: string, content: string } = req.body
        const { id } = req.params
        if (!title || !content) {
            return res.status(404).json({ message: "must title,content require" })
        }
        const edit = await prisma.post.update({
            where: { id },
            data: { title, content }
        })
        return res.json(edit)
    } catch (error) {
        res.status(500).json({ at: "update post", error: error })
    }
})
router.delete('/post/:id', Auth, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const remove = await prisma.post.delete({
            where: { id },
        })

        //delete post image from path and database
        const filePath = `./images/post-images/${remove.picture}`;
        if (remove.picture) {
            fs.unlink(filePath, (err: NodeJS.ErrnoException | null) => {
                if (err) {
                    console.error("Error deleting file:", err);
                    return;
                }
                console.log("File deleted successfully");
            });
        }

        return res.json({ value: "delete successfully" })
    } catch (error) {
        res.status(500).json({ error: error })
    }

})




module.exports = router;