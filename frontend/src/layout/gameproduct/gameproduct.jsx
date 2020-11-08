import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { FaAngleDown, FaPencilAlt, FaShoppingCart, FaMinus, FaPlus } from 'react-icons/fa'
import './gameproduct.css'
import { useCookies } from 'react-cookie'

import CommentBox from '../main/comments/commentbox'
import SubmitComment from '../main/comments/submitcomment'

import '../../common/styles/buttoncontainer.css'

const BASE_URL = "http://localhost:3001"

function GameProduct(params) {
    const { token } = JSON.parse(localStorage.getItem("user-session")) || ''

    const [cookies, setCookie] = useCookies(["cart"])
    const { id } = params.match.params
    const { user } = params
    const [product, setProduct] = useState()
    const [quantityCounter, setQuantityCounter] = useState(1)
    const [imageIndex, setImageIndex] = useState(0)
    const [isEditingDesc, setIsEditingDesc] = useState(false)
    const [isEditingQnt, setIsEditingQnt] = useState(false)
    const [description, setDescription] = useState("")
    const [quantity, setQuantity] = useState(0)
    const [price, setPrice] = useState(0)

    console.log(params.user)


    useEffect(() => {
        fetchData()
    }, [])

    function setCart() {
        const cartProduct = {
            name: product.name, game: product.game, quantity: quantityCounter,
            value: quantityCounter * product.price, id: product._id, image: product.images[0]
        }
        if (user === product.seller) {
            toastr.error("Erro", "Você não pode adicionar um produto seu ao carrinho")
            return
        }

        if (cookies.cart instanceof Array) {
            if (cookies.cart.some(p => p.id === product._id)) {
                toastr.error("Erro", "Esse produto já foi adicionado ao carrinho")
                return
            }
        }

        if (!cookies.cart) {
            setCookie("cart", JSON.stringify([cartProduct]),
                { path: "/", expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000) })
            toastr.success("", "Produto adicionado ao carrinho")
        }
        else {
            const cart = [...cookies.cart]
            cart.push(cartProduct)
            setCookie("cart", JSON.stringify(cart),
                { path: "/", expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000) })
            toastr.success("", "Produto adicionado ao carrinho")
        }
    }

    function fetchData() {
        axios.get(`${BASE_URL}/products/${id}`)
            .then(r => {
                setProduct(r.data)
                setDescription(r.data.description)
                setQuantity(r.data.stock)
                setPrice(r.data.price)
            })
            .catch(e => {
                console.log("Erro")
                console.log(e.response)
            })
    }

    function updateProduct(event, trigger) {
        event.preventDefault()
        const productId = product._id
        console.log(token)
        axios.put(`${BASE_URL}/products`, { token, price, quantity, description, productId}, 
        {withCredentials: true})
        .then(r => {
            console.log(r.data)
            if(trigger === "qnt") setIsEditingQnt(false)
            if(trigger === "desc") setIsEditingDesc(false)
        })
        .catch(e => console.log(e.response))

    }

    

    if (!product) return <p>Carregando...</p>

    return (
        <div>
            <h1 className="game-product-headline">{product.game}</h1>
            <h2 className="product-headline">{product.name}</h2>
            <FaAngleDown size={100} color="purple" />
            <div className="product-content">
                <div className="game-product-container">
                    <div className="inner-container">
                        <div className="game-image-container">
                            <img src={product.images[imageIndex]} alt={product.game}></img>
                            <div className="image-list">
                                {product.images.map((image, index) => (
                                    <div key={index}
                                        className={`image-thumb ${imageIndex === index ? "active-image" : ""}`}>
                                        <button className="image-selector" onClick={() => setImageIndex(index)}>
                                            <img src={image} alt={product.game} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="product-info-container">
                            <span className="product-info">
                                <FaPencilAlt size={16} />Descrição do produto
                                {user === product.seller ?
                                    <span onClick={() => setIsEditingDesc(true)} className="edit-product">Editar</span>
                                    : ""}
                            </span>
                            <hr></hr>

                            {isEditingDesc ? <form onSubmit={e => updateProduct(e, "desc")}>
                                <textarea className="form-control" onChange={e => setDescription(e.target.value)}
                                 value={description}/>
                                <div className="button-container">
                                    <button type="button" onClick={() => setIsEditingDesc(false)} className="btn btn-secondary">Cancelar</button>
                                    <button type="submit" className="btn btn-primary">Atualizar</button>
                                </div>
                            </form> :
                                <div className="product-description">
                                    {description}
                                    <p className="mt-3">
                                        <strong>Vendedor: </strong>
                                        <Link className="seller" to={`../users/${product.seller}`}>{product.seller}</Link>
                                    </p>
                                </div>}

                            <div className="product-quantity">
                                <span className="product-info">
                                    <FaShoppingCart size={16} />
                                    Comprar
                                    {user === product.seller ?
                                        <span onClick={() => setIsEditingQnt(true)} className="edit-product">Editar</span>
                                        : ""}
                                </span>
                                <hr></hr>
                                <div className="quantity-regulator">
                                    <span> Quantidade: </span>
                                    <div className="button-div">
                                        <button type="button" disabled={quantityCounter <= 1}
                                            onClick={() => setQuantityCounter(quantityCounter - 1)}>
                                            <FaMinus size={20} color="rgb(240, 108, 0)" />
                                        </button>
                                    </div>
                                    <p className="quantity-number">{quantityCounter} </p>
                                    <div className="button-div">
                                        <button type="button" disabled={quantityCounter >= quantity}
                                            onClick={() => setQuantityCounter(quantityCounter + 1)}>
                                            <FaPlus size={20} color="rgb(240, 108, 0)" />
                                        </button>
                                    </div>
                                </div>
                                <div className="total-stock">
                                    <span> Quantidade disponível: </span>
                                    {isEditingQnt ? 
                                    <input className="input-edit-product" type="number" onChange={e => setQuantity(e.target.value)} value={quantity}/>
                                     : 
                                    <p>{quantity}</p>}
                                    
                                </div>
                                <div className="quantity-regulator">
                                    <span> Valor: </span>
                                    {isEditingQnt ? <input className="input-edit-product" type="number" onChange={e => setPrice(e.target.value)}
                                     value={price.toFixed(2)}/>
                                     :
                                        <p className="total-price">R$
                                            {String((quantityCounter * price).toFixed(2)).replace(".", ",")}
                                        </p>}
                                </div>

                            </div>
                            {isEditingQnt ? 
                            <button style={{backgroundColor: "blueviolet"}}
                            onClick={e => updateProduct(e, "qnt")} className="cart-submit" type="submit">Atualizar</button>
                            :
                            <button className="cart-submit" 
                            onClick={setCart} type="button">Adicionar ao carrinho</button>
                             }
                            
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom-container">
                <SubmitComment productId={id} refreshFunction={fetchData} />
                <div className="comment-box">
                    <CommentBox productId={id} refreshFunction={fetchData} commentList={product.comments} />
                </div>
            </div>

        </div>
    )
}

const mapStateToProps = state => ({ user: state.auth.user })

export default connect(mapStateToProps)(GameProduct)