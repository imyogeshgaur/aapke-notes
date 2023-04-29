import express, { json, urlencoded } from 'express'
import { config } from 'dotenv'
import { resolve } from 'path'
config({ path: resolve("src/.env") })
import connectDb from './database/db.config';
import cors from "cors"
import Routers from './routes/Router'
const app = express();


connectDb(process.env.DB_URL as string)

app.use(urlencoded({ extended: true }))
app.use(json())
app.use(cors({
    origin:"http://localhost:5173"
}))
app.use("/users", Routers.userRouter)
app.use("/notes", Routers.notesRouter)

app.listen(3000);
