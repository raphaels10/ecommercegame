import React from 'react'
import {FiMessageCircle} from 'react-icons/fi'

import './footer.css'

function Footer(params) {


    return (
        <footer className="page-footer font-small pt-4 footer-custom blue">
            <div className="container-fluid text-center text-md-left ml-md-4 mr-md-4">
                <div className="row">

                    <div className="col-md-6 mt-3 mt-md-0">
                        <h3 className="text-uppercase">Wolfstore</h3>
                        <p>A Wolfstore é um site de comércio eletrônico de produtos para jogos.
                            Aqui você pode anunciar seu próprio produto e comprar de outros usuários!
                        </p>
                    </div>

                    <hr className="clearfix w-100 d-md-none pb-3"/>

                    <div className="col-md-3 mb-md-0 mb-3">
                        <h3 className="text-uppercase">Minha conta</h3>
                        <ul className="list-unstyled">
                            <li>
                                <a href="/myaccount">Minha conta</a>
                            </li>
                            <li>
                                <a href="/cart">Meu carrinho</a>
                            </li>
                            <li>
                                <a href="/create">Anunciar produto</a>
                            </li>
                        </ul>
                    </div>

                    <div className="col-md-3 mb-md-0 mb-3 d-md-flex align-items-center">
                        <div className="mb-md-3">
                            <FiMessageCircle size={36}/> <a className="footer-ticket" href="/contact-us">Abrir ticket</a>
                        </div>
                    </div>

                </div>

            </div>

            <div className="footer-copyright text-center py-3 copyright-custom">
            © 2020 Copyright: <a href="/">WolfStore</a>
            </div>
        </footer>
    )
}

export default Footer