"use client"

import { Button } from "@/components/ui/button";
import { saveBlog } from "@/lib/query";
import { use, useEffect, useState } from "react";

export default function CreateBlog() {
   const [title , setTitle] = useState("");
   const [content , setContent] = useState("");
   const [author , setAuthor] = useState("");
   console.log(title , content , author)

//    async function handleSubmit() {
//     if (!title || !content || !author) {
//         alert("Please fill all fields");
//         return;
//     }
//     try {
//         setSession(author);
//         const res = await saveBlog({ title, content, username: author });
//         alert(res);
//     } catch (err) {
//         console.error(err);
//         alert("Failed to create blog.");
//     }
// }
  
const handleSubmit = async () => {
  setContent(document);
  if (!title || !content || !author) {
    alert("Please fill all fields");
    return;
  }
  try {
    const res = await fetch("/api/saveblog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content, username: author }),
    });
    const data = await res.json();
    console.log("Response:", data);
    alert(data.message || "Blog created successfully!");
    setTitle("");
    setContent("");
    setAuthor("");
  } catch (err) {
    console.error("Error:", err);
    alert("Failed to create blog.");
  }
};

  const [document , setDocument] = useState("");
  const [socket , setSocket] = useState<WebSocket | null>(null);
  useEffect(()=>{
    const ws = new WebSocket("ws://localhost:5001");
     setSocket(ws);
      ws.onopen = () =>{
        console.log("connected to server");
      }

      ws.onmessage = (e) =>{
          try {
            const message = JSON.parse(e.data);

            if(message.type === "init"){
              setDocument(message.data);
            }
            else if(message.type === "update"){
               setDocument(message.data);
            }
          }
          catch (err) {
            console.error(err);
          }
      }
       ws.onclose = () =>{
          console.log("disconnected");
        }
        ws.onerror = (err) =>{
          console.error(err);
        }

        return () => {
          ws.close();
        }
      
    } , []);

  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>{
    const data = e.target.value;
    setDocument(data);
    if(socket  && socket.readyState === socket.OPEN){
      socket.send(JSON.stringify({type: "update" , data 
      }));
    }
  }

  return (
     <div>
      <h1 className="text-4xl text-center mt-4 font-bold">Blogging website heehehe</h1>
      <h1 className="text-3xl text-center mt-4 font-bold">with you friends</h1>

      <div className="text-2xl  mt-8 py-2 px-6 ">
        create  your blog
      </div>

      <div className="text-2xl  mt-8 py-2 px-6 gap-4">
        title : <input type="text" placeholder="Title" className="border-2 border-gray-300 px-6 rounded-md p-2"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        />
      </div>
      <div className="text-2xl  mt-8 py-2 px-6 gap-4">
         <input type="text" placeholder="author" className="border-2 border-gray-300 px-6 rounded-md p-2"
        onChange={(e) => setAuthor(e.target.value)}
        value={author}
        />
      </div>
       
      <div className="text-2xl  mt-8 py-3 px-6 gap-4">
        <textarea placeholder="Content" className="border-2 border-gray-300 w-160 h-60 px-6 rounded-md p-2"
        onChange={handleChange}
        // onChange={(e) => {
        //   setContent(e.target.value);
        // }}
        value={document}
        />
       
      </div>

      <Button variant="secondary" size="lg" className="mt-8 py-2 px-6 translate-x-1/2" onClick={handleSubmit}>
         create
      </Button>


    </div>

  );
}

function setSession(author: string) {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("author", author);
  }
}
