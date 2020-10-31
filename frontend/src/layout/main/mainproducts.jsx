import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import {getProducts} from './store/productActions'
import './mainproducts.css'
import Product from './product'
import getGameImage from '../../common/functions/getgameimage'


function MainProducts(params) {

    useEffect(() => {
        params.fetchProducts()
    },[])

    


    function renderPage(){
        const productsList = params.productsList
        return productsList.filter(product => product.isMain).map(product => (
            <Product key={product._id} image={product.images[0]} alt={product.game} label="Comprar" 
            title={product.game} dark subtitle={product.name} link={product._id}/>
        ))
    }

    return (
        <>
        <h2 className="main-products-title">Produtos principais</h2>
        <div className="main-products-container">
            {renderPage()}
        </div>
        </>
    )
}

const mapDispatchToProps = dispatch => ({
    fetchProducts(){
        dispatch(getProducts())
    }
})
const mapStateToProps = state => ({productsList: state.product.productsList})
export default connect(mapStateToProps, mapDispatchToProps)(MainProducts)