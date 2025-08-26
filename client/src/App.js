import './App.css';
import {Provider} from "react-redux";
import store from "./store";
import Chat from "./components/chat/Chat";
import {useEffect} from "react";
import {createSession} from "./actions/watson";
import axios from "axios";
import {getWithExpiry} from "./expireSession";

if (getWithExpiry('session')) {
    delete axios.defaults.headers.common["session_id"];
    axios.defaults.headers.common["session_id"] = getWithExpiry('session');
} else {
    delete axios.defaults.headers.common["session_id"];
}

const App = () => {
    useEffect(() => {
        if(!getWithExpiry('session')) {
            store.dispatch(createSession())
        }
        // if(!localStorage.getItem('session')) {
        //     store.dispatch(createSession())
        // }
    })
    return (
        <Provider store={store}>
                <div className="container">
                    <Chat/>
                </div>
        </Provider>
    );
}

export default App;
