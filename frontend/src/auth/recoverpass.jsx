import React, { useEffect } from 'react'
import Input from '../form/input'
import {reduxForm, Field} from 'redux-form'
let token = null 

function Recoverpass(params) {
    return (
            <div className="form-wrapper">
                <form className="form-signin" onSubmit={params.handleSubmit}>
                    <Field name="email" id="email" placeholder="Digite seu e-mail" type="email"
                    component={Input} autoFocus/>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Enviar</button>
                </form>
            </div>
    )
}

export default reduxForm({form: "RecoverForm", initialValues: {email: "", token: token}})(Recoverpass)


