import express from "express";
import AssistantV2 from "ibm-watson/assistant/v2.js";
import { IamAuthenticator } from 'ibm-watson/auth/index.js';
const watsonRouter = express.Router();
import {myEncrypt} from "../../config/encryption.js";
import Conversation from "../../config/chatModel.js";



const assistant = new AssistantV2({
  version: '2020-09-24',
  authenticator: new IamAuthenticator({
      apikey: 'lW1tX5wfQTtymBeCiKvSmufo51ZiRqqgDTlBob9MwaOY',
  }),
  serviceUrl: 'https://api.eu-gb.assistant.watson.cloud.ibm.com/instances/128fd040-65b1-49a5-9ccc-dfea08375405',
});


watsonRouter.get('/session', async (req, res) => {
    try {
        const session = await assistant.createSession({
            assistantId: '03717ae4-fff1-4b74-ba7b-cda9113198f4',
        });
        res.json(session["result"]);
        let today = new Date();

        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        let dateTime = date+' '+time;

        console.log(`Session Created at ${dateTime}`)
    } catch (err) {
        res.send('Nastąpił problem przy tworzeniu sesji z EcommerceBotem');
        console.log(err)
    }
});

watsonRouter.post('/message', async (req, res) => {

    let payload = {
        assistantId: '03717ae4-fff1-4b74-ba7b-cda9113198f4',
        sessionId: req.headers.session_id,
        input: {
            message_type: "text",
            text: req.body.input
        }
    }
    try {
        const message = await assistant.message(payload);
        res.json(message["result"]);

    } catch (err) {
        res.send('Nastąpił problem z wysłaniem wiadomości dla EcommerceBota');
    }

})

watsonRouter.post('/mongo',async (req, res) => {
    const chat = req.body
    let conversations = []
    for (let i = 0; i < chat.length; i++) {
        conversations.push( {
            session: req.headers.session_id,
            userMessage: myEncrypt(chat[i].message),
            botMessage: myEncrypt(chat[i+=1].message)
        })
    }
    await Conversation.insertMany(conversations)
})

export default watsonRouter