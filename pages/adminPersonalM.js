import React, { Component } from 'react';
import MaterialTable from "material-table";
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import Router from 'next/router';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';


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

const searchOptions = {
    bounds:{north: 11.2863, west: -85.9991, south: 7.9939, east: -82.5686},
    componentRestrictions: {country: 'cr'},
    types: ['(regions)']
}

class adminPersonalM extends Component
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
            address: '',
            location: {},


            columns: [
                { title: 'Nombre', field: 'nombre' },
                { title: 'Empresa', field: 'tipo', lookup: { publico: 'Publico', privado: 'Privado' }, initialEditValue: 'publico'},
                { title: 'Zona de cobertura', field: 'zona.address', editComponent: props => (
                    <PlacesAutocomplete value={this.state.address} onChange={this.handleChange} onSelect={this.handleSelect} searchOptions={searchOptions}>
                        {
                            ({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <div>
                                    <TextField
                                        {...getInputProps({
                                            placeholder: 'Search Places ...',
                                            className: 'location-search-input',
                                          })}
                                    />
                                    <div className="autocomplete-dropdown-container">
                                        {loading && <div>Loading...</div>}
                                        {suggestions.map(suggestion => {
                                            const className = suggestion.active
                                            ? 'suggestion-item--active'
                                            : 'suggestion-item';
                                            // inline style for demonstration purpose
                                            const style = suggestion.active
                                            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                            : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                            return (
                                                <div
                                                {...getSuggestionItemProps(suggestion, {
                                                    className,
                                                    style,
                                                })}
                                                >
                                                <span>{suggestion.description}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )
                        }
                    </PlacesAutocomplete>
                ) },
                { title: 'Telefono', field: 'phone' }
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

                db.collection("PersonalMedico").where("active", "==", true)
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

    handleChange = address => {
        this.setState({ address });
      };

      handleSelect = address => {
        geocodeByAddress(address)
          .then(results => getLatLng(results[0]))
          .then(latLng => {
              this.setState({
                  address: address,
                  location: latLng
              });
              // console.log('Success', latLng)
              // console.log(this.state.items)
          })
          .catch(error => console.error('Error', error));
      };

    render () {
        return (
            <div>
                <AdminNavigation />
                <Layout>
                    <div className="row justify-content-center">
                        <h1 className="mt-2 mb-4">
                            Administración de personal médico
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
                                            modalMsg: 'Debe ingresar un nombre para el personal medico',
                                            modalType: 'error',
                                            showModal: tue
                                        }, () => reject('noName'))
                                    }
                                    else
                                    {
                                        newData.active = true

                                        var db = firebase.firestore();
                                        var accessThis = this

                                        newData.zona = {
                                            address: accessThis.state.address,
                                            location: accessThis.state.location
                                        }

                                        // console.log(newData)

                                        // load thumbnail
                                        db.collection("PersonalMedico").doc(newData.id).set(newData)
                                        .then(function(docRef) {
                                            // console.log("Document written with ID: ", docRef.id);

                                            data.push(newData);
                                            var message = ''
                                            var typeMsg = ''

                                            message = 'Personal medico agregado exitosamente.'
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
                                                modalMsg: 'Error al agregar el personal medico. Intentelo más tarde.',
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
                                            modalMsg: 'El personal medico debe tener un nombre',
                                            modalType: 'error',
                                            showModal: true
                                        }, () => reject('noName'))
                                    }
                                    else
                                    {
                                        var db = firebase.firestore();
                                        var accessThis = this

                                        newData.zona = {
                                            address: accessThis.state.address,
                                            location: accessThis.state.location
                                        }

                                        // console.log(newData, typeof newData.vige)

                                        db.collection("PersonalMedico").doc(newData.id).set(newData)
                                        .then(function() {
                                            // console.log("Document written with ID: ", docRef.id);
                                            var message = 'Personal medico actualizado exitosamente.'
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
                                                modalMsg: 'Error al actualizar el personal medico. Intentelo más tarde.',
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
                                    db.collection("PersonalMedico").doc(oldData.id).set({
                                            active: false
                                        }, { merge: true })
                                    .then(function() {
                                        // console.log("Document written with ID: ", docRef.id);

                                        data.splice(index, 1);

                                        var message = 'Personal medico eliminado exitosamente.'
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
                    <script src={"https://maps.googleapis.com/maps/api/js?key=" + process.env.NEXT_STATIC_MAP_API + "&libraries=places"}></script>
                </Layout>
            </div>
        )
    }
}

export default adminPersonalM
