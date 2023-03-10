import express from 'express';
import {APP_PORT } from './config';


const app  = express();
app.use(express.static('public'));


app.listen(APP_PORT, ()=>{
    console.log(`Listenting on port ${APP_PORT}`);
});