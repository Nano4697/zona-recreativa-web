import React, {Component} from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Image from 'react-bootstrap/Image'
import Badge from 'react-bootstrap/Badge'
import Link from 'next/link';
import Router from 'next/router'
import '../style/fullPage.css'

import firebaseConfig from '../lib/firebase/firebase';

// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";

class AdminNavigation extends Component {

    constructor ()
    {
        super();

        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

        //Se necesita hacer bind a todas la funciones que se usen dentro de la clase.
        this.endSession = this.endSession.bind(this);
    }

    endSession()
    {
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            Router.push('/');
        }).catch(function(error) {
            // An error happened.
        });
    }

    render() {
        return (<Navbar className="sticky-top " collapseOnSelect="collapseOnSelect" expand="md" style={{background: "#f5616f"}} /* bg="light" variant="light"*/>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse className="justify-content-between" id="responsive-navbar-nav">
                {/*
                Logotipo que va en el centro
                 */
                }
                <Navbar.Brand className="d-none d-md-block col-xl-1 col-lg-1 col-2 ml-lg-5 ml-0 mr-0 px-0">
                    <Link href="/adminMain">
                        <Image className="" src="https://firebasestorage.googleapis.com/v0/b/zona-recreativa-cr.appspot.com/o/res%2Flogo-2.png?alt=media&token=5af0e6da-07e4-490e-8d61-bebc7b456ce3"  style={{cursor:'pointer', height: "40px" }} fluid/>
                    </Link>
                </Navbar.Brand>
                {/*
                Primera seccion de la barra de navegacion. Incluye Catalogo, Galeria e Informacion
                 */
                }
                <Nav className="pl-xl-5 pl-lg-4 pl-md-0 pl-4 col-xl-9 col-lg-9 col-10 pr-0">
                    <Link href="/adminMain">
                        <a className="nav-link px-xl-3 px-lg-2 px-sm-0 mx-md-2 d-sm-none text-light font-weight-bold">
                            Inicio
                        </a>
                    </Link>
                    <Link href="/adminPackages">
                        <a className="nav-link px-xl-3 px-lg-2 pl-md-0 pr-md-0 ml-md-0 mr-md-2 text-light font-weight-bold">
                            Paquetes
                        </a>
                    </Link>
                    <Link href="/adminSeguros">
                        <a className="nav-link px-xl-3 px-lg-2 pl-md-1 pr-md-0 mx-md-2 text-light font-weight-bold">
                            Seguros laborales
                        </a>
                    </Link>
                    <Link href="/adminPlanesA">
                        <a className="nav-link px-xl-3 px-lg-2 pl-md-1 pr-md-0 mx-md-2 text-light font-weight-bold">
                            Planes alimenticios
                        </a>
                    </Link>
                    <Link href="/adminPersonalM">
                        <a className="nav-link px-xl-3 px-lg-2 pl-md-1 pr-md-0 mx-md-2 text-light font-weight-bold">
                            Personal médico
                        </a>
                    </Link>
                    <Link href="/adminTran">
                        <a className="nav-link px-xl-3 px-lg-2 pl-md-1 pr-md-0 mx-md-2 text-light font-weight-bold">
                            Transporte
                        </a>
                    </Link>
                    <a onClick={this.endSession} className="nav-link px-xl-3 px-lg-2 pl-md-1 pr-md-0 mx-md-2 text-light font-weight-bold" style={{cursor: "pointer"}}>
                        Cerrar sesión
                    </a>
                </Nav>
        </Navbar.Collapse>


        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"/>
    </Navbar>);
    }
}

export default AdminNavigation;
