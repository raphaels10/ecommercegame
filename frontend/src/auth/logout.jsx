import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import { logout } from '../auth/authActions'

function Logout (params) {
    useEffect(() => {
        params.logOff()
    }, [])

    return (
        <h1>Logout</h1>
    )
    
}

const mapDispatchToProps = dispatch => ({logOff(){dispatch(logout())}})

export default connect(null, mapDispatchToProps)(Logout)



