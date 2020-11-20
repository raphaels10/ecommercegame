import React, {useState} from 'react'
import { BounceLoader } from 'react-spinners'
import { toastr } from 'react-redux-toastr'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'

import './createpost.css'
import './theme.css'

import AutoSuggest from 'react-autosuggest'
import {storage} from '../firebase'
import axios from 'axios'
import {FiPlus, FiX} from 'react-icons/fi'
const BASE_URL = "http://localhost:3001"

const gameList = [
    {name: "League of Legends"},
    {name: "Albion Online"},
    {name: "Fall Guys"},
    {name: "Runescape"},
    {name: "World of Warcraft"},
    {name: "Tibia"},
    {name: "Fortnite"},
    {name: "The Elder Scrolls Online"},
    {name: "Counter-Strike: Global Offensive"}
]


function CreatePost (params) {
    const [loading, setLoading] = useState(false)
    const [game, setGame] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [stock, setStock] = useState(0)
    const [price, setPrice] = useState(0)
    const [files, setFiles] = useState([])
    const [filesURL, setFilesURL] = useState([])

    const [suggestions, setSuggestions] = useState([])

    async function onSubmit(e) {
        setLoading(true)
        const arrayFromFilesURL = []
        e.preventDefault()
        for(let file of files){
            try {
                const fileURL = await uploadToFirebase(file)
                arrayFromFilesURL.push(fileURL)
            }
            catch(e){
                setLoading(false)
                toastr.error("Erro", e)
                return
            }
        }
        const token = JSON.parse(localStorage.getItem("user-session")).token || ''
        axios.post(`${BASE_URL}/products`,
         JSON.stringify({token, name, game, description, stock, price, images: arrayFromFilesURL}), {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        }).then(r => {
            setLoading(false)
            params._push('/')
            toastr.success("Sucesso", "Produto adicionado ao site!")
        }).catch(e => {
            setLoading(false)
            const { error } = e.response.data
            error.forEach(e => toastr.error("Erro", e))
        })
    }

    function handleImages(e) {
        const arrayFromFiles = Array.from(e.target.files)
        const selectedFiles = [...files].concat(arrayFromFiles)
        if (selectedFiles.length > 4) {
            e.preventDefault()
            alert("Envie até 4 arquivos")
            return
        }
        if (arrayFromFiles.some(file => file.size > 300*1024)) {
            e.preventDefault()
            alert("Cada arquivo deve ter tamanho máximo de 300Kb")
            return
        }
        setFiles(selectedFiles)
    }

    function removeImage(index) {
        let copyOfFiles = [...files]
        copyOfFiles.splice(index, 1)
        setFiles(copyOfFiles)
    }

    async function uploadToFirebase(file){
        return new Promise((res, reject) => {
            const uploadTask = storage.ref(`/produtos/${file.name}`).put(file)
        uploadTask.on(
            "state_changed",
            snapshot => {},
            err => {
                reject("Falha ao hospedar arquivo. Tente novamente mais tarde")
            },
            () => {
                storage.ref('produtos').child(file.name).getDownloadURL().then(url => {
                    res(url)
                })
                .catch(e => {
                    reject("Falha ao hospedar arquivo. Tente novamente mais tarde")
                })
            }
        )
        })
        
    }

    const getSuggestions = value => {
        const inputValue = value.trim().toLowerCase()
        const inputLength = inputValue.length

        console.log(inputValue)

        return inputLength === 0 ? [] : gameList.filter(game => (
            game.name.toLowerCase().includes(inputValue)
        ))
    }

    const onSuggestionsFetchRequested = ({value}) => {
        setSuggestions(getSuggestions(value))
    }
    
    const getSuggestionValue = suggestion => suggestion.name

    const renderSuggestion = suggestion => (
        <div>
            {suggestion.name}
        </div>
    )

    const onSuggestionsClearRequested = () => {
        setSuggestions([])
    }

    return (
        <div className={loading ? "transparent" : ""}>
            <div className="loader-container">
                <BounceLoader size={52} loading={loading}></BounceLoader>
            </div>
            <div className="form-wrapper">
                <form className="form-signin" onSubmit={onSubmit}>
                    <div className="container">
                     <div className="row">
                        <div className="col-md-6" style={{padding: "0px"}}>
                            <AutoSuggest inputProps={{
                                placeholder: "Informe o jogo",
                                autoComplete: "off",
                                className: "form-control",
                                name: "game",
                                id: "game",
                                value: game,
                                onChange: (_event, { newValue }) => {
                                    setGame(newValue)
                                }
                            }} suggestions={suggestions}
                            onSuggestionsFetchRequested={onSuggestionsFetchRequested} 
                            onSuggestionsClearRequested={onSuggestionsClearRequested}
                            getSuggestionValue={getSuggestionValue}
                            renderSuggestion={renderSuggestion}
                            onSuggestionSelected={(e, {suggestion, method}) => {
                                if (method === "enter") {
                                    e.preventDefault()
                                }
                            }}
                            />
                        </div>
                        <input disabled={loading} name="name" id="name" placeholder="Nome do produto" type="text"
                        required className="col-md-6 form-control" value={name} onChange={e => setName(e.target.value)} />
                        <textarea disabled={loading} name="description" id="description" placeholder="Descrição do produto"
                        required className="form-control" maxLength="250" rows="5"
                        value={description} onChange={e => setDescription(e.target.value)} />
                     </div>

                     <div className="inline-form row">
                        <div className="col-lg-4 col-sm-6 col-xs-10 mb-2">
                                <label className="creation-label" htmlFor="stock">Quantidade disponível </label>
                                <input disabled={loading} className="form-control" name="stock" id="stock" type="number" 
                                value={stock} onChange={e => setStock(e.target.value)} required/>
                        </div>
                        <div className="col-lg-4 col-sm-6 col-xs-10 mb-2">
                            <label className="creation-label" htmlFor="price">Preço de uma unidade</label>
                            <input disabled={loading} name="price" className="form-control" id="price" type="number" 
                            value={price} onChange={e => setPrice(e.target.value)} required/>
                        </div>
                        <div className="col-lg-4 col-sm-6 col-xs-8 text-center mx-auto">
                                <p>Selecione até quatro imagens</p>
                                <div className="file-preview">
                                    {files.map((file, index) => (
                                        <div key={index}className="image-button-wrapper">
                                            <img src={URL.createObjectURL(file)}/>
                                            <button disabled={loading} type="button" className="btn bg-transparent p-0"
                                            onClick={() => removeImage(index)}>
                                                <FiX size={14} color="white"/>
                                            </button>
                                        </div>
                                    ))}
                                    <label className="creation-label" htmlFor="images">                                      
                                            <FiPlus size={26} color="#B8B8B8"/>                                       
                                    </label>
                                </div>
                              
                            <input disabled={loading} id="images" type="file" onChange={handleImages} multiple
                            accept="image/*"></input>
                        </div>    
                     </div>
                     </div>

                    
                    <button disabled={loading} className="btn btn-lg btn-primary btn-block" type="submit">Anunciar</button>
                </form>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    _push(value){
        dispatch(push(value))
    }
})

const mapStateToProps = state => ({productsAdded: state.auth.productsAdded})
export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)