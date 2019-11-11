//Packages
import React, { Component } from 'react';
import Toast from 'react-bootstrap/Toast';
import CurrencyInput from 'react-currency-input-field'
import DraggableList from 'react-draggable-list';
import MaterialTable from "material-table";
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import Router from 'next/router';
import Snackbar from '@material-ui/core/Snackbar';
import Link from 'next/link';
import Resizer from 'react-image-file-resizer';
import TextField from '@material-ui/core/TextField';
import regeneratorRuntime from "regenerator-runtime";
import {DropzoneDialog} from 'material-ui-dropzone';

import LinearProgress from '@material-ui/core/LinearProgress';

//Components
import AdminNavigation from './components/AdminNavigation';
import Layout from './components/FullLayout';
import SchedBuilder from './components/schedBuilder';
import SnackbarAlert from './components/SnackbarAlert'

//Others
import AddIcon from '@material-ui/icons/Add';
import LinearScale from '@material-ui/icons/LinearScale';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import VisibilityIcon from '@material-ui/icons/Visibility';
import InfoIcon from '@material-ui/icons/Info';
import PublishIcon from '@material-ui/icons/Publish';

// Firebase App (the core Firebase SDK) is always required and must be listed first
// import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import { initFirebase } from '../lib/firebase'

var ReactDOM = require('react-dom');
const uuidv1 = require('uuid/v1');
var uniqid = require('uniqid');

var firebase;

class AdminPackages extends Component {

    constructor (props)
    {
        super(props);
        // Initialize firebase
        //inicializa state
        this.state = {
            id: '',
            durHora: 1,
            durMin: 0,
            lastActId: 0,
            descripActiv: '',
            inicio: '07:00',
            activities: [],
            items: [],
            img: false,
            showModal: false,
            modalType: 'success',
            modalMsg: '',
            openImgLoad: false,
            images: [],
            uploading: false,
            progress: 0,
            openMapLoad: false,
            loadingContent: true,


            columns: [
                { title: 'Imagen', field: 'thumbnail', filtering: false, sorting: false, render: rowData => (
                    <img
                        style={{ height: 36, width: 36, borderRadius: '50%' }}
                        src={rowData.thumbnailURL}
                    />
                    ), editComponent: props => (
                        <div>
                            <input id="icon-button-file" type="file" accept="image/*" value={props.value}  ref={this.fileInput} style={{display: 'none'}} onChange={() => {this.setState({img: true})}}/>
                            <label htmlFor="icon-button-file">
                                <IconButton color={this.state.img?"primary":"disabled"} aria-label="upload picture" component="span" >
                                    <PublishIcon/>
                                </IconButton>
                            </label>
                        </div>
                    )
                },
                { title: 'Nombre', field: 'name' },
                { title: 'Descripción', field: 'descrip' },
                { title: 'Ruta', field: 'type', lookup: { cientifico: 'Cientifico', cultural: 'Cultural', educativo: 'Educativo', recreativo: 'Recreativo' }, initialEditValue: 'cientifico' },
                { title: 'Desayuno', field: 'breakfast', type: 'boolean' },
                { title: 'Almuerzo', field: 'lunch', type: 'boolean' },
                { title: 'Cafe', field: 'coffe', type: 'boolean' },
                { title: 'Cupo', field: 'capacity', type: 'numeric' },
                { title: 'Precio', field: 'price', type: 'numeric'  }
            ]
        };

        var prom =  new Promise((resolve, reject) =>
        {
            firebase = initFirebase()
            resolve()
        })

        prom.then((success) => {
        // console.log(fire.firestore())
            var db = firebase.firestore()
            var items = []

            db.collection("Paquetes")/*.where("active", "==", true)*/
            .get()
            .then((querySnapshot) => {
                // console.log(querySnapshot)
                querySnapshot.forEach((doc) => {
                    if (doc.exists)
                    {
                        items.push(doc.data());
                    }
                });
                this.setState({
                    items: items,
                    loadingContent: false
                })
            });
        })

        this.fileInput = React.createRef();

        //Se necesita hacer bind a todas la funciones que se usen dentro de la clase.
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addActivity = this.addActivity.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this._onListChange = this._onListChange.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleSubmitImages = this.handleSubmitImages.bind(this);
        this.handleSubmitMap = this.handleSubmitMap.bind(this);
        this.handleCloseImageLoad = this.handleCloseImageLoad.bind(this);

        this.removeActivity = this.removeActivity.bind(this);
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

    componentDidMount()
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
            }
            else
            {
                Router.push('/')
            }
        });
    }

    componentDidUpdate()
    {
        // $('#setSchedule').modal('handleUpdate')
    }

    handleOpenMapLoad(id)
    {
        this.setState({
            id: id,
            openMapLoad: true
        });
    }

    handleCloseImageLoad()
    {
        this.setState({
            openMapLoad: false
        });
    }

    handleSubmitMap(files)
    {
        this.setState({
            uploading: true,
            progress: 0,
        });

        var ref = firebase.storage().ref();
        var db = firebase.firestore();

        var refs = ''

        var accessThis = this;

        var imgRef = 'packages/'+ accessThis.state.id + '/' + accessThis.state.id + '_map' + '.png'
        var refChild = ref.child(imgRef)

        var uploadTask = refChild.put(files[0])

        uploadTask.on('state_changed', function(snapshot) {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            accessThis.setState({
                progress: progress
            })
        }, function(error) {
            console.log(error)
        }, function() {
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                db.collection("Paquetes").doc(accessThis.state.id)
                .set( {
                    mapRef: imgRef,
                    map: downloadURL
                }, { merge: true} )
                .then(function() {
                    // console.log("Document written with ID: ", docRef.id);
                    var message = 'Mapa agregado exitosamente.'
                    var typeMsg = 'success'

                    setTimeout(() =>
                    {
                        accessThis.setState({
                            modalMsg: message,
                            modalType: typeMsg,
                            showModal: true,
                            openMapLoad: false,
                            images: [],
                            uploading: false
                        });
                    }, 1000);
                })
            })
        });
    }

    handleOpenImageLoad(id)
    {
        this.setState({
            id: id,
            maxFiles: 50,
            openImgLoad: true
        });
    }

    handleCloseImageLoad()
    {
        this.setState({
            openImgLoad: false
        });
    }

    handleSubmitImages(files)
    {
        this.setState({
            uploading: true,
            progress: 0,
        });

        var total = files.length;
        var ref = firebase.storage().ref();
        var db = firebase.firestore();

        var refs = []

        var accessThis = this;

        Promise.all(files.map( (file, i) => {
            var imgRef = 'packages/'+ accessThis.state.id + '/' + accessThis.state.id + '_' + i + '.png'
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
            // console.log(values)

            db.collection("ImagenesPaquetes").doc(accessThis.state.id).set( {id: accessThis.state.id, imgs: values, refs: refs})
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
    }

    loadSchedule(id)
    {
        var db = firebase.firestore();

        this.setState({
            id: id
        })

        db.collection("Itinerario").where("id", "==", id)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.exists)
                {
                    var newSched = doc.data().schedule
                    // console.log(newSched)
                    this.setState({
                        activities: newSched
                    }, () => { this.forceUpdate() })
                }
            });
        })
    }

    removeActivity(index)
    {
        var newList = this.state.activities.filter((e, i) => {
            // console.log(this.state.activities[i].id + ", " + index)
            return e.id != index
        })
        this.setState({
                activities: newList
        });

        this.forceUpdate();

    }

    addActivity(e)
    {
        e.preventDefault();

        var descrip = this.state.descripActiv;
        var hora = parseInt(this.state.durHora);
        var min = parseInt(this.state.durMin);
        var id = uniqid();
        this.setState({
                activities: [...this.state.activities, {id, descrip, hora, min}],
                lastActId: this.state.lastActId+1
            })

    }

    _onListChange(newList, movedItem)
    {
        // var oldIndex = movedItem.id
        // var index = newList.indexOf(movedItem)
        //
        // newList[index].id = index
        // newList[oldIndex].id = oldIndex
        //
        // console.log("asdasd", newList)
        this.setState({activities: newList});
    }

    handleSubmit(e)
    {
        e.preventDefault();

        var act = this.state.activities

        var time = new Date("2000-01-01T" + this.state.inicio)

        // console.log("hora inicial: ", time.toLocaleTimeString('en-US', {timeStyle: 'medium', hour: '2-digit', minute:'2-digit'}))

        var sched = act.map((i) => {
            var result = {
                id: i.id,
                descrip: i.descrip,
                time: time.toLocaleTimeString('en-US', {timeStyle: 'medium', hour: '2-digit', minute:'2-digit'}),
                duracion: (i.hora>0?(i.hora+" hora(s) "):"") + i.min + " minutos",
                hora: i.hora,
                min: i.min
            }
            time = new Date(time.getTime() + (i.hora*60 + i.min)*60000);
            // console.log("hora actualizada: ", time)
            return result
        })

        var db = firebase.firestore();
        var accessThis = this;

        db.collection("Itinerario").doc(this.state.id).set({
                id: this.state.id,
                schedule: sched
            }, { merge: true })
        .then(function() {
            // console.log("Document written with ID: ", docRef.id);

            var message = 'Itinerario agregado exitosamente.'
            var typeMsg = 'success'

            accessThis.setState({
                modalMsg: message,
                modalType: typeMsg,
                showModal: true,
                descripActiv: '',
                durHora: 1,
                durMin: 0,
                inicio: '07:00',
                lastActId: 0
            });
        })
        .catch((err) => {
            accessThis.setState({
                modalMsg: 'Error al crear el itinerario. Intentelo más tarde.',
                modalType: 'error',
                showModal: true,
                descripActiv: '',
                durHora: 1,
                durMin: 0,
                inicio: '07:00'
            });
        })

        // console.log(sched)

        // $('.modal').modal('toggle')
    }

    handleClose(e)
    {
        //Reincia los inputs
        this.setState({
            name: '',
            descrip: '',
            precio: '',
            breakfast: false,
            lunch: false,
            coffe: false,
            capacity: 0,
            tipoRuta: 'Cientifico',
            durHora: '',
            durMin: '',
            descItiner: '',
            showModal: false
        });

        // $('.modal').modal({dismiss: false});

    }

    //Actualiza los valores cada vez que se hace un cambio en el input
    handleInputChange(e)
    {
        //obtiene el valor y el nombre del componente que cambio
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name == '' ? target.id : target.name;

        // Actualiza el campo que se modifico
        this.setState({
            [name]: value
        });
    }

    render()
    {
        var title = this.state.uploading?<div>Subir imagenes <LinearProgress variant="determinate" value={this.state.progress}/></div>:<div>Subir imagenes</div>

        var titleMap = this.state.uploading?<div>Subir Mapa <LinearProgress variant="determinate" value={this.state.progress}/></div>:<div>Subir Mapa</div>
        return (
            <div>
                <AdminNavigation />
                <Layout>
                    <div className="row justify-content-center mb-4">
                        <h3 className="my-4">
                            Administración paquetes
                        </h3>
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
                        data={this.state.items}
                        detailPanel={[
                            {
                                tooltip: 'Mas opciones',
                                render: rowData => {
                                    return (
                                        <div className="row justify-content-center">
                                            <Tooltip title="Agregar itinerario">
                                                <IconButton aria-label="agregar itinerario" data-toggle="modal" data-target="#setSchedule" onClick={this.loadSchedule.bind(this, rowData.id)}>
                                                    <LinearScale/>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Ver paquete">
                                                <IconButton>
                                                    <Link href="/pPackage/[infoPkg]" as={`/pPackage/${rowData.id}`}>
                                                        <VisibilityIcon/>
                                                    </Link>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Agregar fotos">
                                                <IconButton aria-label="agregar fotos" onClick={this.handleOpenImageLoad.bind(this, rowData.id)}>
                                                    <AddPhotoAlternateIcon/>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Agregar mapa">
                                                <IconButton onClick={this.handleOpenMapLoad.bind(this, rowData.id)}>
                                                    <LocationOnIcon/>
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                    )
                                },
                            }
                        ]}
                        editable={{
                            onRowAdd: newData =>
                                new Promise((resolve, reject) =>
                                {
                                    const data = this.state.items;
                                    newData['id'] = uuidv1();
                                    // newData.price = '₡ ' + newData.price;

                                    var img = this.fileInput.current.files[0]

                                    newData.refThumbnail = 'packages/' + newData.id + '/' + uuidv1() + '.png';
                                    newData.refImage = 'packages/' + newData.id + '/' + uuidv1() + '.png';
                                    newData.thumbnailURL = ''
                                    newData.imgURL = ''

                                    //check if there is any empty value
                                    if (!newData.hasOwnProperty('name'))
                                        newData.name = ''
                                    if (!newData.hasOwnProperty('descrip'))
                                        newData.descrip = ''
                                    if (!newData.hasOwnProperty('breakfast'))
                                        newData.breakfast = false
                                    if (!newData.hasOwnProperty('lunch'))
                                        newData.lunch = false
                                    if (!newData.hasOwnProperty('coffe'))
                                        newData.coffe = false
                                    if (!newData.hasOwnProperty('capacity'))
                                        newData.capacity = 0
                                    if (!newData.hasOwnProperty('price'))
                                        newData.price = 0

                                    newData.active = true

                                    var imgURI = ''
                                    var thumbnailURI = ''

                                    var resizeImg = new Promise((resolve, reject) =>
                                    {
                                        setTimeout(() =>
                                        {
                                            if (typeof img !== 'undefined')
                                            {
                                                Resizer.imageFileResizer(img, 75, 75, 'PNG', 100, 0,
                                                    uri => {
                                                        newData.thumbnailURI= uri

                                                        Resizer.imageFileResizer(img, 500, 500, 'PNG', 100, 0,
                                                            uri => {
                                                                newData.imgURI= uri
                                                                resolve()
                                                            },
                                                            'base64'
                                                        );
                                                    },
                                                    'base64'
                                                );
                                            }
                                            else
                                            {
                                                reject({code: 'upload/NoImage'})
                                            }
                                        }, 50)
                                    })

                                    var accessThis = this;

                                    resizeImg.then((success) =>
                                    {
                                        var ref = firebase.storage().ref();
                                        var db = firebase.firestore();

                                        // console.log(newData)

                                        // load thumbnail
                                        var pkgRef = ref.child(newData.refThumbnail);
                                        pkgRef.putString(newData.thumbnailURI, 'data_url')
                                            .then(function(snapshot) {
                                                pkgRef.getDownloadURL()
                                            .then(function(url) {
                                                newData.thumbnailURL = url

                                                //load big image
                                                pkgRef = ref.child(newData.refImage);
                                                pkgRef.putString(newData.imgURI, 'data_url')
                                            .then(function(snapshot) {
                                                pkgRef.getDownloadURL()
                                            .then(function(url) {
                                                newData.imgURL = url

                                                delete newData.imgURI;
                                                delete newData.thumbnailURI;

                                                db.collection("Paquetes").doc(newData.id).set(newData)
                                            .then(function(docRef) {
                                                // console.log("Document written with ID: ", docRef.id);

                                                data.push(newData);
                                                var message = ''
                                                var typeMsg = ''

                                                if (newData.name == '' || newData.descrip == '' ||
                                                    newData.capacity == 0 || newData.price == 0)
                                                {
                                                    message = 'Paquete agregado exitosamente. Hubo uno o más campos vacíos, favor revisar'
                                                    typeMsg = 'info'
                                                }
                                                else
                                                {
                                                    message = 'Paquete agregado exitosamente.'
                                                    typeMsg = 'success'
                                                }

                                                // console.log(data)
                                                accessThis.setState({
                                                    data,
                                                    modalMsg: message,
                                                    modalType: typeMsg,
                                                    showModal: true
                                                }, () => resolve());
                                            })
                                            })
                                            })
                                            })
                                            })
                                    })
                                    .catch((err) => {
                                        console.log(err)

                                        var ref = firebase.storage().ref();
                                        var db = firebase.firestore();
                                        if (err.code == 'upload/NoImage')
                                        {
                                            var pkgRef = ref.child('res/logoBackground.png');
                                            pkgRef.getDownloadURL()
                                            .then(function(url) {
                                                newData.thumbnailURL = url

                                                //load big image
                                                pkgRef = ref.child('res/logoBackgroundThumbnail.png');
                                                pkgRef.getDownloadURL()
                                            .then(function(url) {
                                                newData.imgURL = url

                                                delete newData.imgURI;
                                                delete newData.thumbnailURI;

                                                db.collection("Paquetes").doc(newData.id).set(newData)
                                            .then(function(docRef) {
                                                // console.log("Document written with ID: ", docRef.id);

                                                data.push(newData);
                                                accessThis.setState({
                                                    data,
                                                    modalMsg: 'Paquete agregado. NOTA: No se ingresó ninguna imagen',
                                                    modalType: 'warning',
                                                    showModal: true
                                                }, () => resolve());
                                            })
                                            })
                                            })
                                        }
                                        else
                                        {
                                            accessThis.setState({
                                                modalMsg: 'Error al crear el paquete. Intentelo más tarde.',
                                                modalType: 'error',
                                                showModal: true
                                            }, () => reject());
                                        }
                                    })
                                }),
                            onRowUpdate: (newData, oldData) =>
                                new Promise((resolve, reject) =>
                                {
                                    const data = this.state.items;
                                    const index = data.indexOf(oldData);
                                    //
                                    // if (newData.price.charAt(0) != '₡')
                                    //     newData.price = '₡ ' + newData.price;

                                    data[index] = newData;

                                    // this.setState({ data }, () => resolve());
                                    var img = this.fileInput.current.files[0]

                                    if (typeof img !== 'undefined' && newData.refThumbnail == 'res/logoBackgroundThumbnail.png')
                                    {
                                        newData.refThumbnail = 'packages/' + newData.id + '/' + uuidv1() + '.png';
                                        newData.refImage = 'packages/' + newData.id + '/' + uuidv1() + '.png';
                                        newData.thumbnailURL = ''
                                        newData.imgURL = ''
                                    }

                                    //check if there is any empty value
                                    if (!newData.hasOwnProperty('name'))
                                        newData.name = ''
                                    if (!newData.hasOwnProperty('descrip'))
                                        newData.descrip = ''
                                    if (!newData.hasOwnProperty('breakfast'))
                                        newData.breakfast = false
                                    if (!newData.hasOwnProperty('lunch'))
                                        newData.lunch = false
                                    if (!newData.hasOwnProperty('coffe'))
                                        newData.coffe = false
                                    if (!newData.hasOwnProperty('capacity'))
                                        newData.capacity = 0
                                    if (!newData.hasOwnProperty('price'))
                                        newData.price = 0

                                    var imgURI = ''
                                    var thumbnailURI = ''

                                    var resizeImg = new Promise((resolve, reject) =>
                                    {
                                        setTimeout(() =>
                                        {
                                            if (typeof img !== 'undefined')
                                            {
                                                Resizer.imageFileResizer(img, 75, 75, 'PNG', 100, 0,
                                                    uri => {
                                                        thumbnailURI= uri

                                                        Resizer.imageFileResizer(img, 500, 500, 'PNG', 100, 0,
                                                            uri => {
                                                                imgURI= uri
                                                                resolve()
                                                            },
                                                            'base64'
                                                        );
                                                    },
                                                    'base64'
                                                );
                                            }
                                            else
                                            {
                                                reject({code: 'upload/NoImage'})
                                            }
                                        }, 50)
                                    })

                                    var accessThis = this;

                                    resizeImg.then((success) =>
                                    {
                                        var ref = firebase.storage().ref();
                                        var db = firebase.firestore();

                                        // console.log(newData)

                                        // load thumbnail
                                        var pkgRef = ref.child(newData.refThumbnail);
                                        pkgRef.putString(thumbnailURI, 'data_url') //en caso de error agregarle el newData.*URI
                                            .then(function(snapshot) {
                                                pkgRef.getDownloadURL()
                                            .then(function(url) {
                                                newData.thumbnailURL = url

                                                //load big image
                                                pkgRef = ref.child(newData.refImage);
                                                pkgRef.putString(imgURI, 'data_url') //en caso de error agregarle el newData.*URI
                                            .then(function(snapshot) {
                                                pkgRef.getDownloadURL()
                                            .then(function(url) {
                                                newData.imgURL = url

                                                db.collection("Paquetes").doc(newData.id).set(newData)
                                            .then(function() {
                                                // console.log("Document written with ID: ", docRef.id);
                                                var message = ''
                                                var typeMsg = ''

                                                if (newData.name == '' || newData.descrip == '' ||
                                                    newData.capacity == 0 || newData.price == 0)
                                                {
                                                    message = 'Paquete actualizado exitosamente. Hubo uno o más campos vacíos, favor revisar'
                                                    typeMsg = 'info'
                                                }
                                                else
                                                {
                                                    message = 'Paquete actualizado exitosamente.'
                                                    typeMsg = 'success'
                                                }

                                                // console.log(message, typeMsg)
                                                accessThis.setState({
                                                    data,
                                                    modalMsg: message,
                                                    modalType: typeMsg,
                                                    showModal: true
                                                }, () => resolve());
                                            })
                                            })
                                            })
                                            })
                                            })
                                    })
                                    .catch((err) => {
                                        console.log(err)

                                        var ref = firebase.storage().ref();
                                        var db = firebase.firestore();
                                        if (err.code == 'upload/NoImage')
                                        {
                                            db.collection("Paquetes").doc(newData.id).set(newData)
                                            .then(function() {
                                                // console.log("Document with ID: ", newData.id, " updated");

                                                accessThis.setState({
                                                    data,
                                                    modalMsg: 'Paquete actualizado correctamente.',
                                                    modalType: 'success',
                                                    showModal: true
                                                }, () => resolve());
                                            })
                                        }
                                        else
                                        {
                                            accessThis.setState({
                                                modalMsg: 'Error al actualizar el paquete. Intentelo más tarde.',
                                                modalType: 'error',
                                                showModal: true
                                            }, () => reject());
                                        }
                                    })
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
                                    db.collection("Paquetes").doc(oldData.id)/*.set({
                                            active: false
                                        }, { merge: true })*/
                                    .delete()
                                    .then(function() {
                                        // console.log("Document written with ID: ", docRef.id);

                                        data.splice(index, 1);

                                        var message = 'Paquete eliminado exitosamente.'
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
                                            modalMsg: 'Error al eliminar el paquete. Intentelo más tarde.',
                                            modalType: 'error',
                                            showModal: true
                                        }, () => reject());
                                    })
                                })
                        }}
                        isLoading={this.state.loadingContent}
                        options={{
                            actionsColumnIndex: -1,
                            headerStyle: {
                                paddingLeft: '5px',
                                paddingRight: '5px',
                                backgroundColor: '#0fb4f0'
                            },
                            filtering: false,
                            padding: 'dense',
                            addRowPosition: 'first'
                        }}
                    />

                    {/*Modal 2*/}
                    <div className="modal fade" id="setSchedule" tabIndex="-1" role="dialog" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <form className="" onSubmit={this.handleSubmit}>
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Creación del itinerario</h5>
                                        <button type="button" className="close"  data-dismiss="modal" onClick={this.handleClose} aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <label>Hora de inicio del viaje</label>
                                        <div className="row justify-content-center form-inline">
                                            <div className="input-group mx-1">
                                                <TextField
                                                    name="inicio"
                                                    type="time"
                                                    value={this.state.inicio}
                                                    onChange={this.handleInputChange}
                                                    InputLabelProps={{
                                                      shrink: true,
                                                    }}
                                                    inputProps={{
                                                      step: 300, // 5 min
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <label className="mt-3">Agregar actividades</label>
                                        <div className="border border-primary rounded pb-2 px-2">
                                            <div className="form-group">
                                                <TextField
                                                    name="descripActiv"
                                                    label="Descripción de la actividad"
                                                    placeholder=""
                                                    multiline
                                                    margin="normal"
                                                    fullWidth
                                                    value={this.state.descripActiv}
                                                    onChange={this.handleInputChange}
                                                />
                                            </div>
                                            <label>Duración estimada de la actividad</label>
                                            <div className="row justify-content-center form-inline">
                                                <div className="input-group mx-1 col-4">
                                                    <TextField
                                                        name="durHora"
                                                        label="Hora(s)"
                                                        value={this.state.durHora}
                                                        min="1" max="12"
                                                        onChange={this.handleInputChange}
                                                        type="number"
                                                        InputLabelProps={{
                                                          shrink: true,
                                                        }}
                                                        margin="normal"
                                                    />
                                                </div>
                                                <div className="input-group mx-1 col-4">
                                                    <TextField
                                                        name="durMin"
                                                        label="Minutos"
                                                        value={this.state.durMin}
                                                        min="0" max="59"
                                                        onChange={this.handleInputChange}
                                                        type="number"
                                                        InputLabelProps={{
                                                          shrink: true,
                                                        }}
                                                        margin="normal"
                                                    />
                                                </div>
                                                <div className="row justify-content-end pr-3">
                                                    <button type="button" className="btn btn-primary ml-3 m-2 rounded-circle" style={{height: "50px"}} onClick={this.addActivity}>
                                                        <AddIcon />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <DraggableList
                                                itemKey="id"
                                                template={SchedBuilder}
                                                onMoveEnd={(newList, movedItem) => this._onListChange(newList, movedItem)}
                                                list={this.state.activities}
                                                commonProps={{delete: this.removeActivity}}
                                              />
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">
                                            Cerrar
                                        </button>
                                        <button type="button" className="btn btn-primary" type="submit">
                                            Confirmar
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>



                    <DropzoneDialog
                        open={this.state.openImgLoad}
                        onSave={this.handleSubmitImages}
                        dialogTitle={title}
                        filesLimit={50}
                        acceptedFiles={['image/*']}
                        showPreviews={true}
                        maxFileSize={10000000}
                        onClose={this.handleCloseImageLoad}
                    />

                    <DropzoneDialog
                        open={this.state.openMapLoad}
                        onSave={this.handleSubmitMap}
                        dialogTitle={titleMap}
                        filesLimit={1}
                        acceptedFiles={['image/*']}
                        showPreviews={true}
                        maxFileSize={5000000}
                        onClose={this.handleCloseMapLoad}
                    />
                </Layout>

            </div>
        )
    }
}

export default AdminPackages;
