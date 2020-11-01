import React from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import Login from '../auth/login'
import Signup from '../auth/signup'
import Logout from '../auth/logout'
import RecoverPass from '../auth/recoverpass'
import ChangeRecoverPass from '../auth/changerecoverpass'
import CreatePost from '../creation/createpost'
import GameProduct from '../layout/gameproduct/gameproduct'
import UserAccount from '../user/useraccount'
import OtherUser from '../user/otheruser/otheruser'
import { connect } from 'react-redux'
import { signup, login, recoverPass, changePass } from '../auth/authActions'
import { ConnectedRouter} from 'connected-react-router'
import history from './history'
import MainPage from './mainpage'



function routes(params) {
    return(
    <ConnectedRouter history={history}>
        <Switch>
            <Route exact path="/main" component={MainPage}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/login" component={() => <Login onSubmit={params.loginFunc}/>}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/recoverPass" component={() => <RecoverPass onSubmit={params.recoverPassFunc}/>}/>
            <Route path="/recover/:token" component={ChangeRecoverPass}/>
            <Route path="/create" component={CreatePost}/>
            <Route path="/products/:id" component={GameProduct}/>
            <Route path="/myaccount" component={UserAccount}/>
            <Route path="/users/:username" component={OtherUser}/>
            <Redirect from="*" to="/main"/>
        </Switch>
    </ConnectedRouter>
    )
}
const mapDispatchToProps = dispatch => ({
    signupFunc(values){
        dispatch(signup(values))
    },
    loginFunc(values){
        dispatch(login(values))
    },
    recoverPassFunc(email){
        dispatch(recoverPass(email))
    },
    changePassFunc(values){
        dispatch(changePass(values))
    }
})
export default connect(null, mapDispatchToProps)(routes)
