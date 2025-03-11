"use client"
import { Button } from "@/components/ui/button";
import { getALLBlogs } from "@/lib/query";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Blog {
  id: number;
  title: string;
  content: string | null;
  username: string;
  updatedAt: Date;
}

export default function Home() {

  const [blogs, setBlogs] = useState<Blog[]>([]);   // like vector of vector
  useEffect(() => {
    const fetchData = async () => {
      const data = await getALLBlogs();
      setBlogs(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-4xl text-center mt-4 font-bold">Blogging website heehehe</h1>
      <h1 className="text-3xl text-center mt-4 font-bold">with you friends</h1>
      <div>
        <Link href="/create">
          <Button variant="secondary" size="lg" className="mt-8 py-2 px-6 translate-x-1/2">
            create blog
          </Button>
        </Link>
      </div>

      {blogs && blogs.map((blog) =>{
        return (
          <div>
          <div key={blog.id} className="flex justify-center mt-8">
            <div className="w-1/2 flex flex-between justify-between bg-gray-800 p-4 ">
              <h1 className="text-2xl font-bold">title : {blog.title}</h1>
              <p className="text-sm text-white">by {blog.username}</p>
              <p className="text-sm text-white">Last updated: {blog.updatedAt.toLocaleDateString()}</p>
              </div>
             </div>
              <div className="flex justify-center">
              <p className=" p-4 w-1/2 flex flex-between justify-between bg-gray-800 p-4 ">
                Content: {blog.content}</p>
            </div>

          </div>
        );
      })}
       
    </div>
  );
}
