
const INITIAL_STATE = {
    validated: false,
    user: "",
    name: "",
    userProductsId: []
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "USER_AUTHENTICATED":
            return {...state, validated: true, user: action.payload.username, name: action.payload.name}
        case "SIGNED_UP":
            return {...state}
        case "SIGNED_IN":
            return {...state}
        case "TOKEN_VALIDATED":
            return {...state, validated: true, user: action.payload.username, name: action.payload.name}
        case "TOKEN_INVALIDATED":
            return INITIAL_STATE
        case "USER_PRODUCTS_ID_FETCHED":
            return {...state, userProductsId: action.payload}
        default:
            return state
    }
}