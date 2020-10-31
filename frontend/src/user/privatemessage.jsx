import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import './privatemessage.css'
const BASE_URL = "http://localhost:3001"


function PrivateMessage(params) {

    const [messageList, setMessageList] = useState([])
    const [messageText, setMessageText] = useState("")

    const { token } = JSON.parse(localStorage.getItem("user-session")) || ''

    const { message_id } = params
    useEffect(() => {
        const interval_message = setInterval(getMessages, 1500)
        getMessages()
        return () => clearInterval(interval_message)
    }, [])

    function getMessages() {
        axios.get(`${BASE_URL}/conversationmessage/${message_id}`)
            .then(r => {
                setMessageList(r.data.messages)
            })
    }
    function postMessage(e) {
        e.preventDefault()
        setMessageText("")
        axios.post(`${BASE_URL}/conversationmessage/${message_id}`,
            { message: messageText, csrf_token: token}, {withCredentials: true})
            .then(r => console.log("Sucesso!"))
            .catch(e => console.log("erro"))
    }

    return (
        <>
            <h1>Conversa com {params.destinatary}</h1>
            <div className="private-message-container">
                {messageList.map(message => (
                    <div className="single-message" key={message._id}>
                        <strong>{params.username === message.from ? "Você: " : `${message.from}: `}</strong>{message.text}
                    </div>
                ))}

            </div>
            <hr />
            <form className="chat-form" onSubmit={postMessage}>
                <textarea className="form-control" value={messageText} onChange={e => setMessageText(e.target.value)}></textarea>
                <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
        </>
    )
}

const mapStateToProps = state => ({ username: state.auth.user })
export default connect(mapStateToProps)(PrivateMessage)