import React, { Component } from 'react';
import MaterialTable from "material-table";
import Snackbar from '@material-ui/core/Snackbar';
import Router from 'next/router';
import IconButton from '@material-ui/core/IconButton';
import Resizer from 'react-image-file-resizer';


//Components
import AdminNavigation from './components/AdminNavigation';
import Layout from './components/FullLayout';
import SnackbarAlert from './components/SnackbarAlert'


import PublishIcon from '@material-ui/icons/Publish';

import { initFirebase } from '../lib/firebase'

import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const uuidv1 = require('uuid/v1');
var firebase;
import * as fb from "firebase/app";

class adminTran extends Component
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
            img: false,


            columns: [
                { title: 'Nombre', field: 'nombre' },
                { title: 'Descripcion', field: 'descripcion' },
                { title: 'Telefono', field: 'numeroTelefono' },
                { title: 'Precio', field: 'precio'},
            ]
        }

        firebase = initFirebase()

        this.fileInput = React.createRef();

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

                var db = firebase.firestore()
                var items = []

                db.collection("Transportes")/*.where("active", "==", true)*/
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
                    accessThis.setState({
                        items,
                        loadingContent: false
                    })
                })
                .catch((error) => {
                    accessThis.setState({
                        showModal: true,
                        modalMsg: 'Error al cargar los datos. Intentelo mas tarde',
                        modalType: 'error',
                        loadingContent: false
                    }, () => accessThis.forceUpdate())
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
                            Administración de servicios de transporte
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
                                    // var img = this.fileInput.current.files[0]

                                    // newData.refThumbnail = 'transporte/' + newData.id + '/' + uuidv1() + '.png';
                                    // newData.refImage = 'transporte/' + newData.id + '/' + uuidv1() + '.png';
                                    // newData.thumbnailURL = ''
                                    // newData.imgURL = ''

                                    // console.log("asdasd")
                                    //check if there is any empty value
                                    if (!newData.hasOwnProperty('nombre') || !newData.hasOwnProperty('descripcion') ||
                                        !newData.hasOwnProperty('numeroTelefono') || !newData.hasOwnProperty('precio'))
                                    {
                                        this.setState({
                                            modalMsg: 'Debe llenar todos los campos',
                                            modalType: 'warning',
                                            showModal: true
                                        }, () => reject('emptyFields'))
                                    }
                                    else
                                    {
                                        newData.active = true

                                        var accessThis = this

                                        var db = firebase.firestore();

                                        db.collection("Transportes").doc(newData.id).set(newData)
                                        .then(function(docRef) {
                                            // console.log("Document written with ID: ", docRef.id);

                                            data.push(newData);
                                            var message = ''
                                            var typeMsg = ''

                                            message = 'Servicio de transporte agregado exitosamente.'
                                            typeMsg = 'success'

                                            // console.log(data)
                                            accessThis.setState({
                                                data,
                                                modalMsg: message,
                                                modalType: typeMsg,
                                                showModal: true
                                            }, () => resolve());
                                        })
                                        .catch((err) => {
                                            console.log(err)

                                            var ref = firebase.storage().ref();
                                            var db = firebase.firestore();

                                            var modalMsg = 'Error al eliminar el servicio de transporte. Intentelo más tarde.'
                                            var modalType = 'error'

                                            if (err.code == 'upload/NoImage')
                                            {
                                                modalMsg = 'Debe ingresar una imagen.'
                                                modalType = 'warning'
                                            }
                                            accessThis.setState({
                                                    modalMsg: modalMsg,
                                                    modalType: modalType,
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

                                    if (!newData.hasOwnProperty('nombre') || !newData.hasOwnProperty('descripcion') ||
                                        !newData.hasOwnProperty('numeroTelefono') || !newData.hasOwnProperty('precio'))
                                    {
                                        this.setState({
                                            modalMsg: 'Debe completar todos los campos',
                                            modalType: 'warning',
                                            showModal: true
                                        }, () => reject('emptyFields'))
                                    }
                                    else
                                    {
                                        var db = firebase.firestore();

                                        db.collection("Transportes").doc(newData.id).set(newData)
                                        .then(function(docRef) {
                                            // console.log("Document written with ID: ", docRef.id);

                                            var message = ''
                                            var typeMsg = ''

                                            message = 'Servicio de transporte actualizado exitosamente.'
                                            typeMsg = 'success'

                                            // console.log(data)
                                            accessThis.setState({
                                                data,
                                                modalMsg: message,
                                                modalType: typeMsg,
                                                showModal: true
                                            }, () => resolve());

                                        })
                                        .catch((err) => {
                                            console.log(err)

                                            var ref = firebase.storage().ref();
                                            var db = firebase.firestore();

                                            var modalMsg = 'Error al actualizar el servicio de transporte. Intentelo más tarde.'
                                            var modalType = 'error'

                                            accessThis.setState({
                                                modalMsg: modalMsg,
                                                modalType: modalType,
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
                                    db.collection("Transportes").doc(oldData.id)/*.set({
                                            active: false
                                        }, { merge: true })*/
                                    .delete()
                                    .then(function() {
                                        // console.log("Document written with ID: ", docRef.id);

                                        data.splice(index, 1);

                                        var message = 'Servicio de transporte eliminado exitosamente.'
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
                                            modalMsg: 'Error al eliminar el personal medico. Intentelo más tarde.',
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

export default adminTran
