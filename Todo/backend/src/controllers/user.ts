import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const LoginUser = async (req: Request, res: Response) =>  {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(400).json({ message: "User not exists" });
    }
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }
    return res.status(200).json({ message: "Login success" });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const createUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'User creation failed' });
  }
};