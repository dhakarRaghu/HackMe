import { Button } from "@/components/ui/button";
import { getALLBlogs } from "@/lib/query";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";


export default async function Home() {

  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getALLBlogs();
      setBlogs();
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
       

     
    </div>
  );
}
