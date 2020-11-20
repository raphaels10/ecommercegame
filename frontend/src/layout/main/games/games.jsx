import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PacmanLoader } from 'react-spinners'
import { FaFrown } from 'react-icons/fa'
import getImage from '../../../common/functions/getgameimage'

import Product from '../product'

import './games.css'

const BASE_URL = "http://localhost:3001"

function Games(params) {
    const { gamename } = params.match.params
    const parsedGameName = gamename.split("-").length > 1 ? gamename.split("-").join(" ") : gamename
    const gameImage = getImage(parsedGameName) 

    const [productList, setProductList] = useState([])
    const [loading, setLoading] = useState(true)

    console.log(productList)

    useEffect(() => {
        axios.get(`${BASE_URL}/products?game=${parsedGameName}`).then(r => {
            setProductList(r.data)
            setLoading(false)
        })
            .catch(e => {
                console.log(e)
                setLoading(false)
            })
    }, [])

    function renderContent() {
        if (loading) {
            return (
                <div className="spinner-container">
                    <PacmanLoader color="yellow" size={36} />
                </div>
            )
        }
        if (!loading && productList.length === 0) {
            return (
                <div className="d-flex align-items-center justify-content-center flex-grow-1 vh-100">
                    <p style={{ fontSize: "32px" }}
                        className="no-product">Nenhum produto encontrado <FaFrown className="ml-1" /></p>
                </div>
            )
        }
        if (!loading && productList.length > 0) {
            return (
                <>
                    <div className="game-header">
                        {gameImage ? 
                         <>
                         <img src={gameImage} alt={parsedGameName}/>
                         <h2>Produtos para o jogo {parsedGameName}</h2>
                         </>
                        :
                        <p>Produtos para o jogo {parsedGameName}!</p>
                        }
                    </div>
                    <div className="main-products-container">
                        {productList.map(product => (
                            <Product key={product._id} image={product.images[0]} alt={product.game} label="Comprar"
                                title={product.game} dark subtitle={product.name} link={product._id} />
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

export default Games