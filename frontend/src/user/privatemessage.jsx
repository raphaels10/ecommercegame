import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import './privatemessage.css'
const BASE_URL = "http://localhost:3001"


function PrivateMessage(params) {

    const [messageList, setMessageList] = useState([])
    const [messageText, setMessageText] = useState("")
    const [isNewMsg, setIsNewMsg] = useState(false)
    const lastmessage = useRef(null)

    const { token } = JSON.parse(localStorage.getItem("user-session")) || ''

    const { message_id } = params
    useEffect(() => {
        const interval_message = setInterval(getMessages, 1500)
        getMessages("init")
        return () => clearInterval(interval_message)
    }, [])

    useEffect(() => {
        console.log("Nova mensagem")
        if (lastmessage.current) lastmessage.current.scrollTop = lastmessage.current.scrollHeight
    }, [isNewMsg])

    function getMessages(str) {
        const _str = str || ""
        axios.get(`${BASE_URL}/conversationmessage/${message_id}`, {
            withCredentials: true,
            headers: {authorization: `BEARER ${token}`},
        })
            .then(r => {

                setMessageList(m => {
                    if(r.data.messages.length > m.length) {
                        setIsNewMsg(b => !b)
                    }
                    return r.data.messages
                })

                if(_str === "init" && lastmessage.current) lastmessage.current.scrollTop = lastmessage.current.scrollHeight
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
            <div className="private-message-container" ref={lastmessage}>
                {messageList.map((message, index) => {
                if (index === messageList.length - 1) {
                    return (
                    <div
                     className={`single-message ${params.username === message.from ? "message-from-you": "message-from-other"}`} key={message._id}>
                        <p>{message.text}<span className="time"> {parseMessageDate(message.createdAt)}</span></p>
                    </div>   
                    )
                }
                return (
                    <div className={`single-message ${params.username === message.from ? "message-from-you": "message-from-other"}`} key={message._id}>
                        <p>{message.text}<span className="time"> {parseMessageDate(message.createdAt)}</span></p>
                    </div>                  
                ) 
                })}

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