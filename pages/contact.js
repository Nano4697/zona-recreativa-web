import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import Navigation from './components/Navigation'
import Footer from './components/Footer';
import Layout from './components/GeneralLayout'

import React, { Component } from 'react';

class Proveedores extends Component {
    constructor ()
    {
        super();

        //inicializa state
        this.state = {
            email: '',
            message: ''
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
        console.log(this.state)

        //Reincia los inputs
        this.setState({
            email: '',
            message: ''
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
        // console.log(this.state)
    }

    render() {
        return (
            <div>
                <Navigation />
                <Layout>
                    <h1 className="text-center pb-3">Contacto</h1>

                    <div className="row col-6 row pt-4 mx-auto">
                        { /*
                            Formulario de proveedores (Izquierda)
                        */ }
                        <Form className="col-xs-2 col-sm-3 col-md-4 col-lg-7 col-xl-8" onSubmit={this.handleSubmit}>
                            <Form.Group controlId="formContact.Email">
                                {/*
                                    El form control tiene que tener un nombre igual a un atributo de la variable state. Cambiar el value={this.state.email} al atributo correspondiente. Hacerlo para cada input.
                                */}
                                <Form.Control name="email" type="email" placeholder="Email" value={this.state.email} onChange={this.handleInputChange}/>
                            </Form.Group>
                            <Form.Group controlId="formContact.Mensaje">
                                <Form.Control name="message" as="textarea" rows="4" placeholder="Escriba aquí su mensaje"  value={this.state.message} onChange={this.handleInputChange}/>
                            </Form.Group>
                            <Button variant="dark" type="submit">
                                Enviar
                            </Button>
                        </Form>
                        { /*
                            Información de contacto (Derecha)
                        */ }
                        <div className="col-xs-2 col-sm-3 col-md-4 col-lg-5 col-xl-4 ">
                            <div className="justify-content-center">
                                <div>
                                    <h6>Zona Recreativa CR</h6>

                                    <p className="text-secondary">
                                        acme.info@2mail.com
                                    </p>
                                    <p className="text-secondary">
                                        +0 000-000-0000
                                    </p>
                                    { /*<h6>FOLLOW US</h6>*/ }

                                    { /*
                                        Enlaces externos
                                    */ }
                                </div>
                            </div>
                        </div>
                    </div>
                </Layout>
            </div>
        );
    }
}

export default Proveedores;
