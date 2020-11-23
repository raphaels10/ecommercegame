import React from 'react'
import {FaSmile} from 'react-icons/fa'

function Summary(params) {

    return (
        <div className="user-summary">
            <div className="h-100 d-flex align-items-center justify-content-center">
                <span style={{marginRight: "5px", color: "rgba(0,0,0,.2)", fontSize:"28px"}}>Seção em desenvolvimento</span> <FaSmile size={28} color="rgba(0,0,0,.2)"/>
            </div>
        </div>
    )
}

export default Summary