import React, { Component } from 'react';
import MaterialTable from "material-table";
import Snackbar from '@material-ui/core/Snackbar';

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

class adminSeguros extends Component
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
                { title: 'Cedula', field: 'cedula' },
                { title: 'Nombre', field: 'nombre' },
                { title: 'Apellidos', field: 'apellidos' },
                { title: 'Seguro', field: 'numeroSeguro', type: 'numeric' },
                { title: 'Rige', field: 'vige', type: 'date' },
                { title: 'Vencimiento', field: 'vence', type: 'date' }
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
        firebase.auth().onAuthStateChanged(function(user)
        {
            if (user)
            {
                // console.log('user logged', user)
                // User is signed in.
                username = user.email;
                uid = user.uid;
                providerData = user.providerData;


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
                            Administración de seguros laborales
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
                        data={query =>
                            new Promise((resolve, reject) => {
                                var db = firebase.firestore()
                                var items = []

                                db.collection("Empleados")
                                .get()
                                .then((querySnapshot) => {
                                    // console.log(querySnapshot)
                                    querySnapshot.forEach((doc) => {
                                        if (doc.exists)
                                        {
                                            var tempData = doc.data()

                                            tempData.vige = tempData.vige.toDate()
                                            tempData.vence = tempData.vence.toDate()
                                            // console.log(tempData)
                                            items.push(tempData);
                                        }
                                    });
                                    this.setState({
                                        loadingContent: false
                                    }, () => resolve({
                                        data: items,
                                        totalCount: items.length
                                    }))
                                });
                            })}
                        editable={{
                            onRowAdd: newData =>
                                new Promise((resolve, reject) =>
                                {
                                    const data = this.state.items;
                                    newData['id'] = uuidv1();
                                    // newData.price = '₡ ' + newData.price;

                                    //check if there is any empty value
                                    if (!newData.hasOwnProperty('nombre') || !newData.hasOwnProperty('apellidos') ||
                                        !newData.hasOwnProperty('numeroSeguro') || !newData.hasOwnProperty('vige') ||
                                        !newData.hasOwnProperty('vence'))
                                    {
                                        this.setState({
                                            modalMsg: 'Debe llenar todos los datos',
                                            modalType: 'error',
                                            showModal: tue
                                        }, () => reject('emptyFields'))
                                    }
                                    else
                                    {
                                        newData.active = true

                                        var db = firebase.firestore();
                                        var accessThis = this

                                        // console.log(newData)

                                        // load thumbnail
                                        db.collection("Empleados").doc(newData.id).set(newData)
                                        .then(function(docRef) {
                                            // console.log("Document written with ID: ", docRef.id);

                                            data.push(newData);
                                            var message = ''
                                            var typeMsg = ''

                                            message = 'Empleado agregado exitosamente.'
                                            typeMsg = 'success'

                                            // console.log(data)
                                            accessThis.setState({
                                                data,
                                                modalMsg: message,
                                                modalType: typeMsg,
                                                showModal: true
                                            }, () => resolve());
                                        })
                                    }
                                }),
                            onRowUpdate: (newData, oldData) =>
                                new Promise((resolve, reject) =>
                                {
                                    const data = this.state.items;
                                    const index = data.indexOf(oldData);
                                    data[index] = newData;

                                    if (!newData.hasOwnProperty('nombre') || !newData.hasOwnProperty('apellidos') ||
                                        !newData.hasOwnProperty('numeroSeguro') || !newData.hasOwnProperty('vige') ||
                                        !newData.hasOwnProperty('vence'))
                                    {
                                        this.setState({
                                            modalMsg: 'Debe llenar todos los datos',
                                            modalType: 'error',
                                            showModal: true
                                        }, () => reject('emptyFields'))
                                    }
                                    else
                                    {
                                        var db = firebase.firestore();
                                        var accessThis = this

                                        var storeData = JSON.parse(JSON.stringify(newData));
                                        // var storeData = newData

                                        if (typeof newData.vige == 'string')
                                            storeData.vige = fb.firestore.Timestamp.fromDate(new Date(newData.vige))
                                        else
                                            storeData.vige = fb.firestore.Timestamp.fromDate(newData.vige)

                                        if (typeof newData.vence == 'string')
                                            storeData.vence = fb.firestore.Timestamp.fromDate(new Date(newData.vence))
                                        else
                                            storeData.vence = fb.firestore.Timestamp.fromDate(newData.vence)

                                        // newData.vige = newData.vige.toDate()
                                        // newData.vence = newData.vence.toDate()

                                        console.log(newData, typeof newData.vige)

                                        db.collection("Empleados").doc(newData.id).set(storeData)
                                        .then(function() {
                                            // console.log("Document written with ID: ", docRef.id);
                                            var message = 'Empleado actualizado exitosamente.'
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
                                            console.log(error)
                                            reject(error)
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
                                    db.collection("Empleados").doc(oldData.id).set({
                                            active: false
                                        }, { merge: true })
                                    .then(function() {
                                        // console.log("Document written with ID: ", docRef.id);

                                        data.splice(index, 1);

                                        var message = 'Empleado eliminado exitosamente.'
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
                                            modalMsg: 'Error al eliminar el empleado. Intentelo más tarde.',
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
                            addRowPosition: 'first'
                        }}
                    />
                </Layout>
            </div>
        )
    }
}

export default adminSeguros
