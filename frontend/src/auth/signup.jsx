import React, {useState} from 'react'
import {storage} from '../firebase'
import axios from 'axios'
import { push } from 'connected-react-router'
import { toastr } from 'react-redux-toastr'
import { store } from '../index'
const BASE_URL = "http://localhost:3001"


function Signup(params) {
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [file, setFile] = useState(null)
 
    function handleFile(e){
        setFile(e.target.files[0])
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if(!file) return
        const uploadTask = storage.ref(`/profilepics/${file.name}`).put(file)
        uploadTask.on("state_changed", snapshot => {}, error => {},
        () => {
            storage.ref(`/profilepics/${file.name}`).getDownloadURL()
            .then(URL => {
                postFormData(URL)
            })
            .catch(e => console.log(e))
        })
    }

    function postFormData(fileURL) {
        axios.post(`${BASE_URL}/signup`,
         {name, username, email, password, confirmPassword, fileURL})
         .then(r => {
             toastr.success("Sucesso", r.data)
             store.dispatch(push("/"))
         })
         .catch(e => {
             const error = e.response.data.error
            error.forEach(e => toastr.error("Erro", e))
        })

    }

    return (
        <div className="form-wrapper">
            <form className="form-signup" onSubmit={handleSubmit}>
                <h1 className="h3 mb-3 font-weight-normal">Cadastro</h1>
                <input name="name" className="form-control" id="name" placeholder="Nome" type="text"
                    label="Nome" value={name} onChange={e => setName(e.target.value)} autoFocus/>
                <input name="username" className="form-control" id="username" placeholder="Usuário" type="text"
                    label="Usuário" value={username} onChange={e => setUsername(e.target.value)} />
                <input name="email" id="email" className="form-control" placeholder="E-mail" type="email"
                    label="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <input name="password" id="password" className="form-control" placeholder="Senha" type="password"
                    label="Senha" value={password} onChange={e => setPassword(e.target.value)} />
                <input name="confirmPassword" id="confirmPassword" className="form-control" placeholder="Confirme a senha"
                    type="password" label="Senha"
                    value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                <input placeholder="Selecione um arquivo" style={{"visibility": "visible"}} 
                type="file" onChange={handleFile}/>
                <button className="mt-3 btn btn-lg btn-primary btn-block" type="submit">Cadastrar</button>


            </form>
        </div>
    )
}

export default Signup