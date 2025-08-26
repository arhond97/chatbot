import React, { useState, useEffect, useRef } from "react";
import {connect} from "react-redux";
import {userMessage, sendMessage, createSession} from "../../actions/watson";
import {validMessage} from "../../regex";
import axios from "axios";
import store from "../../store";


const Chat = ({ chat, userMessage, sendMessage }) => {

    const [message, setMessage] = useState("");
    const [error, setError] = useState("")
    const endOfMessages = useRef(null)

    const scrollToBottom = () => {
        endOfMessages.current.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(scrollToBottom, [chat]);


    const passToDb = (chat) => {
            const pass = axios.post("/api/watson/mongo", chat)
            if(pass) console.log(`wysłano post request z obiektem`)
    }

    const handleClose = () => {
        passToDb(chat)
        localStorage.removeItem('session')
        store.dispatch(createSession())
    }

    const validate = (message) => {
        if (!validMessage.test(message)) {
            setError("Your message is invalid! Your message is too short or You have whitespace at the beginning of the sentence.")
            return false
        }

        if(message.length > 500) {
            setError("Your message is too long!")
            return false
        }

        setError("")
        return true
    }

    const handleClick = async (e) => {

            const code = e.keyCode || e.which;

            if (code === 13) {
                if(validate(message)) {
                    userMessage(message);
                    sendMessage(message);
                    setMessage("");
                    let x = document.getElementById('welcome');
                    x.style.display = "none";
                }
            }
    };

    const handleSendMessage = (e) => {
        setMessage(e.target.value)
    }


    return (
        <div className="chat">
            <div className="close-container" onClick={() => handleClose()}>
                <div className="leftright"/>
                <div className="rightleft"/>
                <label className="close">close</label>
            </div>
            <h1>E-commerce Bot</h1>
            {error &&
            <div className="alert">
                <strong>{error}</strong>
            </div>
            // <div style={{color: 'red', fontWeight: 'bold', border: 'solid 1px black', padding: '5px'}}>{error}</div>
            }
            <div className="historyContainer">
                {chat.length === 0
                    ? ""
                    : chat.map((msg, i) => <div className={msg.type} key={i}>{msg.message}</div>)}
                <div ref={endOfMessages}/>
                <div id='welcome'>
                    <h2>Send welcome message to start conversation</h2>
                </div>
            </div>
            <input id="chatBox" onChange={handleSendMessage} onKeyPress={handleClick} value={message} maxLength={100}/>
        </div>
    );
};
const mapStateToProps = (state) => ({
    chat: state.watson.messages,
})

export default connect(mapStateToProps, { userMessage, sendMessage })(Chat);