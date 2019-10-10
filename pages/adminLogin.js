import Layout from './components/GeneralLayout';
import Navigation from './components/Navigation';
import Router from 'next/router'
import { Formik, Field } from 'formik';
import React, { Component } from 'react';

import firebaseConfig from './firebase/firebase';

// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";

class AdminLogin extends Component
{
    constructor()
    {
        super();

        //inicializa state
        this.state = {
            username: '',
            password: ''
        };// Initialize firebase
        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

        

        //Se necesita hacer bind a todas la funciones que se usen dentro de la clase.
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static async getInitialProps({query})
    {
        var username;
        var uid;
        var providerData;

        firebase.auth().onAuthStateChanged(function(user)
        {
            if (user)
            {
                // User is signed in.
                username = user.email;
                uid = user.uid;
                providerData = user.providerData;

                Router.push('/adminMain')
                // return {user: username, id: uid, provider: provider}
            }
        });

        return {}
    }

    //Se activa cuando se presiona enviar
    handleSubmit(e)
    {
        //No se que hace pero debe ir al inicio
        e.preventDefault();

        //Poner aqui lo que tiene que hacer el form cuando se envia la informacion
        // console.log(this.state)

        var email = this.state.username;
        var password = this.state.password;

        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
        });
        // Router.push('/adminMain');
        console.log(firebase.auth())

        //Reincia los inputs
        this.setState({
            password: ''
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

    render ()
    {
        return(
            <div>
                <Navigation />
                <Layout>
                <div className="row justify-content-center">
                    <h1 className="mt-2 mb-4">
                        Iniciar Sesión
                    </h1>
                </div>
                <div className="login-admin-group row justify-content-center">
                    <div className="col-4">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="username">Nombre de usuario:</label>
                                <input type="text" className="form-control mx-4" id="username" name="username" placeholder="Nombre de usuario" value={this.state.username} onChange={this.handleInputChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Contraseña:</label>
                                <input type="password" className="form-control mx-4" id="password" name="password" placeholder="Contraseña" value={this.state.password} onChange={this.handleInputChange}/>
                            </div>
                            <div className="form-button" style={{textAlign: 'center'}}>
                                <button className="btn btn-dark" type="submit">Iniciar sesión</button>
                            </div>
                        </form>

                        <style jsx>{`
                            .login-admin-group button {
                                box-sizing: border-box;
                                transition: all 0.2s;
                            }
                            .login-admin-group button:hover {
                                color: #000000;
                                background-color: #42c8f5;
                            }
                            `}</style>
                        </div>
                    </div>
                </Layout>
            </div>
        )
    }
}

export default AdminLogin