
import React, { useEffect } from 'react'
import { Button } from './components/ui/button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

type Todo = {
  id: string
  title: string
  content: string
  completed: boolean
}

const Home = () => {
  const [token, setToken] = React.useState('')
  const [userId , setUserId] = React.useState('')
  const [error , setError] = React.useState('')
  const [todo, setTodo] = React.useState([])
  const [add , setAdd] = React.useState(false)

  const navigator = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    setToken('')
    setUserId('')
    window.location.href = '/login'
  }
  useEffect(() =>
     setToken(localStorage.getItem('token')!)
  , [])
  useEffect(() =>
     setUserId(localStorage.getItem('userId')!)
  , [])


 async function getTodo() {
      try {
        const res = await axios.post('http://localhost:5001/api/todo/getAllTodo', { userId });
        console.log(res);
        setError('');
        setTodo(res.data.todos);
      }
      catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.log(err);
      }
    }

    const [title, setTitle] = React.useState('')
    const [content, setContent] = React.useState('')
  async function AddTodo() {
      try {
        const res = await axios.post('http://localhost:5001/api/todo/addTodo', { userId, title, content });
        console.log(res);
        setError('');
        setTitle('');
        setContent('');
        setAdd(true);
        getTodo(); // Refresh the todo list
      }
      catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.log(err);
      }
    }
  async function handelDelete(todoId: string) {
      try {
        const res = await axios.post('http://localhost:5001/api/todo/delete', {  todoId });
        console.log(res);
        setError('');
        getTodo(); // Refresh the todo list
      }
      catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.log(err);
      }
    }
  async function handelEdit(todoId: string) {
      try {
        const res = await axios.post('http://localhost:5001/api/todo/edit', {  todoId });
        console.log(res);
        setError('');
        getTodo(); // Refresh the todo list
      }
      catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.log(err);
      }
    }
    
    return (
    <div>

      {
        !token && 
        <div>
          <h1> Please login to access the home page </h1>
          <div className='flex gap-8 mt-8 px-16'>
          <Button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded gap-8 '>
            <a href='/login'>Login</a>
          </Button>
          <Button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded gap-8 '>
            <a href="/signup"> signup</a>
          </Button>
          </div>
        </div>
        
      }
      {token &&
        <div className='flex flex-between justify-center gap-80 mt-8 px-16'>
          <h1> Welcome to the home page</h1>
          <Button onClick={handleLogout} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded gap-8 '>
            Logout
          </Button>
        </div>
    }
        {userId && 
          <div>
            <Button onClick={getTodo} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded gap-8 '>
              Get Todo
            </Button>

            <div>
              {todo.map((item: Todo) => (
                <div key={item.id}>
                  <div className='flex flex-between justify-center gap-80 mt-8 px-16'>
                  <h1>{item.title}</h1>
                  <Button onClick={() => handelDelete(item.id)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded gap-8 '>
                    Delete
                  </Button>
                   {item.completed && <p className='text-green bg-green-400'>Completed</p>} 
                   {!item.completed && 
                  <Button onClick={() => handelEdit(item.id)} className='bg-red-500 text-red font-bold py-2 px-4 rounded gap-8 '>
                    completed ?
                  </Button>
                  }
                  </div>
                  <p>{item.content}</p>

                </div>
              ))}
            </div>

              <div className='flex flex-between justify-center gap-80 mt-8'>
              <input type="text"
            placeholder='title'
            className='flex text-center border-2 border-gray-300 p-2 m-2 w-40'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
            <input type="text"
            placeholder='content'
            className='flex text-center border-2 border-gray-300 p-2 m-2 w-40'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            />
              </div>
          
            <Button onClick={AddTodo} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded gap-8 '>
               Add Todo
            </Button>
          </div>
        }




    </div>
  )
}

export default Home