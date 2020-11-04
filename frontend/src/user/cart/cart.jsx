import React, {useState} from 'react'
import { useCookies } from 'react-cookie'
import { FaTrash } from 'react-icons/fa'

import './cart.css'

function Cart(params) {
    const [cookies, setCookie, removeCookie] = useCookies(["cart"])
    console.log("render")
    const [cart_products, setCartProducts] = useState(cookies.cart)

    function renderRows() {
        if(cart_products instanceof Array && cart_products.length > 0) {
            return cart_products.map(p => (
                <tr key={p.id}>
                    <td>
                        <div className="cart-item-container">
                            <img className="cart-product-image d-sm-none d-lg-inline-block" src={p.image}/>
                            <span>{p.name}</span>
                        </div>
                    </td>
                    <td>{p.game}</td>
                    <td>{p.quantity}</td>
                    <td>{p.value.toFixed(2)}</td>
                    <td>
                        <button onClick={() => deleteFromCart(p.id)} 
                        type="button" className="btn bg-transparent p-0 m-0">
                            <FaTrash color="red"/>
                        </button>
                    </td>
                </tr>
            ))
        }
        else {
            return null
        }
    }

    function deleteFromCart(id) {
        console.log(id)
        console.log(cart_products)
        const refreshedCart = cart_products.filter(p => p.id !== id)
        setCartProducts(refreshedCart)
        setCookie("cart", JSON.stringify(refreshedCart), 
        {path: "/", expires: new Date(new Date().getTime()+ 24*60*60*1000)})

    }

    function getTotal() {
        if(cart_products instanceof Array && cart_products.length === 1) {
            return cart_products[0].value
        }
        try {
            return cart_products.reduce((a, b) => a.value + b.value)
        }
        catch (e) {
            return 0
        }
    }

    function clearCart() {
        setCartProducts([])
        removeCookie("cart")
    }


    return (
        <div className="cart-container">
            <table className="table">
                <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Jogo</th>
                        <th>Quantidade</th>
                        <th>Valor</th>
                        <th>Ação</th>
                    </tr>
                </thead>

                <tbody>
                    {renderRows()}
                </tbody>
            </table>
            <p className="cart-total">
                Valor total: R${getTotal().toFixed(2)}
            </p>
            <div className="cart-button-container">
                <button type="button" onClick={clearCart} className="btn btn-secondary">Limpar carrinho</button>
                <button type="button" className="btn btn-primary">Finalizar compra</button>
            </div>
        </div>
    )
}

export default Cart