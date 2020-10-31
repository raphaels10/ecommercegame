import React, { useEffect, useState } from 'react'
import axios from 'axios'
const BASE_URL = "http://localhost:3001"


function History(params) {
    const { token } = JSON.parse(localStorage.getItem("user-session")) || ''
    const [productsId, setProductsId] = useState([])
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.post("http://localhost:3001/userdata", { token }, {
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
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td>{product.name}</td>
                                <td>{product.game}</td>
                                <td>{product.stock}</td>
                                <td>0</td>
                                <td>Ativo</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </>
    )
}



export default History