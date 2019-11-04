import React, { Component } from 'react';
import MaterialTable from "material-table";
import Snackbar from '@material-ui/core/Snackbar';
import Router from 'next/router';

//Components
import AdminNavigation from './components/AdminNavigation';
import Layout from './components/FullLayout';
import SnackbarAlert from './components/SnackbarAlert'

import { initFirebase } from '../lib/firebase'

import "firebase/auth";
import "firebase/firestore";

const uuidv1 = require('uuid/v1');
var firebase;
import * as fb from "firebase/app";

class adminAlimen extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            items: [],
            showModal: false,
            modalType: '',
            modalMsg: '',
            loadingContent: true,


            columns: [
                { title: 'Nombre', field: 'nombre' },
                { title: 'Desayuno', field: 'desayuno' },
                { title: 'Merienda desayuno', field: 'meriendaDesayuno' },
                { title: 'Almuerzo', field: 'almuerzo' },
                { title: 'Merienda almuerzo', field: 'meriendaAlmuerzo' },
                { title: 'Cafe', field: 'cena' },
                { title: 'Merienda cafe', field: 'meriendaCena'}
            ]
        }

        firebase = initFirebase()

        this.closeModal = this.closeModal.bind(this)
    }

    componentDidMount()
    {
        var username;
        var uid;
        var providerData;

        var user = firebase.auth().currentUser;

        if (user) {
          // console.log('user logged', user)
        } else {
          // No user is signed in.
        }

        var accessThis = this;
        firebase.auth().onAuthStateChanged(user =>
        {
            if (user)
            {
                // console.log('user logged', user)
                // User is signed in.
                username = user.email;
                uid = user.uid;
                providerData = user.providerData;

                var db = firebase.firestore()
                var items = []

                db.collection("Comidas").where("active", "==", true)
                .get()
                .then((querySnapshot) => {
                    // console.log(querySnapshot)
                    querySnapshot.forEach((doc) => {
                        if (doc.exists)
                        {
                            var tempData = doc.data()

                            items.push(tempData);
                        }
                    });
                    this.setState({
                        items,
                        loadingContent: false
                    })
                })
                .catch((error) => {
                    this.setState({
                        showModal: true,
                        modalMsg: 'Error al cargar los datos. Intentelo mas tarde',
                        modalType: 'error',
                        loadingContent: false
                    }, () => this.forceUpdate())
                })

            }
            else
            {
                Router.push('/')
            }
        });
    }

    closeModal(event, reason)
    {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({
            showModal: false
        })
    }

    render () {
        return (
            <div>
                <AdminNavigation />
                <Layout>
                    <div className="row justify-content-center">
                        <h1 className="mt-2 mb-4">
                            Administración de planes alimenticios
                        </h1>
                    </div>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.state.showModal}
                        autoHideDuration={5000}
                        onClose={this.closeModal}
                      >
                         <SnackbarAlert
                            onClose={this.closeModal}
                            variant={this.state.modalType}
                            message={this.state.modalMsg}
                        />
                      </Snackbar>

                    <MaterialTable
                        title=''
                        columns={this.state.columns}
                        data={ this.state.items }
                        editable={{
                            onRowAdd: newData =>
                                new Promise((resolve, reject) =>
                                {
                                    const data = this.state.items;
                                    newData['id'] = uuidv1();
                                    // newData.price = '₡ ' + newData.price;

                                    //check if there is any empty value
                                    if (!newData.hasOwnProperty('nombre'))
                                    {
                                        this.setState({
                                            modalMsg: 'Debe ingresar un nombre para el plan',
                                            modalType: 'error',
                                            showModal: tue
                                        }, () => reject('noName'))
                                    }
                                    else
                                    {
                                        newData.active = true

                                        var db = firebase.firestore();
                                        var accessThis = this

                                        // console.log(newData)

                                        // load thumbnail
                                        db.collection("Comidas").doc(newData.id).set(newData)
                                        .then(function(docRef) {
                                            // console.log("Document written with ID: ", docRef.id);

                                            data.push(newData);
                                            var message = ''
                                            var typeMsg = ''

                                            message = 'Plan agregado exitosamente.'
                                            typeMsg = 'success'

                                            // console.log(data)
                                            accessThis.setState({
                                                data,
                                                modalMsg: message,
                                                modalType: typeMsg,
                                                showModal: true
                                            }, () => resolve());
                                        })
                                        .catch((error) => {
                                            accessThis.setState({
                                                modalMsg: 'Error al agregar el plan. Intentelo más tarde.',
                                                modalType: 'error',
                                                showModal: true
                                            }, () => reject());
                                        })
                                    }
                                }),
                            onRowUpdate: (newData, oldData) =>
                                new Promise((resolve, reject) =>
                                {
                                    const data = this.state.items;
                                    const index = data.indexOf(oldData);
                                    data[index] = newData;

                                    if (!newData.hasOwnProperty('nombre'))
                                    {
                                        this.setState({
                                            modalMsg: 'El plan debe tener un nombre',
                                            modalType: 'error',
                                            showModal: true
                                        }, () => reject('noName'))
                                    }
                                    else
                                    {
                                        var db = firebase.firestore();
                                        var accessThis = this

                                        console.log(newData, typeof newData.vige)

                                        db.collection("Comidas").doc(newData.id).set(newData)
                                        .then(function() {
                                            // console.log("Document written with ID: ", docRef.id);
                                            var message = 'Plan actualizado exitosamente.'
                                            var typeMsg = 'success'

                                            // console.log(message, typeMsg)
                                            accessThis.setState({
                                                data,
                                                modalMsg: message,
                                                modalType: typeMsg,
                                                showModal: true
                                            }, () => resolve());
                                        })
                                        .catch((error) => {
                                            accessThis.setState({
                                                modalMsg: 'Error al actualizar el plan. Intentelo más tarde.',
                                                modalType: 'error',
                                                showModal: true
                                            }, () => reject());
                                        })
                                    }
                                }),
                            onRowDelete: oldData =>
                                new Promise((resolve, reject) =>
                                {
                                    const data = this.state.items;
                                    const index = data.indexOf(oldData);

                                    var db = firebase.firestore();
                                    var accessThis = this;

                                    // console.log(oldData)

                                    // load thumbnail
                                    db.collection("Comidas").doc(oldData.id).set({
                                            active: false
                                        }, { merge: true })
                                    .then(function() {
                                        // console.log("Document written with ID: ", docRef.id);

                                        data.splice(index, 1);

                                        var message = 'Plan eliminado exitosamente.'
                                        var typeMsg = 'success'

                                        accessThis.setState({
                                            data,
                                            modalMsg: message,
                                            modalType: typeMsg,
                                            showModal: true
                                        }, () => resolve());
                                    })
                                    .catch((err) => {
                                        accessThis.setState({
                                            modalMsg: 'Error al eliminar el plan. Intentelo más tarde.',
                                            modalType: 'error',
                                            showModal: true
                                        }, () => reject());
                                    })
                                })
                        }}
                        isLoading={this.state.loadingContent}
                        options={{
                            actionsColumnIndex: -1,
                            filtering: false,
                            addRowPosition: 'first',
                            headerStyle: {
                                backgroundColor: '#0fb4f0'
                            }
                        }}
                    />
                </Layout>
            </div>
        )
    }
}

export default adminAlimen
