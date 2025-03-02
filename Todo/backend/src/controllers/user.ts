import { Request, Response } from "express";
import { prisma } from "../db/index";
import jwt from "jsonwebtoken";


export const LoginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
       res.status(400).json({ message: "User not exists" });
    }
    if (user!.password !== password) {
       res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id : user!.id ,email : user!.email }, 
      process.env.JWT_SECRET as string,
      {
      expiresIn: "7h",
      }
    );

     res.status(200).json({ message: "Login success" , token  , userId : user!.id });
  } catch (err) {
     res.status(500).json({ message: "Internal server error" });
  }
}

export const createUser = async (req: Request, res: Response) : Promise<void> => {
  const { email, password } = req.body;
  console.log("back" ,email, password);

  try {
    const already = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (already) {
       res.status(400).json({ message: "User already exists" });
    }
    const user = await prisma.user.create({
      data: {
        email,
        password,
      },
    });
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'User creation failed' });
  }
};

export const getAllTodo = async (req: Request, res: Response) => {
  const userId = req.body.userId;
  try {
    const todos = await prisma.todo.findMany({
      where: {
        userId: userId,
      },
    });
    console.log(todos);
    return res.status(200).json({ message: "Login success" ,  todos });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

export const addTodo = async (req: Request, res: Response) => {
  const{ userId  , title , content }= req.body;

  try {
    const todo = await prisma.todo.create({
      data: {
        userId: userId,
        title: title,
        content: content,
      },
    });
    console.log(todo);
    return res.status(200).json({ message: "Login success" , });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}


export const deleteTodo = async (req: Request, res: Response) => {
  const { todoId }= req.body;

  try {
    const todo = await prisma.todo.delete({
      where : {
        id : todoId
      }
    });
    return res.status(200).json({ message: "delete success" , });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

export const editTodo = async (req: Request, res: Response) => {
  const{ todoId }= req.body;

  try {
    const todo = await prisma.todo.findFirst({
      where :{
        id : todoId
      }
    });
    await prisma.todo.update({
      where : {
        id : todoId
      },
      data : {
        completed : todo?.completed
      }
    });
    console.log(todo);
    return res.status(200).json({ message: "complete success" , });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}