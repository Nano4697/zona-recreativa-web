import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import Navigation from './components/Navigation'
import Footer from './components/Footer';
import Layout from './components/GeneralLayout'

import React, { Component } from 'react';
import Link from 'next/link';

class Contact extends Component {
    constructor (props)
    {
        super(props);

        //inicializa state
        this.state = {
            email: '',
            message: ''
        };

        // console.log(props)

        if (props.hasOwnProperty('template'))
        {
            if (props.template.toLowerCase() == 'moreoptions')
                this.state.message = "Me gustaría organizar un viaje a [nombre del o los lugares que desea visitar]. Para aproximadamente [cantidad] personas."
            else if (props.template.toLowerCase() == 'moreinfo')
                this.state.message = "Me gustaría obtener más información sobre el siguiente paquete:\n\nwww.zonarecreativacr.com/pPackage/" + props.pkgCode + "."
            else if (props.template.toLowerCase() == 'bookit')
                this.state.message = "Me gustaría contratar este viaje:\n\nwww.zonarecreativacr.com/pPackage/" + props.pkgCode + "."

        }

        //Se necesita hacer bind a todas la funciones que se usen dentro de la clase.
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static async getInitialProps({query})
    {
        if (query.hasOwnProperty("template"))
            if (query.hasOwnProperty("pkgCode"))
                return {template: query.template, pkgCode: query.pkgCode}
            else
                return {template: query.template}
        else
            return {}
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
        var alert;

        if(this.props.hasOwnProperty('template'))
        {
            alert = <div className="alert alert-primary alert-dismissible fade show" role="alert" style={{fontSize: "12px"}}>
                Hemos creado una plantilla para tu mensaje. ¡Edítalo o crea uno nuevo que se adecúe a tus necesidades!.
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        }

        return (
            <div>
                <Navigation />
                <Layout>
                    <h1 className="text-center pb-1">Contacto</h1>

                    <div className="row col-lg-8 col-md-12 col-12 row pt-4 mx-md-auto mx-0 px-md-auto px-0 mb-5 justify-content-center">
                        { /*
                            Formulario de proveedores (Izquierda)
                        */ }
                        {alert}
                        <Form className="col-xl-7 col-lg-7 col-md-8 col-sm-12 col-12 px-md-auto px-0 " onSubmit={this.handleSubmit}>
                            <Form.Group controlId="formContact.Email">
                                {/*
                                    El form control tiene que tener un nombre igual a un atributo de la variable state. Cambiar el value={this.state.email} al atributo correspondiente. Hacerlo para cada input.
                                */}
                                <Form.Control name="email" type="email" placeholder="Email" value={this.state.email} onChange={this.handleInputChange} required/>
                            </Form.Group>
                            <Form.Group controlId="formContact.Mensaje">
                                <Form.Control name="message" as="textarea" rows="8" placeholder="Escriba aquí su mensaje"  value={this.state.message} onChange={this.handleInputChange} required/>
                            </Form.Group>
                            <Button className="float-right" variant="dark" type="submit">
                                Enviar
                            </Button>
                        </Form>
                        { /*
                            Información de contacto (Derecha)
                        */ }
                        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12">
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

export default Contact;
