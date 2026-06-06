import app from './app.js'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'


dotenv.config({
    path: "./src/.env"
})
connectDB()

app.use(cookieParser())
app.use(cors());

const port = process.env.PORT || 8000
app.listen(port,()=>{
    console.log(`Server running on http://localhost:${port}`);
})
