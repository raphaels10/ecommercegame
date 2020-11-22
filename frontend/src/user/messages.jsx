import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PrivateMessage from './privatemessage'
import axios from 'axios'
import './messages.css'

const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez"
];

function Messages(params) {
    const { token } = JSON.parse(localStorage.getItem("user-session")) || ''
    const [messagesReceived, setMessagesReceived] = useState([])
    const [pageContent, setPageContent] = useState("overall")
    const [currentConversation, setCurrentConversation] = useState("")

    function parseMessage(message) {
        try {
            const date = new Date(message)
            const actualYear = new Date().getFullYear()
            if (date.getFullYear() === actualYear) {
                return `${date.getDate()} de ${monthNames[date.getMonth()]}`
            }
            return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
        }
        catch (e) {
            return ""
        }
    }


    useEffect(() => {
        axios.post("http://localhost:3001/userdata", { token }, {
            withCredentials: true
        })
            .then(r => {
                setMessagesReceived(r.data.messagesReceived)
            })
            .catch(e => console.log(e.response))
    }, [])

    function renderPage() {
        switch (pageContent) {
            case "overall":
                return (
                    messagesReceived.sort((a, b) => (
                        Date.parse(b.messages.slice(-1)[0].createdAt) - Date.parse(a.messages.slice(-1)[0].createdAt)
                    ))
                        .map(messageReceived => (
                            <div className="message-container" key={messageReceived._id}
                                onClick={() => {
                                    setCurrentConversation(messageReceived)
                                    setPageContent("private")
                                }}>
                                <p style={{ color: "rgb(25,25,25)", margin: "0" }}>
                                    {messageReceived.from === params.username ? messageReceived.to : messageReceived.from}
                                </p>
                                <p style={{ color: "rgb(77,77,77)", margin: "0", fontWeight: 600}}>
                                    {messageReceived.title}
                                </p>
                                <p style={{ color: "rgb(153,153,153)", fontSize: "14px" }}>
                                    {`${messageReceived.messages.slice(-1)[0].from === params.username ? "Você:" : ""} ${messageReceived.messages.slice(-1)[0].text}`}
                                    <span style={{margin: "0px 5px", color: "rgb(202,202,202)"}}>· {parseMessage(messageReceived.messages.slice(-1)[0].createdAt)}</span>
                                </p>
                            </div>
                        ))
                )
            case "private":
                return (
                    <PrivateMessage
                        message_id={currentConversation._id}
                        destinatary={currentConversation.from === params.username ? currentConversation.to : currentConversation.from} />
                )
        }
    }



    return (
        <div className="user-messages">
            <h3 className="messages-title">Conversas</h3>
            {renderPage()}
        </div>
    )

}

const mapStateToProps = state => ({ username: state.auth.user })

export default connect(mapStateToProps)(Messages)