import {
    INPUT_FAIL,
    INPUT_SUCCESS,
    MESSAGE_FAIL,
    MESSAGE_SUCCESS, RESET_SESSION,
    SESSION_FAIL,
    SESSION_SUCCESS
} from "../actions/types";
import {setWithExpiry} from "../expireSession";

const initialState = {
    messages: []
}


export default (state = initialState, action) => {
    const {type, payload} = action;
    let {messages} = state;

    switch (type) {
        case INPUT_SUCCESS:
            messages = [...messages, {message: payload, type: "user"}]
            return {
                ...state,
                messages
            }
        case INPUT_FAIL:
            return {
                ...state
            }
        case SESSION_SUCCESS:
            setWithExpiry("session", payload["session_id"], 60000)
            return {
                ...state
            }
        case SESSION_FAIL:
            return {
                ...state
            }
        case MESSAGE_SUCCESS:
            messages = [...messages, {message: payload, type: "bot"}]
            return {
                ...state,
                messages
            }
        case MESSAGE_FAIL:
            return {
                ...state
            }
        case RESET_SESSION:
            localStorage.removeItem("session");
            return {
                ...state
            }
        default:
            return {
                ...state
            }
    }
}