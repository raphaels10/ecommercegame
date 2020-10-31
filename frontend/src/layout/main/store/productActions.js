import Axios from "axios"

import axios from 'axios'
const BASE_URL = "http://localhost:3001"


export function getProducts() {
    return dispatch => {
        axios.get(`${BASE_URL}/products`)
        .then(r => {
            dispatch({type: "PRODUCTS_FETCHED", payload: r.data})
        })
        .catch(e => console.log(e.response))
    }
}

export function getProductById(id) {
    return dispatch => {
        axios.get(`${BASE_URL}/products/${id}`)
        .then(r => {
            dispatch({type: "PRODUCT_FETCHED", payload: r.data})
        })
    }
}