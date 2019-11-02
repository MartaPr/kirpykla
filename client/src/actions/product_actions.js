import axios from 'axios';
import {
    ADD_PRODUCT,
    CLEAR_PRODUCT,
    GET_PRODUCT

} from './types';

import { PRODUCT_SERVER } from '../components/utils/misc';


export function getProducts(){
    const request = axios.get(`${PRODUCT_SERVER}/service`)
                    .then(response => response.data);
    console.log(request);
    
    return {
        type: GET_PRODUCT,
        payload: request
    }
    
}


export function addProduct(datatoSubmit){

    const request = axios.post(`${PRODUCT_SERVER}/services`,datatoSubmit)
                    .then(response => response.data);

    return {
        type: ADD_PRODUCT,
        payload: request
    }
}

export function clearProduct() {
    return {
        type: CLEAR_PRODUCT,
        payload: ''
    }
}