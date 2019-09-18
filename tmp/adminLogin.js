import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import Navigation from './components/Navigation';
import Layout from './components/GeneralLayout';
import Router from 'next/router';

import React, { Component } from 'react';

class adminLogin extends Component
{
    constructor()
    {
        super ();

        //inicializa state
        this.state = {
            username: '',
            password: ''
        };

        //Se necesita hacer bind a todas la funciones que se usen dentro de la clase.
        this.handleInputChange = this.handleInputChange.bind(this);
        this.login = this.login.bind(this);
    }

    login(e)
    {
        e.preventDefault();

        if(this.state.username === "admin" && this.state.password === "admin") {
            Router.push('/adminMain')
        } else {
            alert("Credenciales inválidos")
        }
    }

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

    render () {
        return (
        <div>
            <Navigation />
            <Layout>
                <div className="row justify-content-center">
                    <h1 className="mt-2 mb-4">
                        Iniciar Sesión
                    </h1>
                </div>
                <form onSubmit={this.login}>
                    <div className="row">
                        <div className="col">
                            <label htmlFor="username">Nombre de usuario:</label>
                            <Form.Control name="username" type="text" placeholder="Nombre" value={this.state.username} onChange={this.handleInputChange}/>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col">
                            <label htmlFor="password">Contraseña:</label>
                            <Form.Control name="password" type="password" placeholder="Contraseña" value={this.state.password} onChange={this.handleInputChange}/>
                        </div>
                    </div>
                    <button type="submit">Iniciar sesión</button>
                </form>
            </Layout>
        </div>
        );
    }
}

export default adminLogin;
