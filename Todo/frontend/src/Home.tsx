
import { Button } from './components/ui/button'

const Home = () => {
  return (
    <div>
      <h1 className='text-3xl '> Home Page for login and other stuff </h1>
      <div className='flex gap-8 mt-8 px-16'>
      <Button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded gap-8 '>
        <a href='/login'>Login</a>
      </Button>
      <Button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded gap-8 '>
        <a href="/signup"> signup</a>
      </Button>
      </div>


    </div>
  )
}

export default Home