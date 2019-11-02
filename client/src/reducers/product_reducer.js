 import {
    ADD_PRODUCT,
    CLEAR_PRODUCT,
    GET_PRODUCT
} from '../actions/types';


export default function (state = {}, action) {
    switch (action.type) {
        // case GET_SERVICE:
        //     return {
        //         ...state,
        //         getService: action.payload
        //     }
        case GET_PRODUCT:
        return {
            ...state,
            services: action.payload
        }
        case ADD_PRODUCT:
            return {
                ...state,
                addProduct: action.payload
            }
        case CLEAR_PRODUCT:
            return {
                ...state,
                addProduct: action.payload
            }
        default:
            return state;
    }
}