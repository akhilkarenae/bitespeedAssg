import express from 'express';
import dotenv from 'dotenv'

import dbConnection from './db/connection';

dotenv.config({path:"./.env.dev"})
const app = express();

const port = process.env.PORT || 8000;


dbConnection()

app.listen(port, () =>{
    console.log('server running on '+port);
})