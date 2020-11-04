import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { push, goBack } from 'connected-react-router'
const BASE_URL = "http://localhost:3001"


export function login(values) {

    return dispatch => {
        axios.post(`${BASE_URL}/login`, values, { withCredentials: true,  credentials: 'include' })
            .then(r => {
                console.log(r)
                const { token } = r.data
                localStorage.setItem("user-session", JSON.stringify({ token }))
                dispatch([{ type: "USER_AUTHENTICATED", payload: r.data }, goBack()])
            })
            .catch(e => {
                toastr.error("Erro", e.response.data.error)
                dispatch({ type: "SIGNED_IN", payload: null })
            })
    }
}

export function validateToken(token) {
    return dispatch => {
        axios.post(`${BASE_URL}/validateToken`, { token }, { withCredentials: true })
            .then(r => {
                dispatch({ type: "TOKEN_VALIDATED", payload: r.data })
            })
            .catch(e => {
                dispatch({ type: "TOKEN_INVALIDATED" })
            })
    }
}

export function signup(newuser) {
    return dispatch => {
        axios.post(`${BASE_URL}/signup`, newuser)
            .then(r => {
                toastr.success("Sucesso", r.data)
                dispatch(push('/'))

            })
            .catch(e => {
                const error = e.response.data.error
                error.forEach(e => toastr.error("Erro", e))
                dispatch({ type: "SIGNED_UP", payload: null })
            })
    }
}



export function logout() {
    return dispatch => {
        axios.get(`${BASE_URL}/logout`, { withCredentials: true }).then(r => {
            console.log(r)
            if (localStorage.getItem("user-session")) localStorage.removeItem("user-session")
            dispatch([{ type: "TOKEN_INVALIDATED" }, push('/')])
        })
            .catch(e => console.log(e))
    }
}

export function recoverPass(email) {
    console.log(email)
    return dispatch => {
        axios.post(`${BASE_URL}/forgotPass`, email)
            .then(r => {
                toastr.success("Sucesso", r.data)
                dispatch(push('/'))
            })
            .catch(e => {
                toastr.error("Erro", e.response.data.error)
                dispatch({ type: "SIGNED_UP", payload: null })
            })
    }
}

export function changePass(values) {
    return dispatch => {
        axios.post(`${BASE_URL}/changePass`, values)
            .then(r => {
                toastr.success("Sucesso", r.data)
                dispatch(push('/'))
            })
            .catch(e => {
                toastr.error("Erro", e.response.data.error)
                dispatch({ type: "SIGNED_UP", payload: null })
            })
    }
}

export function fetchProductsId(token) {

    return dispatch => {
        axios.post(`${BASE_URL}/validateToken`, { token }, {
            withCredentials: true
        }).then(r => {
            if (r.data.username) {
                dispatch({type: "USER_PRODUCTS_ID_FETCHED", payload: r.data.products})
            }

        })
    }
}
