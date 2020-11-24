import React, { useState } from 'react'
import { storage } from '../firebase'
import { connect } from 'react-redux'
import { FaPlus, FaRProject } from 'react-icons/fa'
import axios from 'axios'
import { toastr } from 'react-redux-toastr'


const BASE_URL = "http://localhost:3001"

function EditRegistration(params) {
    const init_name = params.name || ''
    const [name, setName] = useState(init_name)
    const [profilePic, setProfilePic] = useState([])
    const [isChangingPass, setIsChangingPass] = useState(false)
    const [actualPass, setActualPass] = useState("")
    const [newPass, setNewPass] = useState("")
    const [confirmNewPass, setConfirmNewPass] = useState("")

    const token = localStorage.getItem("user-session") ? JSON.parse(localStorage.getItem("user-session")).token : ''


    function handleNewProfilePic(e) {
        if (e.target.files.length > 0) {
            setProfilePic([e.target.files[0]])
        }
    }

    function handleSubmit(e) {


        e.preventDefault()
        if (profilePic.length === 0) {
            axios.post(`${BASE_URL}/changeuserinfo`, { name, csrf_token: token, actualPassword: actualPass, 
            newPassword: newPass, confirmNewPassword: confirmNewPass}, 
            { withCredentials: true })
                .then(r => toastr.success("Sucesso", r.data))
                .catch(e => {
                    const errors = e.response.data.error
                    errors.forEach(e => toastr.error("Erro", e))
                })
        }
        else {
            console.log(profilePic)
            const uploadTask = storage.ref(`/profilepics/${profilePic[0].name}`).put(profilePic[0])
            uploadTask.on("state_changed", snapshot => { }, error => { },
                () => {
                    storage.ref(`/profilepics/${profilePic[0].name}`).getDownloadURL()
                        .then(fileUrl => {
                            axios.post(`${BASE_URL}/changeuserinfo`, { name, fileUrl, csrf_token: token,
                                 actualPassword: actualPass, 
                                newPassword: newPass, confirmNewPassword: confirmNewPass },
                             { withCredentials: true })
                            .then(r => toastr.success("Sucesso", r.data))
                            .catch(e => {
                                const errors = e.response.data.error
                                errors.forEach(e => toastr.error("Erro", e))
                            })
                        })
                        .catch(e => console.log(e))
                })
        }
    }

    return (
        <div className="user-edit-registration" style={{ textAlign: "left" }}>
            <form onSubmit={handleSubmit}>
                <div className="form-group col-lg-6 col-md-9">
                    <label className="text-left ml-1" for="edit-name">Nome  </label>
                    <input id="edit-name" type="text" onChange={e => setName(e.target.value)}
                        value={name} className="form-control" />
                </div>
                <div className="form-group col-lg-6 col-md-9">
                    <label className="text-left ml-1" for="edit-profile-pic">
                        Alterar foto de perfil
                        <div>
                            {profilePic.length > 0
                                &&
                                <div className="profile-pic-view">
                                    <img src={URL.createObjectURL(profilePic[0])} />
                                </div>
                            }
                            <div className="div-file">
                                <FaPlus color="#999" />
                            </div>
                        </div>
                    </label>
                    <input onChange={handleNewProfilePic}
                        style={{ display: "none" }} id="edit-profile-pic" type="file" />
                </div>
                <div className="form-group col-lg-6 col-md-9">
                    <input id="enable-change-pass" type="checkbox"
                        name="enable-change-pass" onChange={e => {
                            setIsChangingPass(!isChangingPass)
                            setActualPass("")
                            setConfirmNewPass("")
                            setNewPass("")
                            }} checked={isChangingPass} />
                    <label for="enable-change-pass">Alterar senha</label>
                </div>
                <div className="form-group col-lg-6 col-md-9">
                    <label className="text-left ml-1" for="actual-pass">Senha atual</label>
                    <input disabled={!isChangingPass} value={actualPass} onChange={e => setActualPass(e.target.value)}
                        id="actual-pass" type="password" className="form-control" />
                </div>
                <div className="form-group col-lg-6 col-md-9">
                    <label className="text-left ml-1" for="new-pass">Nova senha</label>
                    <input disabled={!isChangingPass} value={newPass} onChange={e => setNewPass(e.target.value)}
                        id="new-pass" type="password" className="form-control" />
                </div>
                <div className="form-group col-lg-6 col-md-9">
                    <label className="text-left ml-1" for="confirm-new-pass">Confirmar nova senha</label>
                    <input disabled={!isChangingPass} value={confirmNewPass} onChange={e => setConfirmNewPass(e.target.value)}
                        id="confirm-new-pass" type="password" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary ml-3">Alterar Dados</button>

            </form>
        </div>
    )
}
const mapStateToProps = state => ({ name: state.auth.name })
export default connect(mapStateToProps)(EditRegistration)