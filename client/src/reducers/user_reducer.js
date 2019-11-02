import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER
} from './../actions/types';



export default function (state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                loginSuccess: action.payload
            }

        case REGISTER_USER:
            return {
                ...state,
                register: action.payload
            }
        case AUTH_USER:
            return {
                ...state,
                userdata: action.payload
            }
        case LOGOUT_USER:
            return {
                ...state
            }
        default:
            return state;
    }
}