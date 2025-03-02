import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [success, setsuccess] = React.useState(false);

  async function handleLogin() {
    console.log(username, password);
    try {
      const res = await axios.post('http://localhost:5001/api/user/login', { email: username, password });
      console.log(res);
      setsuccess(true);
      setError('');
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.userId);
      setTimeout(() => {
      navigate('/'),
      1000
      });
    } catch (err) {
      console.log(err);
      setError('Invalid username or password');
    }
  }

  return (
    <div>
      <h1 className='text-3xl '>Login Page</h1>
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
          Login
        </Button>
      </div>
      {error && <p className='text-red-500 text-center mt-4'>{error}</p>}
      {success && <p className='text-green-500 text-center mt-4'>Login Success</p>}
    </div>
  );
};

export default Login;