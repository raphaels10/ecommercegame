import React, { useState, useEffect } from 'react'
import './nav.css'
import logo from '../assets/images/wolf-logo.png'
import { connect } from 'react-redux'
import { validateToken } from '../auth/authActions' 
import {
    Nav, NavItem, NavbarToggler, Navbar, UncontrolledDropdown, DropdownMenu, DropdownItem,
    DropdownToggle, Collapse, NavLink, NavbarBrand
} from 'reactstrap'
import If from '../operators/if'

function NavBar(params) {
    const [isOpen, setIsOpen] = useState(false)
    const {token} = JSON.parse(localStorage.getItem("user-session")) || ''
    useEffect(() => {
        params.verifyToken(token)
        
      } , [])

    const toggle = () => setIsOpen(!isOpen)

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
                            <input className="form-control mr-sm-2 w-100" type="search" placeholder="Busque um produto" aria-label="Search"/>
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
                            <DropdownItem className="mt-0 d-none d-lg-block" divider/>
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
                    <NavItem>
                        <NavLink href="/">Jogos</NavLink>
                    </NavItem>
                    <NavItem className="d-none d-lg-block">
                        <form class="form-inline">
                            <input className="nav-searchbar form-control mr-sm-2" type="search" placeholder="Busque um produto" aria-label="Search"/>
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Buscar</button>
                        </form>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/create">Anunciar produto</NavLink>
                    </NavItem>
                    <NavItem className="ml-3">
                    <NavLink href="/partner">Seja um parceiro</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>

        </Navbar>
    )
}

const mapDispatchToProps = dispatch => ({
    verifyToken(token){
        dispatch(validateToken(token))
    }
})

const mapStateToProps = state => (state.auth)
export default connect(mapStateToProps, mapDispatchToProps)(NavBar)