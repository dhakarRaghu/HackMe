import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    const { title, content, username } = await req.json();
   console.log(title, content, username);
       if (!title || !content || !username) {
           throw new Error("Please fill all fields");
       }
   
       try {
           const data = await prisma.blog.create({
               data: {
                   title,
                   content,
                   username,
                   updatedAt: new Date(),
               },
           });
     
           return NextResponse.json(data);
       } catch (err: any) {
           if (err.code === "P2002") {
               return  NextResponse.json("Username already exists");
           }
           return  NextResponse.json("Failed to create blog");
       }
}