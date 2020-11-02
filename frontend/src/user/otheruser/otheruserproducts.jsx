import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Product from '../../layout/main/product'
import { ClipLoader } from 'react-spinners'
import {FaFrown} from 'react-icons/fa'

const BASE_URL = "http://localhost:3001"

export default function OtherUserProducts(params) {
    const {username} = params
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    console.log(products)



    useEffect(() => {
        axios.post(`${BASE_URL}/finduser`, {username})
        .then(r => {
            const productsId = r.data.productsId
            axios.all(productsId.map(productId => axios.get(`${BASE_URL}/products/${productId}`)))
            .then(products => {
                const productsArray = products.map(product => product.data)
                setProducts(productsArray)
                setLoading(false)
            })
            .catch(e => console.log(e)) 
        })
        .catch(e => {
            console.log(e)
        })
    }, [])

    function renderProducts() {
        if(loading) {
            return (
                <div className="spinner-container-small">
                    <ClipLoader/>
                </div>
            )
        }

        if(!loading && products.length === 0) {
            return (
                <div className="d-flex align-items-center justify-content-center flex-grow-1">
                    <p className="no-product">Sem produtos registrados <FaFrown className="ml-1"/></p>
                </div>
            )
        }

        if(!loading && products.length > 0) {
            return (
                <div className="other-user-products-container">
                    {products.map(product => (
                        <Product mini key={product._id} image={product.images[0]}
                         alt={product.game} label="Comprar" title={product.game} dark subtitle={product.name} 
                         link={product._id}/>
                    ))}
                </div>
            )
        }
    }

    return (
        <div className="other-user-products">
            <h2>Produtos do usuário</h2>
            {renderProducts()}
        </div>
    )
}

