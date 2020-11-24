import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { logout } from '../auth/authActions'
import axios from 'axios'
import './useraccount.css'
import profilepic from '../assets/images/userplaceholder.webp'
import History from './history'
import Messages from './messages'
import Summary from './summary'
import EditRegistration from './editregistration'
import { store } from '../index'
import { push } from 'connected-react-router'
import { PacmanLoader } from 'react-spinners'

import { FaList, FaCoins, FaEnvelope, FaEdit, FaSignOutAlt, FaAngleDown, FaAngleUp, FaClipboardList } from 'react-icons/fa'

const BASE_URL = "http://localhost:3001"



function UserAccount(params) {
    const validated = params.validated
    const token = localStorage.getItem("user-session") ? JSON.parse(localStorage.getItem("user-session")).token : ''

    const [content, setContent] = useState("history")
    const [profilePic, setProfilePic] = useState("")
    const [loading, setLoading] = useState(true)
    const [menuOpen, setMenuOpen] = useState(false)


    useEffect(() => {
        axios.post(`${BASE_URL}/userdata`, { token }, { withCredentials: true })
            .then(r => {
                if (r.data.profilePic) setProfilePic(r.data.profilePic)
                setLoading(false)
            })
            .catch(e => {
                console.log(e)
                setLoading(false)
                store.dispatch(push('/login'))
            })
    }, [])







    function renderContent() {
        switch (content) {
            case "history":
                return <History />
            case "messages":
                return <Messages />
            case "editregistration":
                return <EditRegistration />
            case "summary":
                return <Summary />
            default:
                return <History />
        }

    }

    if (loading) {
        return (
            <div className="spinner-container">
                <PacmanLoader color="yellow" size={36} />
            </div>
        )
    }





    return (
        <div className="align-center">
            <div className="my-account">
                <div className="profile-info">
                    <div className="profile-header">
                        <div className="profile-pic">
                            <img src={profilePic || profilepic} alt="Foto de perfil" />
                        </div>
                        <div className="user-info">
                            <h2>{params.user || "Usuário"}</h2>
                            <p>Vendas realizadas: 36</p>
                            <p>Avaliação média: 4.76/5.0</p>

                            {menuOpen ?
                                <button onClick={() => setMenuOpen(false)} className="btn bg-transparent p-0">
                                    <FaAngleUp color="purple" size={40} className="d-md-none" />
                                </button>
                                :
                                <button onClick={() => setMenuOpen(true)} className="btn bg-transparent p-0">
                                    <FaAngleDown color="purple" size={40} className="d-md-none" />
                                </button>
                            }
                        </div>
                    </div>
                    <hr />
                    <div className={`profile-menu ${!menuOpen ? "hide-profile-menu" : ""}`}>
                        <ul className="user-menu-list">
                            <li className="user-menu-item">
                                <button type="button" onClick={() => setContent("history")}
                                    className="btn bg-transparent">
                                    <FaList color="black" /> Histórico
                                </button>
                            </li>
                            <hr />
                            <li className="user-menu-item">
                                <button type="button" onClick={() => setContent("summary")}
                                    className="btn bg-transparent">
                                    <FaClipboardList color="black" /> Resumo
                            </button>
                            </li>
                            <hr />
                            <li className="user-menu-item">
                                <button type="button" onClick={() => setContent("messages")}
                                    className="btn bg-transparent">
                                    <FaEnvelope color="blue" /> Mensagens
                            </button>
                            </li>
                            <hr />
                            <li className="user-menu-item">
                                <button type="button" onClick={() => setContent("editregistration")}
                                    className="btn bg-transparent">
                                    <FaEdit color="green" /> Editar cadastro
                            </button>
                            </li>
                            <hr />
                            <li className="user-menu-item">
                                <button type="button" onClick={() => { params._logout() }}
                                    className="btn bg-transparent">
                                    <FaSignOutAlt color="brown" /> Sair
                                </button>
                            </li>
                        </ul>

                    </div>

                </div>
                {renderContent()}


            </div>
        </div>
    )
}


const mapStateToProps = state => ({
    user: state.auth.user,
    validated: state.auth.validated
})
const mapDispatchToProps = dispatch => ({
    _logout() {
        dispatch(logout())
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(UserAccount)