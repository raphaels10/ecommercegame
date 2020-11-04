import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PrivateMessage from './privatemessage'
import axios from 'axios'
import './messages.css'

function Messages(params) {
    const { token } = JSON.parse(localStorage.getItem("user-session")) || ''
    const [messagesReceived, setMessagesReceived] = useState([])
    const [pageContent, setPageContent] = useState("overall")
    const [currentConversation, setCurrentConversation] = useState("")
    console.log(messagesReceived)

   

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
                    messagesReceived.sort((a,b) => (
                        Date.parse(b.messages.slice(-1)[0].createdAt) - Date.parse(a.messages.slice(-1)[0].createdAt)
                    ))
                    .map(messageReceived => (
                        <div className="message-container" key={messageReceived._id}
                            onClick={() => {
                                setCurrentConversation(messageReceived)
                                setPageContent("private")
                            }}>
                            <p>
                                <strong>
                                    {messageReceived.from === params.username ? messageReceived.to : messageReceived.from}
                                </strong>
                            </p>
                            <p>{`${messageReceived.messages.slice(-1)[0].from === params.username ? "Você:" : ""} ${messageReceived.messages.slice(-1)[0].text}`}</p>
                            <hr />
                        </div>
                    ))
                )
            case "private":
                return (
                    <PrivateMessage 
                    message_id={currentConversation._id} 
                    destinatary={currentConversation.from === params.username ? currentConversation.to : currentConversation.from}/>
                )
        }
    }



    return (
        <div className="user-messages">
            <h2>Conversas</h2>
            {renderPage()}
        </div>
    )

}

const mapStateToProps = state => ({ username: state.auth.user })

export default connect(mapStateToProps)(Messages)