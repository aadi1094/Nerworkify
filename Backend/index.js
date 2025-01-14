import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import userRouter from "./routes/user.router.js"

dotenv.config()
const PORT= process.env.PORT || 3000

const app=express()
connectDB()


app.use(express.json())
app.use(cors())

app.use("/user",userRouter)

app.listen(PORT,()=>{
    console.log("Server is started on http://localhost:"+PORT )
})