import express from 'express';
import dotenv from 'dotenv'

import dbConnection from './db/connection';
import contactRouter from './routes/contact.routes';

dotenv.config({path:"./.env.dev"})
const app = express();

const port = process.env.PORT || 8000;

app.use(express.json());

dbConnection()

app.use(contactRouter)

app.get("/test",(req,res)=>{
    res.status(200).send({message:"hi"})
})

app.listen(port, () =>{
    console.log('server running on '+port);
})