import React, { useState, useEffect } from 'react'
import './nav.css'
import logo from '../assets/images/wolf-logo.png'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { store } from '../index'
import { validateToken } from '../auth/authActions'
import {
    Nav, NavItem, NavbarToggler, Navbar, UncontrolledDropdown, DropdownMenu, DropdownItem,
    DropdownToggle, Collapse, NavLink, NavbarBrand
} from 'reactstrap'
import If from '../operators/if'

function NavBar(params) {
    const [isOpen, setIsOpen] = useState(false)
    const [searchedProduct, setSearchedProduct] = useState("")
    const token = localStorage.getItem("user-session") ? JSON.parse(localStorage.getItem("user-session")).token : ''

    useEffect(() => {
        params.verifyToken(token)

    }, [])

    const toggle = () => setIsOpen(!isOpen)

    function handleSubmit(e) {
        e.preventDefault()
        store.dispatch(push(`/search/${searchedProduct}`))
    }

    return (
        <Navbar dark color="dark" expand="lg">
            <NavbarBrand href="/main">
                <img src={logo} alt="logotipo" />
                <span className="nav-logo-text">WolfStore</span>
            </NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto flex-grow-1 justify-content-between" navbar>
                    <NavItem className="d-lg-none">
                        <form class="form-inline mobile-searchbar">
                            <input className="form-control mr-sm-2 w-100" type="search" placeholder="Busque um produto" aria-label="Search" />
                        </form>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            Olá, {params.name || 'visitante'}!
                        </DropdownToggle>
                        <DropdownMenu className="text-center bg-dark text-white" right>
                            <DropdownItem>
                                <a className="anchor-dropdown"
                                    href={(params.validated && params.name) ? "/myaccount" : "/login"}>
                                    Minha conta
                                </a>
                            </DropdownItem>
                            <DropdownItem>
                                <a className="anchor-dropdown" href="/cart">Meu carrinho</a>
                            </DropdownItem>
                            <DropdownItem className="mt-0 d-none d-lg-block" divider />
                            <DropdownItem>
                                <If test={params.validated}>
                                    <a className="anchor-dropdown" href="/logout">Sair</a>
                                </If>
                                <If test={!params.validated}>
                                    <a className="anchor-dropdown" href="/login">Entrar</a>
                                </If>

                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            Jogos
                        </DropdownToggle>
                        <DropdownMenu className="text-center bg-dark text-white multi-column-dropdown" right>
                            <div className="row">
                                <div className="col-lg-6">
                                    <DropdownItem>
                                        <a className="anchor-dropdown" href="/games/albion-online">Albion Online</a>
                                    </DropdownItem>
                                </div>
                                <div className="col-lg-6">
                                    <DropdownItem>
                                        <a className="anchor-dropdown" href="/games/fall-guys">Fall Guys</a>
                                    </DropdownItem>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <DropdownItem>
                                        <a className="anchor-dropdown" href="/games/fortnite">Fortnite</a>
                                    </DropdownItem>
                                </div>
                                <div className="col-lg-6">
                                    <DropdownItem>
                                        <a className="anchor-dropdown" href="/games/league-of-legends">League of Legends</a>
                                    </DropdownItem>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <DropdownItem>
                                        <a className="anchor-dropdown" href="/games/runescape">Runescape</a>
                                    </DropdownItem>
                                </div>
                                <div className="col-lg-6">
                                    <DropdownItem>
                                        <a className="anchor-dropdown" href="/games/world-of-warcraft">World of Warcraft</a>
                                    </DropdownItem>
                                </div>
                            </div>
                            <DropdownItem divider/>
                            <DropdownItem>
                                <a className="anchor-dropdown" href="/games/others">Outros</a>
                            </DropdownItem>

                        </DropdownMenu>
                    </UncontrolledDropdown>
                    <NavItem className="d-none d-lg-block">
                        <form class="form-inline" onSubmit={handleSubmit}>
                            <input value={searchedProduct} onChange={e => setSearchedProduct(e.target.value)}
                                className="nav-searchbar form-control mr-sm-2" type="search" placeholder="Busque um produto" aria-label="Search" />
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Buscar</button>
                        </form>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/create">Anunciar produto</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/contact-us">Entrar em contato</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>

        </Navbar>
    )
}

const mapDispatchToProps = dispatch => ({
    verifyToken(token) {
        dispatch(validateToken(token))
    }
})

const mapStateToProps = state => (state.auth)
export default connect(mapStateToProps, mapDispatchToProps)(NavBar)