import React, {useState} from 'react'
import axios from 'axios'
const BASE_URL = "http://localhost:3001"


function SubmitComment(params) {

    const { token } = JSON.parse(localStorage.getItem("user-session")) || ''
    const { productId, refreshFunction } = params
    const [commentText, setCommentText] = useState("")

    function handleSubmit(e) {
        e.preventDefault()
        axios.post(`${BASE_URL}/addcomment`, {token, text: commentText, productId}, {
            withCredentials: true
        }).then(r => {
            console.log(r.data)
            setCommentText("")
            refreshFunction()
        })
        .catch(e => console.log(e.response))      
    }



    return (
        <div className="comment-form">
                    <form onSubmit={handleSubmit}>
                        <textarea maxLength={150} value={commentText} 
                        onChange={e => setCommentText(e.target.value)} placeholder="Pergunte ao vendedor" 
                        className="form-control">
                        </textarea>
                        <button type="submit" className="btn btn-primary">Enviar</button>
                    </form>
        </div>  
    )
}

export default SubmitComment