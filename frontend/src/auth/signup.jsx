import React from 'react'
import Input from '../form/input'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import ReCAPTCHA from 'react-google-recaptcha'


function signup(params) {

    return (
        <div className="form-wrapper">
            <form className="form-signup" onSubmit={params.handleSubmit}>
                <h1 className="h3 mb-3 font-weight-normal">Cadastro</h1>
                <Field name="name" id="name" placeholder="Nome" type="text"
                    component={Input} label="Nome" />
                <Field name="username" id="username" placeholder="Usuário" type="text"
                    component={Input} label="Usuário" />
                <Field name="email" id="email" placeholder="E-mail" type="email"
                    component={Input} label="Email" />
                <Field name="password" id="password" placeholder="Senha" type="password"
                    component={Input} label="Senha" />
                <Field name="confirmPassword" id="confirmPassword" placeholder="Confirme a senha"
                    type="password" component={Input} label="Senha" />
                <button className="mt-3 btn btn-lg btn-primary btn-block" type="submit">Cadastrar</button>


            </form>
        </div>
    )
}
const mapStateToProps = state => ({ redirect: state.auth.redirect })
const Signup = reduxForm({ form: "signupForm" })(signup)
export default connect(mapStateToProps)(Signup)