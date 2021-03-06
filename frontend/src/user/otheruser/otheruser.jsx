import React, {useState, useEffect} from 'react'
import profilepic from '../../assets/images/userplaceholder.webp'
import OtherUserProducts from './otheruserproducts'
import { FaEnvelope } from 'react-icons/fa'
import { connect } from 'react-redux'
import { PacmanLoader } from 'react-spinners'
import {toastr} from 'react-redux-toastr'
import './otheruser.css'
import axios from 'axios'
const BASE_URL = "http://localhost:3001"


function OtherUser(params) {
    const {username} = params.match.params
    const [modalVisibility, setModalVisibility] = useState(false)
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [userExists, setUserExists] = useState(false)
    const [loading, setLoading] = useState(true)
    const [userProfilePic, setUserProfilePic] = useState("")

    const token = localStorage.getItem("user-session") ? JSON.parse(localStorage.getItem("user-session")).token : ''



    useEffect(() => {
        axios.post(`${BASE_URL}/finduser`, {username})
        .then(r => {
            setUserExists(true)
            setLoading(true)
            if(r.data.profilePic) setUserProfilePic(r.data.profilePic)
        })
        .catch(e => {
            setUserExists(false)
            setLoading(false)
        })
    }, [])

    if(!userExists && loading) {
        return (
            <div className="spinner-container">
                <PacmanLoader color="yellow" loading/>
            </div>
        )
    }

    if(!userExists && !loading) {
        return (
            <div className="d-flex vw-100 vh-100 align-items-center justify-content-center">
                <h1 style={{color: "rgba(0,0,0,.15)"}}> Usuário não encontrado =( </h1>
            </div>
        )
    }

    function handleSubmit(event) {
        event.preventDefault()
        const conversation = {from: params.user, to: username, title, message: {
            from: params.user, 
            text: text
        }}
        console.log(conversation)
        axios.post("http://localhost:3001/sendmessage", {...conversation, csrf_token: token}, {
            withCredentials: true
        })
        .then(r => {
            console.log(r.data)
            setModalVisibility(false)
            setTitle("")
            setText("")
        })
        .catch(e => {
            try {
                const errors = e.response.data.error
                errors.forEach(e => toastr.error("Erro", e))
            }
            catch(e) {
                toastr.error("Erro", "Não foi possível enviar a mensagem, tente novamente mais tarde")
            }
        })
    }


    return (
        <>
        <div className="message-modal" style={{display: modalVisibility ? "flex" : "none"}}>
            <div className="message-box">
                <form onSubmit={handleSubmit}>
                    <input placeholder="Título" className="form-control" type="text" 
                    value={title} onChange={e => setTitle(e.target.value)} required/>
                    <textarea placeholder="Escreva a mensagem"
                     value={text} onChange={e => setText(e.target.value)} className="form-control"/>
                    <div className="message-button-container">
                        <button className="btn btn-primary" type="submit">Enviar</button>
                        <button type="button" onClick={() => setModalVisibility(false)}
                         className="btn btn-secondary">Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
        <div className="align-center">
            <div className="my-account">
                <div className="profile-info">
                    <div className="profile-header">
                        <div className="profile-pic">
                            <img src={ userProfilePic || profilepic} alt="Foto de perfil" />
                        </div>
                        <div className="user-info">
                            <h2>{username}</h2>
                            <p>Vendas realizadas: 36</p>
                            <p>Avaliação média: 4.76/5.0</p>
                        </div>
                    </div>
                    <hr />
                    <div className="profile-menu">
                        <ul className="user-menu-list">
                            <li className="user-menu-item">
                                <button type="button" onClick={() => setModalVisibility(true)}
                                className="btn bg-transparent">
                                     <FaEnvelope/> Enviar Mensagem
                                </button>
                            </li>
                            <hr/>
                        </ul>
                    </div>
                </div>
                <OtherUserProducts username={username}/>
            </div>
        </div>
        </>
    )
}

const mapStateToProps = state => ({user: state.auth.user})

export default connect(mapStateToProps)(OtherUser)