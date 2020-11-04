import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import './privatemessage.css'
const BASE_URL = "http://localhost:3001"


function PrivateMessage(params) {

    const [messageList, setMessageList] = useState([])
    const [messageText, setMessageText] = useState("")

    const { token } = JSON.parse(localStorage.getItem("user-session")) || ''
    parseMessageDate("2020-11-04T04:51:01.094Z")

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

    function parseMessageDate(date) {  
        const UTCDate = new Date(date)
        return UTCDate.toLocaleString("en-gb")
    }

    return (
        <>
            <h2>Conversa com {params.destinatary}</h2>
            <div className="private-message-container">
                {messageList.map(message => (
                    <div className={`single-message ${params.username === message.from ? "message-from-you": "message-from-other"}`} key={message._id}>
                        <p>{message.text}<span className="time"> {parseMessageDate(message.createdAt)}</span></p>
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