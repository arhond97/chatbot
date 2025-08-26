import mongoose from "mongoose";

const messageSchema =  mongoose.Schema({
    session: {type: String, required: true},
    userMessage:{ type: String, required: true },
    botMessage: { type: String, required: true},
}, {timestamps: true})

const Conversation = mongoose.model('Conversation', messageSchema)

export default Conversation