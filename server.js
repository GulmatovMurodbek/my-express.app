import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/configeDB.js"
import CareerRouter from "./routes/career.js"
import cors from "cors"
import ClassterRouter from "./routes/classter.js"
dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())
app.use('/api',CareerRouter)
app.use("/api",ClassterRouter)
connectDB()
const PORT=process.env.PORT || 3004
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))
