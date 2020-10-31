import { combineReducers } from 'redux'
import { reducer as reduxForm } from 'redux-form'
import { reducer as toastrReducer } from 'react-redux-toastr'
import authReducer from '../auth/authReducer'
import productReducer from '../layout/main/store/productReducer'
import { connectRouter } from 'connected-react-router'
import history from './history'

const createRootReducer = combineReducers({
    router: connectRouter(history),
    form: reduxForm,
    toastr: toastrReducer,
    auth: authReducer,
    product: productReducer
})

export default createRootReducer