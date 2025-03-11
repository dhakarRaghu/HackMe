import { prisma } from "../db";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const LoginUser = async (req: Request, res: Response): Promise<Response> => { 
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ message: "User not exists" });
    }
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email }, 
      process.env.JWT_SECRET as string,
      { expiresIn: "7h" }
    );

    return res.status(200).json({ message: "Login success", token, userId: user.id });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const getAllTodo = async (req: Request, res: Response): Promise<Response> => {
  const userId = req.body.userId;
  try {
    const todos = await prisma.todo.findMany({ where: { userId } });
    console.log(todos);
    return res.status(200).json({ message: "Success", todos });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

export const addTodo = async (req: Request, res: Response): Promise<Response> => {
  const { userId, title, content } = req.body;
  try {
    const todo = await prisma.todo.create({
      data: { userId, title, content },
    });
    console.log(todo);
    return res.status(200).json({ message: "Todo added successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

export const deleteTodo = async (req: Request, res: Response): Promise<Response> => {
  const { todoId } = req.body;
  try {
    await prisma.todo.delete({ where: { id: todoId } });
    return res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

export const editTodo = async (req: Request, res: Response): Promise<Response> => {
  const { todoId } = req.body;
  try {
    await prisma.todo.update({
      where: { id: todoId },
      data: { completed: true },
    });
    return res.status(200).json({ message: "Todo marked as complete" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
