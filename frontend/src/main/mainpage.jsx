import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import {validateToken} from '../auth/authActions'
import MainContent from '../layout/main/maincontent'



function MainPage (params) {

    const {token} = JSON.parse(localStorage.getItem("user-session")) || ''
    useEffect(() => {
        params.verifyToken(token)
    } , [])


    return(
    <>
        <MainContent/>
    </>
    )
}


const mapStateToProps = state => ({
    validated: state.auth.validated,
    name: state.auth.name,
    user: state.auth.user
})
const mapDispatchToProps = dispatch => ({
    verifyToken(token) {
        dispatch(validateToken(token))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(MainPage)


