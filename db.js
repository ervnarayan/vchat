import mongoose from "mongoose";
import { DB_URL } from "./config";

function dbConnect() {
    mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err)=>{
        if(err)
            console.log(`Unable to connect database : ${err}`)
        else
            console.log('Database connected...')
    });
}

export default dbConnect;
