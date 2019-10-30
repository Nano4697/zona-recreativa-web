// npm install react-bootstrap bootstrap

import React, {Component} from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Image from 'react-bootstrap/Image'
import Badge from 'react-bootstrap/Badge'
import Link from 'next/link';
import '../style/fullPage.css'

class Navigation extends Component {
    render() {
        return (<Navbar className="sticky-top " collapseOnSelect="collapseOnSelect" expand="md" style={{background: "#f5616f"}} /* bg="light" variant="light"*/>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse className="justify-content-between" id="responsive-navbar-nav">
                <Navbar.Brand className="d-none d-md-block col-xl-2 col-2 ml-lg-5 ml-0 mr-0 px-0">
                    <Link href="/">
                        <a className="nav-link">
                            <Image className="" src="https://firebasestorage.googleapis.com/v0/b/zona-recreativa-cr.appspot.com/o/res%2Flogo-2.png?alt=media&token=5af0e6da-07e4-490e-8d61-bebc7b456ce3"  style={{cursor:'pointer', height: "40px" }} fluid/>
                        </a>
                    </Link>
                </Navbar.Brand>
                {/*

                Primera seccion de la barra de navegacion. Incluye Catalogo, Galeria e Informacion

                 */
                }
                <Nav className="pl-xl-5 pl-lg-4 pl-md-0 pl-4 col-xl-8 col-lg-9 col-10 pr-0">
                    <Link href="/">
                        <a className="nav-link px-xl-3 px-lg-2 px-sm-0 mx-md-2 d-sm-none text-light font-weight-bold">
                            Inicio
                        </a>
                    </Link>
                    <Link href="/catalogo">
                        <a className="nav-link px-xl-3 px-lg-2 pl-md-0 pr-md-0 ml-md-0 mr-md-2 text-light font-weight-bold">
                            Catálogo
                        </a>
                    </Link>
                    <Link href="/galeria">
                        <a className="nav-link px-xl-3 px-lg-2 pl-md-1 pr-md-0 mx-md-2 text-light font-weight-bold">
                            Galería
                        </a>
                    </Link>
                    <Link href="/informacion">
                        <a className="nav-link px-xl-3 px-lg-2 pl-md-1 pr-md-0 mx-md-2 text-light font-weight-bold">
                            Información
                        </a>
                    </Link>
                    <Link href="/proveedores">
                        <a className="nav-link px-xl-3 px-lg-2 pl-md-1 pr-md-0 mx-md-2 text-light font-weight-bold">
                            Proveedores
                        </a>
                    </Link>
                    <Link href="/contact">
                        <a className="nav-link px-xl-3 px-lg-2 pl-md-1 pr-md-0 mx-md-2 text-light font-weight-bold">
                            Contacto
                        </a>
                    </Link>
                    <Link href="/about">
                        <a className="nav-link px-xl-3 px-lg-2 pl-md-1 pr-md-0 mx-md-2 text-light font-weight-bold">
                            Acerca de
                        </a>
                    </Link>
                    <Link href="/adminLogin">
                        <a className="nav-link px-xl-3 px-lg-2 pl-md-1 pr-md-0 mx-md-2 text-light font-weight-bold">
                            Admin
                        </a>
                    </Link>
                </Nav>
        </Navbar.Collapse>


        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"/>
    </Navbar>);
    }
}

export default Navigation
