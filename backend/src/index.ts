import express from "express";
import urlRoute from "./routes"
import dotenv from "dotenv";
import cors from "cors";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

app.get("/health",(req,res)=>{
    res.status(200).json({msg:`server is healthy`})
})

app.use("/api/v1",urlRoute)

app.listen("3000",()=>{
    console.log(`listening to port 3000`);
    
})