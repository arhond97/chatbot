import connectDB from './config/db.js';
import express from 'express'
import dotenv from "dotenv";
import colors from 'colors'
import watsonRouter from "./routes/api/watson.js"

const app = express();
dotenv.config()
connectDB()

app.use(express.json());

app.use("/api/watson", watsonRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Server listening on port ", port);
})
