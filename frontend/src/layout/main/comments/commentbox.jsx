import React, {useState} from 'react'
import axios from 'axios'
import './commentbox.css'
const BASE_URL = "http://localhost:3001"

function CommentBox (params) {
    const { token } = JSON.parse(localStorage.getItem("user-session")) || ''
    const { commentList, productId, refreshFunction } = params
    const [replyId, setReplyId] = useState("")
    const [replyText, setReplyText] = useState("")

    function parseDate(date) {
        const parsedDate = date.split("T")[0].split("-").reverse().join("/")
        return parsedDate
    }

    function submitReply(e) {
        e.preventDefault()
        axios.post(`${BASE_URL}/addcomment`, {token, text: replyText, productId, replyId}, {
            withCredentials: true
        }).then(r => {
            console.log(r.data)
            setReplyText("")
            refreshFunction()
        })
        .catch(e => console.log(e.response))      
    }

    return (
        commentList.map(comment => (
            <div key={comment._id} className="comment-box">
                <div className="comment-header">
                    <p className="comment-author">
                        {comment.author} <span className="comment-date">{parseDate(comment.createdAt)}</span>
                    </p>
                </div>
                <p className="comment-text">{comment.text}</p>
                <button onClick={() => setReplyId(comment._id)} class="btn bg-transparent p-0 m-0">
                    <p className="comment-reply-button">Responder</p>
                </button>

                {comment.replies.map(reply => (
                    <>
                    <div className="comment-header reply">
                        <p className="comment-author">
                            {reply.author} <span className="comment-date">{parseDate(reply.createdAt)}</span>
                        </p>
                    </div>
                    <p className="comment-text reply">{reply.text}</p>
                </>
                ))}
                
                {replyId === comment._id ? 
                <form className="reply-form" onSubmit={submitReply}>
                    <textarea value={replyText} onChange={e => setReplyText(e.target.value)}
                     type="text" placeholder="Digite uma resposta" className="form-control"/>
                    <div className="reply-buttons">
                        <button onClick={() => setReplyId("")} type="button" 
                        className="btn btn-secondary">Cancelar</button>
                        <button type="submit" className="btn btn-primary">Responder</button>
                    </div>
                </form> : null}
                
            </div>
        ))
    )
}

export default CommentBox