import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {toastr} from 'react-redux-toastr'
import { FaTrash } from 'react-icons/fa'
const BASE_URL = "http://localhost:3001"


function History(params) {
    const token = localStorage.getItem("user-session") ? JSON.parse(localStorage.getItem("user-session")).token : ''
    const [productsId, setProductsId] = useState([])
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.post(`${BASE_URL}/userdata`, { token }, {
            withCredentials: true
        }).then(r => {
            setProductsId(r.data.productsId)
        })
    }, [])

    useEffect(() => {
        const mapProducts = async () => {
            let productsArray = []
            for (const id of productsId) {
                const response = await axios.get(`${BASE_URL}/products/${id}`)
                productsArray.push(response.data)
            }
            setProducts(productsArray)
        }
        mapProducts()
    }, [productsId])

    function deleteProduct(productId) {
        console.log(productId)
        axios.delete(`${BASE_URL}/products/${productId}`, {
            withCredentials: true, headers: {authorization: `BEARER ${token}`}}
            )
        .then(r => {
            toastr.success("Sucesso", r.data)
            const updatedProducts = products.filter(p => p._id != productId)
            setProducts(updatedProducts)
        })
        .catch(e => {
            try {
            console.log(e.response)
            const errors = e.response.data.error
            errors.forEach(e => toastr.error("Erro", e))
            }
            catch(e) {
                console.log(e)
            }
        })
    }

    return (
        <>
            <div className="product-buy">
                <table className="table product-table">
                    <thead>
                        <tr>
                            <th>Produto comprado</th>
                            <th>Nome do jogo</th>
                            <th>Quantia</th>
                            <th>Vendedor</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>

            </div>

            <div className="product-sell">
                <table className="table product-table">
                    <thead>
                        <tr>
                            <th>Produto vendido</th>
                            <th>Nome do jogo</th>
                            <th>Qtd. total</th>
                            <th>Qtd. vendida</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td><Link to={`/products/${product._id}`}>{product.name}</Link></td>
                                <td>{product.game}</td>
                                <td>{product.stock}</td>
                                <td>0</td>
                                <td>
                                    <button className="btn bg-transparent m-0 p-0"
                                    onClick={() => {
                                        const confirmed = window.confirm("Deseja excluir o produto? Essa ação não poderá ser desfeita")
                                        if (confirmed) deleteProduct(product._id)
                                    }}>
                                        <FaTrash color="red"/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </>
    )
}



export default History