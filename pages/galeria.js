// Packages
import React, { Component } from 'react';
import Link from 'next/link';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

// Components
import Layout from './components/GeneralLayout';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Album from './components/Album';

// Others
import data from './data/viajes.json';

class Galeria extends Component
{
    constructor ()
    {
        super();

        //inicializa state
        this.state = {
            code: ''
        };

        //Se necesita hacer bind a todas la funciones que se usen dentro de la clase.
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //Se activa cuando se presiona enviar
    handleSubmit(e)
    {
        //No se que hace pero debe ir al inicio
        e.preventDefault();

        //Poner aqui lo que tiene que hacer el form cuando se envia la informacion
        alert("Datos enviados")

        //Reincia los inputs
        this.setState({
            code: ''
        });
    }

    //Actualiza los valores cada vez que se hace un cambio en el input
    handleInputChange(e)
    {
        //obtiene el valor y el nombre del componente que cambio
        const {value, name} = e.target;
        // console.log(value, name);

        // Actualiza el campo que se modifico
        this.setState({
            [name]: value
        });
        console.log(this.state)
    }

    render() {
        return (
            <div>
                <Navigation />
                <Layout>
                    <div className="row justify-content-center">
                        <h1 className="mt-2 mb-4">
                            Galería
                        </h1>
                    </div>
                    <div className="row justify-content-center">
                        <div className="mt-5">
                            <h3 className="mb-4">Ingrese el código de viaje:</h3>
                            <form className="" onSubmit={this.handleSubmit}>
                                <Form.Control name="code" type="text" placeholder="Código" value={this.state.code} onChange={this.handleInputChange}/>
                                <div className="mt-3" align="center">
                                    <Link href="/pAlbum/[album]" as={`/pAlbum/${this.state.code}`}>
                                        <button type="button" className="btn btn-dark">Enviar</button>
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </Layout>
            </div>
        )
    }
}

export default Galeria;
