const INITIAL_STATE = {
    productsList: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "PRODUCTS_FETCHED": {
            return {...state, productsList: action.payload}
        }
        default:
            return state
    }
}