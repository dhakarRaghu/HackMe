import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const navigator = useNavigate();

  async function handleLogin() {
    console.log(username, password);
    try {
      const res = await axios.post('http://localhost:5001/api/user/signup', { email: username, password });
      setTimeout(() => {
        navigator('/login'),
        1000
        });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h1 className='text-3xl '>Signup Page</h1>
      <div className='flex flex-col px-16 mt-8'>
        <Input
          type="text"
          placeholder='username'
          className='flex text-center border-2 border-gray-300 p-2 m-2 w-40'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder='password'
          className='flex text-center border-2 border-gray-300 p-2 m-2 w-40'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 w-40 rounded'>
          signup
        </Button>
      </div>
    </div>
  );
};

export default Signup;