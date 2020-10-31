import React, {useState} from 'react'
import { connect } from 'react-redux'
import {changePass} from '../auth/authActions'
import Input from '../form/input'



function ChangeRecoverPass(params) {
    const [password, setPass] = useState('')
    const [confirmPassword, setConfirmPass] = useState('')

    const onChangePass = (e) => {
        setPass(e.target.value)
    }
    const onChangeConfirmPass = (e) => {
        setConfirmPass(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const {token} = params.match.params
        params.changePassFunc({token, password, confirmPassword})
        
        
    } 
    return (
            <div className="form-wrapper">
                <form className="form-signin" onSubmit={onSubmit}>
                    <input name="password" id="password" placeholder="Digite a nova senha" type="password"
                    value={password} onChange={onChangePass} required autoFocus className="form-control" />
                    <input name="confirmPassword" id="confirmPassword" placeholder="Confirme a senha"
                     type="password" value={confirmPassword} onChange={onChangeConfirmPass} required className="form-control"/>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Alterar</button>
                </form>
            </div>
    )
}

const mapDispatchToProps = dispatch => ({changePassFunc(values){dispatch(changePass(values))}})
export default connect(null, mapDispatchToProps)(ChangeRecoverPass)

