import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import userRouter from "./routes/user.router.js"
import postRouter from "./routes/post.route.js"
import notificationRouter from "./routes/notification.route.js"

dotenv.config()
const PORT= process.env.PORT || 3000

const app=express()
connectDB()


app.use(express.json())
app.use(cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}))

app.use("/user",userRouter)
app.use("/post",postRouter)
app.use("/notification",notificationRouter)

app.listen(PORT,()=>{
    console.log("Server is started on http://localhost:"+PORT )
})