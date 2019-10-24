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

import Resizer from 'react-image-file-resizer';

//Components
import AdminNavigation from './components/AdminNavigation';
import Layout from './components/FullLayout';
import SchedBuilder from './components/schedBuilder';
import SnackbarAlert from './components/SnackbarAlert'

//Others
import AddIcon from '@material-ui/icons/Add';
import LinearScale from '@material-ui/icons/LinearScale';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import VisibilityIcon from '@material-ui/icons/Visibility';
import InfoIcon from '@material-ui/icons/Info';

// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import firebaseConfig from './lib/firebase/firebase'

var ReactDOM = require('react-dom');
var uniqid = require('uniqid');


class AdminPackages extends Component {

    constructor (props)
    {
        super(props);

        // Initialize firebase
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        firebase.auth().onAuthStateChanged(function(user)
        {
            if (user)
            {
                // User is signed in.
                // username = user.email;
                // uid = user.uid;
                // providerData = user.providerData;
                //
                // Router.push('/adminMain')
                // return {user: username, id: uid, provider: provider}
            }
            else
            {
                Router.push('/')
            }
        });

        //inicializa state
        this.state = {
            durHora: '',
            durMin: '',
            descripActiv: '',
            inicioHora: '',
            inicioMin: '',
            inicioAMPM: 'am',
            activities: [],
            items: this.props.data,
            img: {},
            showModal: false,
            modalType: 'success',
            modalMsg: '',

            columns: [
                { title: 'Imagen', field: 'thumbnail', render: rowData => (
                    <img
                        style={{ height: 36, width: 36, borderRadius: '50%' }}
                        src={rowData.thumbnailURL}
                    />
                    ), editComponent: props => (
                        <input
                            type="file"
                            accept="image/*"
                            value={props.value}
                            ref={this.fileInput}
                        />
                    )
                },
                { title: 'Nombre', field: 'name' },
                { title: 'Descripción', field: 'descrip' },
                { title: 'Capacidad', field: 'capacity', type: 'numeric' },
                { title: 'Tipo de ruta', field: 'type', lookup: { cientifico: 'Cientifico', cultural: 'Cultural', educativo: 'Educativo', recreativo: 'Recreativo' } },
                { title: 'Desayuno', field: 'breakfast', type: 'boolean' },
                { title: 'Almuerzo', field: 'lunch', type: 'boolean' },
                { title: 'Cafe', field: 'coffe', type: 'boolean' },
                { title: 'Precio', field: 'price', type: 'numeric' }
            ]
        };


        this.fileInput = React.createRef();

        //Se necesita hacer bind a todas la funciones que se usen dentro de la clase.
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addActivity = this.addActivity.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this._onListChange = this._onListChange.bind(this);
        this.loadSchedule = this.loadSchedule.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.removeActivity = this.removeActivity.bind(this);
    }

    static async getInitialProps()
    {
        // Initialize firebase
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        var db = firebase.firestore();

        var items = []

        await db.collection("Paquetes").get().then((querySnapshot) => {
            console.log(querySnapshot)
            querySnapshot.forEach((doc) => {
                if (doc.exists)
                {
                    items.push(doc.data());
                }
            });
        });

        // if (query.hasOwnProperty("tipo"))
        //     return {tipo: query.tipo, criteria: filter}
        // else
        //     return {criteria: filter}
        return {data: items}
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
        // ReactDOM.findDOMNode(this.myRef.current).setAttribute('required', true);
        // $('#setSchedule').modal('handleUpdate')
    }

    componentDidUpdate()
    {
        $('#setSchedule').modal('handleUpdate')
    }

    loadSchedule(id)
    {
        this.setState({
            activities: [...this.state.activities, {id: 1, descrip: "Descripcion de prueba", hora: "7", min: "00", ampm: "am"}]
        })
    }

    removeActivity(index)
    {
        this.setState({
            activities: this.state.activities.filter((e, i) => {
                console.log(this.state.activities[i].id + ", " + index)
                return this.state.activities[i].id != index
            })
        });

        console.log(this.state.activities);
        this.forceUpdate();
    }

    addActivity(e)
    {
        e.preventDefault();

        var descrip = this.state.descripActiv;
        var hora = this.state.durHora;
        var min = this.state.durMin;
        var id = this.state.lastActId;
        this.setState({
                activities: [...this.state.activities, {id, descrip, hora, min}],
                lastActId: this.state.lastActId+1
            })

        console.log(this.state.activities)

    }

    _onListChange(newList, movedItem)
    {
        console.log(movedItem)
        this.setState({activities: newList});
    }

    handleSubmit(e)
    {
        e.preventDefault();

        console.log(this.state)

        //Poner aqui lo que tiene que hacer el form cuando se envia la informacion
        // let message = 'Paquete agregado';
        // var uid = uniqid();
        // var obj = {
        //     id: uid,
        //     name: this.state.name,
        //     descrip: this.state.descrip,
        //     breakfast: this.state.breakfast,
        //     lunch: this.state.lunch,
        //     coffe: this.state.coffe,
        //     capacity: parseInt(this.state.capacity, 10),
        //     type: this.state.type,
        //     price: '₡ ' + this.state.precio
        // }
        //
        // if (this.state.editId === -1) {
        //     this.state.items.push(obj);
        // } else {
        //     this.state.items[this.state.editId] = obj;
        //     message = 'Cambios guardados';
        // }
        //
        // //Reincia los inputs
        // this.setState({
        //     name: '',
        //     descrip: '',
        //     breakfast: false,
        //     precio: '',
        //     lunch: false,
        //     coffe: false,
        //     capacity: 0,
        //     tipoRuta: '',
        //     durHora: 0,
        //     durMin: 0,
        //     descItiner: '',
        //     showModal: false,
        //     showMessage: true,
        //     message: message
        // });
        //
        // $('#setSchedule').modal('hide')
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

        $('.modal').modal({dismiss: false});

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
        return(
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
                                                <IconButton aria-label="agregar itinerario" data-toggle="modal" data-target="#setSchedule" onClick={this.loadSchedule}>
                                                    <LinearScale/>
                                                </IconButton>
                                            </Tooltip>
                                            {console.log(rowData)}
                                        </div>
                                    )
                                },
                            }
                        ]}
                        editable={{
                            onRowAdd: newData =>
                                new Promise((resolve, reject) =>
                                {
                                    setTimeout(() =>
                                    {
                                        const data = this.state.items;
                                        newData['id'] = uniqid();
                                        // newData.price = '₡ ' + newData.price;

                                        this.setState({
                                            img: this.fileInput.current.files[0]
                                        })



                                        newData.refThumbnail = 'packages/' + uniqid() + '.png';
                                        newData.refImage = 'packages/' + uniqid() + '.png';
                                        newData.thumbnailURL = ''
                                        newData.imgURL = ''

                                        var imgURI = ''
                                        var thumbnailURI = ''

                                        var resizeImg = new Promise((resolve, reject) =>
                                        {
                                            setTimeout(() =>
                                            {
                                                var img = this.state.img

                                                Resizer.imageFileResizer(img, 75, 75, 'PNG', 100, 0,
                                                    uri => {
                                                        newData.thumbnailURI= uri

                                                        Resizer.imageFileResizer(img, 300, 300, 'PNG', 100, 0,
                                                            uri => {
                                                                newData.imgURI= uri
                                                                resolve()
                                                            },
                                                            'base64'
                                                        );
                                                    },
                                                    'base64'
                                                );
                                            }, 50)
                                        })

                                        var accessThis = this;

                                        resizeImg.then((success) =>
                                        {
                                            var ref = firebase.storage().ref();
                                            var db = firebase.firestore();

                                            console.log(newData)

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

                                                    db.collection("Paquetes").add(newData)
                                                .then(function(docRef) {
                                                    console.log("Document written with ID: ", docRef.id);

                                                    data.push(newData);
                                                    accessThis.setState({
                                                        data,
                                                        modalMsg: 'Paquete agregado exitosamente',
                                                        modalType: 'success',
                                                        showModal: true
                                                    });
                                                })
                                                })
                                                })
                                                })
                                                })
                                        })
                                        .catch((err) => {

                                            console.log(err)
                                        })




                                        resolve()
                                    }, 1000)
                                }),
                            onRowUpdate: (newData, oldData) =>
                                new Promise((resolve, reject) =>
                                {
                                    setTimeout(() =>
                                    {
                                        {
                                            const data = this.state.items;
                                            const index = data.indexOf(oldData);

                                            if (newData.price.charAt(0) != '₡')
                                                newData.price = '₡ ' + newData.price;

                                            data[index] = newData;
                                            this.setState({ data }, () => resolve());
                                        }
                                        resolve()
                                    }, 1000)
                                })
                        }}
                        actions={[
                            {
                                icon: LinearScale,
                                tooltip: 'Itinerario',
                                onClick: (event, rowData) => {
                                    $('#setSchedule').modal('show')
                                    console.log(rowData)
                                }
                            }
                        ]}
                        options={{
                            actionsColumnIndex: -1,
                            headerStyle: {
                                paddingLeft: '5px',
                                paddingRight: '5px'
                              }
                        }}
                    />

                    {/*<div className="modal fade" id="addPkg" tabIndex="-1" role="dialog" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <form className="" onSubmit={this.firstSubmit}>
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Nuevo paquete</h5>
                                        <button type="button" className="close"  data-dismiss="modal" onClick={this.handleClose} aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="form-group">
                                            <label htmlFor="name">Nombre del paquete</label>
                                            <input className="form-control" name="name" type="text" placeholder="Nombre del paquete" value={this.state.name} onChange={this.handleInputChange} required/>
                                        </div>
                                        <div className="mt-2 form-group">
                                            <label htmlFor="descrip">Descripción del paquete</label>
                                            <textarea className="form-control" name="descrip" type="textarea" rows="2" placeholder="Descripción del paquete" value={this.state.descrip} onChange={this.handleInputChange} required/>
                                        </div>
                                        <label>Alimentación</label>
                                        <div className="row justify-content-center">
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="checkbox" name="breakfast" value={this.state.breakfast} onChange={this.handleInputChange}/>
                                                <label className="form-check-label" htmlFor="breakfast">Desayuno</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="checkbox" name="lunch" value={this.state.lunch} onChange={this.handleInputChange}/>
                                                <label className="form-check-label" htmlFor="lunch">Almuerzo</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="checkbox" name="coffe" value={this.state.coffe} onChange={this.handleInputChange}/>
                                                <label className="form-check-label" htmlFor="coffe">Café/Merienda</label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col mt-2 form-group">
                                                <label htmlFor="capacity">Capacidad</label>
                                                <input className="form-control" name="capacity" type="number" min="1" placeholder="Cap. máxima" value={this.state.capacity} onChange={this.handleInputChange}/>
                                            </div>
                                            <div className="col px-0 mt-2 form-group">
                                                <label htmlFor="precio">Precio</label>
                                                <input className="form-control" name="precio" type="number" min="1" placeholder="Precio" value={this.state.precio} onChange={this.handleInputChange}/>
                                            </div>
                                            <div className="col mt-2 form-group">
                                                <label htmlFor="type">Tipo de viaje</label>
                                                <select className="form-control" placeholder="Tipo de viaje" name="type" value={this.state.type} onChange={this.handleInputChange}>
                                                    <option value='cientifico'>Científico</option>
                                                    <option value='cultural'>Cultural</option>
                                                    <option value='educativo'>Educativo</option>
                                                    <option value='recreativo'>Recreativo</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.handleClose}>
                                            Cancelar
                                        </button>
                                        <button type="button" className="btn btn-primary" type="submit">
                                            Siguiente
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>*/}

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
                                                <input className="form-control" name="inicioHora" type="number" min="0" max="12" value={this.state.inicioHora} onChange={this.handleInputChange}/>
                                                <div className="input-group-append">
                                                    <span className="input-group-text" id="hour-addon2">Hora</span>
                                                </div>
                                            </div>
                                            <div className="input-group mx-1">
                                                <input className="form-control" name="inicioMin" type="number" min="0" max="59" value={this.state.inicioMin} onChange={this.handleInputChange}/>
                                                <div className="input-group-append">
                                                    <span className="input-group-text" id="min-addon2">Minuto</span>
                                                </div>
                                            </div>
                                            <div className="input-group mx-1">
                                                <select className="form-control" placeholder="Tipo de viaje" name="inicioAMPM" value={this.state.inicioAMPM} onChange={this.handleInputChange}>
                                                    <option>AM</option>
                                                    <option>PM</option>
                                                </select>
                                            </div>
                                        </div>
                                        <label className="mt-3">Agregar actividades</label>
                                        <div className="border border-primary rounded pb-2 px-2">
                                            <div className="form-group">
                                                <label htmlFor="descripActiv">Descripción de la actividad</label>
                                                <textarea className="form-control" name="descripActiv" type="textarea" rows="2" placeholder="Breve Descripción de la actividad" value={this.state.descripActiv} onChange={this.handleInputChange}/>
                                            </div>
                                            <label>Duración estimada de la actividad</label>
                                            <div className="row justify-content-center form-inline">
                                                <div className="input-group mx-1">
                                                    <input className="form-control" name="durHora" type="number" min="1" max="12" value={this.state.durHora} onChange={this.handleInputChange}/>
                                                    <div className="input-group-append">
                                                        <span className="input-group-text" id="hour-addon2">Hora</span>
                                                    </div>
                                                </div>
                                                <div className="input-group mx-1">
                                                    <input className="form-control" name="durMin" type="number" min="0" max="59" value={this.state.durMin} onChange={this.handleInputChange}/>
                                                    <div className="input-group-append">
                                                        <span className="input-group-text" id="min-addon2">Minuto</span>
                                                    </div>
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
                                                onDelete={this.removeActivity}
                                                commonProps={{onDelete: this.removeActivity}}
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
                </Layout>

            </div>
        )
    }
}

export default AdminPackages;
