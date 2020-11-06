import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import axios from 'axios'
import { connect } from 'react-redux'
import './privatemessage.css'
const BASE_URL = "http://localhost:3001"


function PrivateMessage(params) {

    const [messageList, setMessageList] = useState([])
    const [messageText, setMessageText] = useState("")
    const [lastTen, setLastTen] = useState([])
    const [hasInited, setHasInited] = useState(false)
    const [currentPage, setCurrentPage] = useState(2)
    const [hasMore, setHasMore] = useState(true)


    const { token } = JSON.parse(localStorage.getItem("user-session")) || ''
    parseMessageDate("2020-11-04T04:51:01.094Z")

    const { message_id } = params

    useEffect(() => {
        const interval_message = setInterval(getLastTen,3000)
        getLastTen("init")
        return () => clearInterval(interval_message)
    }, [])

    function getLastTen(str) {
        const _str = str || ""
        axios.get(`${BASE_URL}/conversationmessage/${message_id}?page=1`)
            .then(r => {
                if(_str==="init") {
                    setMessageList(r.data)
                    return
                }
                setMessageList(m => {
                    const messageIds = m.map(m => m._id)
                    const responseIds = r.data.map(r => r._id)
                    const number_of_new_messages = responseIds.indexOf(messageIds[0])

                    const sliced_messages = m.slice(10-number_of_new_messages)
                    sliced_messages.unshift(...r.data)
                    return sliced_messages
                })

                
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

    function handleNext() {

        axios.get(`${BASE_URL}/conversationmessage/${message_id}?page=${currentPage}`)
        .then(r => {
            if(r.data.length === 0) {
                setHasMore(false)
                return
            }

            setMessageList([...messageList, ...r.data,])
            setCurrentPage(currentPage + 1)
        })

    }
    

    return (
        <>
            <h2>Conversa com {params.destinatary}</h2>
            <div id="scrollable-div" className="private-message-container">

                
                <InfiniteScroll dataLength={messageList.length} loader={<h4>Loading...</h4>}
                hasMore={hasMore} scrollableTarget="scrollable-div" next={handleNext}
                style={{ overflow: "visible" , display: 'flex', flexDirection: 'column-reverse' }}
                inverse={true}>

                    {messageList.map(message => (
                        <div className={`single-message ${params.username === message.from ? "message-from-you": "message-from-other"}`} key={`${message._id}b`}>
                            <p>{message.text}<span className="time"> {parseMessageDate(message.createdAt)}</span></p>
                        </div>
                        
                    ))}

                </InfiniteScroll>

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