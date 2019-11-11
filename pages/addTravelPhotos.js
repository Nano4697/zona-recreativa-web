import React, {Component} from 'react'
import Layout from './components/GeneralLayout';
import AdminNavigation from './components/AdminNavigation';
import regeneratorRuntime from "regenerator-runtime";
import {DropzoneArea} from 'material-ui-dropzone';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarAlert from './components/SnackbarAlert';
import Router from 'next/router';

import LinearProgress from '@material-ui/core/LinearProgress';
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import { initFirebase } from '../lib/firebase'
var uniqid = require('uniqid');
var firebase;

class addTravelPhotos extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            code: uniqid(),
            name: '',
            photos: [],
            progress: 50,
            uploading: true,
            modalMsg: '',
            modalType: '',
            showModal: false
        }

        var prom =  new Promise((resolve, reject) =>
        {
            firebase = initFirebase()
            resolve()
        })

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.closeModal = this.closeModal.bind(this)
    }

    componentDidMount()
    {
        var username;
        var uid;
        var providerData;

        console.log("componentDidMount")

        firebase.auth().onAuthStateChanged(function(user)
        {
            if (user)
            {
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

    handleChangePhotos(files)
    {
        this.setState({
            photos: files
        })
    }

    handleSubmit()
    {
        console.log(this.state)
        this.setState({
            uploading: true,
            progress: 0,
        });

        var total = this.state.photos.length;
        var ref = firebase.storage().ref();
        var db = firebase.firestore();

        var refs = []

        var accessThis = this;


        Promise.all(this.state.photos.map( (file, i) => {
            var imgRef = 'tripPhotos/'+ accessThis.state.code + '/' + accessThis.state.code + '_' + i + '.png'
            refs.push(imgRef)
            var refChild = ref.child(imgRef)

            var uploadTask = refChild.put(file)

            uploadTask.on('state_changed', null, null, function() {
                accessThis.setState({
                    progress: accessThis.state.progress + 100/total
                })
            });

            return uploadTask.then(function(snapshot) {
                    return snapshot.ref.getDownloadURL()
                })
            }
        ))
        .then((values) => {
            console.log(values)

            db.collection("ImagenesViaje").doc(accessThis.state.code).set( {id: accessThis.state.code, nombre: accessThis.state.name, imgs: values, refs: refs})
            .then(function() {
                // console.log("Document written with ID: ", docRef.id);
                var message = 'Imagenes cargadas exitosamente.'
                var typeMsg = 'success'

                setTimeout(() =>
                {
                    accessThis.setState({
                        modalMsg: message,
                        modalType: typeMsg,
                        showModal: true,
                        openImgLoad: false,
                        images: [],
                        uploading: false
                    });
                }, 1000);
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }

    handleInputChange(e)
    {
        //obtiene el valor y el nombre del componente que cambio
        const target = event.target;
        const value = target.value;
        const name = target.name;

        // Actualiza el campo que se modifico
        this.setState({
            [name]: value
        });
    }

    render()
    {
        var showLoader = (this.state.progress > 0 || this.state.uploading) ? <LinearProgress className="mt-3" variant="determinate" value={this.state.progress}/>:'';

        var disableButton = this.state.uploading ? (<div>
            <button type="button" className="btn btn-secondary mt-3" type="submit" disabled>
                Confirmar
            </button>
        </div>) : (<div>
            <button type="button" className="btn btn-primary mt-3" type="submit">
                Confirmar
            </button>
        </div>)
        return (
            <div>
                <AdminNavigation />
                <Layout>
                    <div className="row justify-content-center">
                        <h1 className="mt-2 mb-4">
                            Agregar fotos de un viaje
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

                    <div className="justify-content-center">
                        <div className='row justify-content-center'>
                            <TextField className="mx-2 my-3" disabled id="travel-code" label="Codigo" margin="normal" value={this.state.code}/>
                            <TextField className="mx-2 my-3" name="name" label="Nombre" margin="normal" value={this.state.name} color="primary" onChange={this.handleInputChange}/>
                        </div>

                        <div className="col-9 mx-auto mt-3">
                            <DropzoneArea
                                onChange={this.handleChangePhotos.bind(this)}
                                filesLimit={250}
                                acceptedFiles={['image/*']}
                                showPreviews={false}
                                maxFileSize={5000000}
                            />
                            {showLoader}
                        </div>

                        <div style={{textAlign: 'center'}}>
                            <button type="button" className="btn btn-primary mt-5" onClick={this.handleSubmit}>
                                Confirmar
                            </button>
                        </div>
                    </div>
                </Layout>
            </div>
        )
    }
}

export default addTravelPhotos
