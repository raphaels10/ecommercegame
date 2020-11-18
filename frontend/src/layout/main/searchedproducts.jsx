import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Product from './product'
import {FaFrown} from 'react-icons/fa'
import {PacmanLoader} from 'react-spinners'

import './searchedproducts.css'

const BASE_URL = "http://localhost:3001"

function SearchedProducts(params) {
    const [filteredProducts, setFilteredProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const { productname } = params.match.params

    console.log(filteredProducts)

    useEffect(() => {
        axios.get(`${BASE_URL}/products?name=${productname}`).then(r => {
            const products = r.data
            setFilteredProducts(products)
            setLoading(false)
        })
        .catch(e => {
            console.log(e)
        })
    }, [productname])

    function renderContent() {
        if (loading) {
            return (
                <div className="spinner-container">
                    <PacmanLoader color="yellow" size={36}/>
                </div>
            )
        }
        if (!loading && filteredProducts.length === 0) {
            return (
                <div className="d-flex align-items-center justify-content-center flex-grow-1 vh-100">
                    <p style={{fontSize: "32px"}}
                    className="no-product">Nenhum produto encontrado <FaFrown className="ml-1"/></p>
                </div>
            )
        }
        if(!loading && filteredProducts.length > 0) {
            return (
                <>
                <h3 className="searched-products">
                    {filteredProducts.length} resultado(s) encontrado(s)

                </h3>
                <div className="main-products-container">
                    {filteredProducts.map(product => (
                        <Product key={product._id} image={product.images[0]} alt={product.game} label="Comprar" 
                        title={product.game} dark subtitle={product.name} link={product._id}/>
                    ))}
                </div>
                </>
            )
        }


    }
    
    return (
        renderContent()
    )
}

export default SearchedProducts