import React, { useState } from 'react'
import './contact.css'
import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { store } from '../../index'
import { push } from 'connected-react-router'
import { BounceLoader } from 'react-spinners'

const BASE_URL = "http://localhost:3001"

function Contact(params) {

    const [reason, setReason] = useState("")
    const [email, setEmail] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [loading, setLoading] = useState(false)

    function handleSubmit(event) {
        setLoading(true)
        event.preventDefault()
        const formData = { reason, email, title, description }
        axios.post(`${BASE_URL}/contactus`, formData)
            .then(r => {
                setLoading(false)
                toastr.success("Sucesso!", r.data)
                store.dispatch(push('/'))
            })
            .catch(e => {
                setLoading(false)
                try {
                    const error = e.response.data.error
                    error.forEach(e => { toastr.error("Erro", e) })
                }
                catch (e) {
                    toastr.error(e => { toastr.error("Erro", "Não foi possível concluir sua solicitação, tente novamente mais tarde") })

                }
            })
    }



    return (
        <div className={loading ? "transparent" : ""}>
            <div className="loader-container">
                <BounceLoader size={52} loading={loading}></BounceLoader>
            </div>
            <div className="form-wrapper">
                <form className="form-contact" onSubmit={handleSubmit}>
                    <div className="container">
                        <div className="row">
                            <select value={reason} onChange={e => setReason(e.target.value)}
                                className="custom-select col-md-6">
                                <option value="" selected>Selecione o motivo</option>
                                <option value="pagamento">Problemas com pagamento</option>
                                <option value="vendedor">Problemas com vendedor</option>
                                <option value="bug">Relatar um bug</option>
                                <option value="duvidas">Dúvidas sobre o serviço</option>
                                <option value="outro">Outro</option>

                            </select>

                            <input value={email} onChange={e => setEmail(e.target.value)}
                                className="form-control col-md-6" type="email" placeholder="E-mail"></input>
                        </div>
                        <div className="row">
                            <input value={title} onChange={e => setTitle(e.target.value)}
                                className="form-control" type="text" placeholder="Título"></input>
                        </div>
                        <div className="row">
                            <textarea value={description} onChange={e => setDescription(e.target.value)}
                                className="form-control" placeholder="Descrição" maxLength="1000" rows="6" />
                        </div>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Enviar</button>


                </form>

            </div>
        </div>
    )
}

export default Contact