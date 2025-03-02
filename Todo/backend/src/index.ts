import express from 'express'

import dotenv from 'dotenv'
import appRoutes from './routes'
import cors from 'cors'
const app = express()
app.use(cors())
app.use(cors({origin: "http://localhost:5173", credentials: true})); 

dotenv.config()
app.use(express.json())

app.use('/api' , appRoutes)

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
