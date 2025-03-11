'use server'

import { prisma } from "@/lib/db";

export async function saveBlog(blog: { title: string; content: string; username: string }) {
    const { title, content, username } = blog;

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

        return data.content;
    } catch (err: any) {
        if (err.code === "P2002") {
            throw new Error("Username already exists");
        }
        throw new Error("Failed to create blog");
    }
}

export async function getALLBlogs() {
    try {
        const data = await prisma.blog.findMany();
        console.log(data);
        return data;
    }
    catch (err) {
        throw new Error("Failed to fetch blogs");
    }
}
