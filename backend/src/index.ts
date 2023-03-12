import express, { json, urlencoded } from 'express'
import userRouter from './routes/user.routes';
import { config } from 'dotenv'
import { resolve } from 'path'
config({ path: resolve("src/.env") })
import connectDb from './database/db.config';
import notesRouter from './routes/notes.routes';
import cors from "cors"
const app = express();


connectDb(process.env.DB_URL as string)

app.use(urlencoded({ extended: true }))
app.use(json())
app.use(cors({
    origin:"http://localhost:5173"
}))
app.use("/users", userRouter)
app.use("/notes", notesRouter)

app.listen(3000);
