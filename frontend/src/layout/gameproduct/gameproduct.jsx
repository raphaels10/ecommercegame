import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { FaAngleDown, FaPencilAlt, FaShoppingCart, FaMinus, FaPlus } from 'react-icons/fa'
import './gameproduct.css'
const BASE_URL = "http://localhost:3001"


export default params => {
    const { id } = params.match.params
    const [product, setProduct] = useState()
    const [quantityCounter, setQuantityCounter] = useState(1)
    const [imageIndex, setImageIndex] = useState(0)
    useEffect(() => {
        axios.get(`${BASE_URL}/products/${id}`)
        .then(r => {
            setProduct(r.data)
        })
    }, [])

    if(!product) return <p>Carregando...</p>

    return (
        <div className="product-container">
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
                                                    <img src={image} alt={product.game}/>
                                                </button>
                                            </div>
                                        ))}                              
                                </div>                         
                        </div>
                        <div className="product-info-container">
                            <span className="product-info">
                                <FaPencilAlt size={16}/>Descrição do produto
                            </span>
                            <hr></hr>
                            <div className="product-description">
                                {product.description}
                                <p className="mt-3">
                                    <strong>Vendedor: </strong>
                                    <Link className="seller" to={`../users/${product.seller}`}>{product.seller}</Link>
                                    </p>                          
                            </div>
                            <div className="product-quantity">
                                <span className="product-info">
                                    <FaShoppingCart size={16}/>
                                    Comprar
                                </span>
                                <hr></hr>
                                <div className="quantity-regulator">
                                    <span> Quantidade: </span>
                                    <div className="button-div">
                                        <button type="button" disabled={quantityCounter <= 1} 
                                        onClick={() => setQuantityCounter(quantityCounter - 1)}> 
                                            <FaMinus size={20} color="rgb(240, 108, 0)"/>
                                        </button>
                                    </div>
                                     <p className="quantity-number">{quantityCounter} </p>
                                    <div className="button-div">
                                        <button type="button" disabled={quantityCounter >= product.stock}
                                        onClick={() => setQuantityCounter(quantityCounter + 1)}>
                                            <FaPlus size={20} color="rgb(240, 108, 0)"/>
                                        </button>
                                    </div>     
                                </div>
                                <div className="total-stock">
                                    <span> Quantidade disponível: </span>
                                    <p>{product.stock}</p>
                                </div>
                                <div className="quantity-regulator">
                                    <span> Valor: </span>
                                    <p className="total-price">R$ 
                                        {String((quantityCounter * product.price).toFixed(2)).replace(".", ",")}
                                    </p>
                                </div>

                            </div>
                            <button className="cart-submit "type="button">Adicionar ao carrinho</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}