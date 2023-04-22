import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    username: {type: String, required: true },
    chatTxt: {type: String, required: true}
}, {timestamps: true});

export const chatModel = mongoose.model('chat_records', chatSchema)