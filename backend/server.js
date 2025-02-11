import dotenv from "dotenv";
dotenv.config();

import express from 'express'
import cors from 'cors'
import foodRouter from './routes/foodRoute.js'
import connectdb from './config/db.js';
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";


const app = express();
app.use(express.json())
app.use(cors())
connectdb();
app.use('/api/food', foodRouter)
app.use('/images', express.static('uploads'))
app.use('/api/user', userRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get('/', (req, res) => {
    res.send('Its running')
})

app.listen(3000, (req, res) => {
    console.log("Server is running");

})