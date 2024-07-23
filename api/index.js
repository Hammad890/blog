import callDb from "./helpers/db.js";
import  express, {json}  from "express";
import cors from "cors";
import userRouter from "./Routes/user.js"
import postRouter from "./Routes/post.js"
import cookieParser from "cookie-parser";
import path from 'path';
import 'dotenv/config';
import { fileURLToPath } from "url";

const app= express()
app.use(json())
callDb()

const secret = process.env.JWT_SECRET;

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}))

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cookieParser())
app.use("/users",userRouter)
app.use("/posts",postRouter)
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello from Vercel' });
  });

app.listen(5001, ()=>{
    console.log("App started")
}) 


