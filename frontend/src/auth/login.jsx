import React from 'react'
import './form.css'
import { Link } from 'react-router-dom'
import Input from '../form/input'
import {reduxForm, Field} from 'redux-form'


function login(params) {
    return (
            <div className="form-wrapper">
                <form className="form-signin" onSubmit={params.handleSubmit}>
                    <h1 className="h3 mb-3 font-weight-normal">Login</h1>
                    <Field name="username" id="username" placeholder="Usuário" type="text"
                    component={Input} label="Usuário" autoFocus/>
                    <Field name="password" id="password" placeholder="Senha" type="password"
                    component={Input} label="Senha"/>
                    <p className="mb-3"><Link to="/recoverPass">Esqueci minha senha</Link></p>
                    <p className="mb-3">Não tem uma conta? <Link to="/signup">Cadastre-se!</Link></p>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Entrar</button>
                </form>
            </div>
    )
}

export default reduxForm({form: "loginForm"})(login)

