const jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

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

exports.Auth = async (req:Request, res:Response, next:NextFunction) => {
  try {

    const token:string = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized No token" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }


    const user = await prisma.user.findUnique({
        where:{email: decoded.email},
        select:{id:true, email:true, name:true,avatar:true}
    })
    // console.log(user)
    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute", error);
    res.status(500).json({error:error});
  }
};