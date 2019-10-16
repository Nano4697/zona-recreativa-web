//Packages
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Toast from 'react-bootstrap/Toast'
import CurrencyInput from 'react-currency-input-field'
import DraggableList from 'react-draggable-list';

//Components
import AdminNavigation from './components/AdminNavigation';
import Layout from './components/FullLayout';
import AdminTable from './components/AdminTable';
import AdminTableItem from './components/AdminTableItem';
import SchedBuilder from './components/schedBuilder';

//Others
import AddIcon from '@material-ui/icons/Add';

var ReactDOM = require('react-dom');

class AdminPackages extends Component {

    constructor ()
    {
        super();

        //inicializa state
        this.state = {
            name: '',
            descrip: '',
            breakfast: false,
            precio: 0,
            lunch: false,
            coffe: false,
            capacity: 0,
            type: 'Científico',
            durHora: '',
            durMin: '',
            descripActiv: '',
            inicioHora: '',
            inicioMin: '',
            inicioAMPM: 'am',
            activities: [],
            lastActId: 0,

            horaInicio: '',
            horaFinal: '',
            tipoGeografia: '',
            showModal: false,
            showMessage: false,
            editId: -1,
            items: []
        };

        this.myRef = React.createRef();

        //Se necesita hacer bind a todas la funciones que se usen dentro de la clase.
        this.handleInputChange = this.handleInputChange.bind(this);
        this.addPackage = this.addPackage.bind(this);
        this.editPackage = this.editPackage.bind(this);
        this.deletePackage = this.deletePackage.bind(this);
        this.firstSubmit = this.firstSubmit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.toSchedule = this.toSchedule.bind(this);
        this.toPkgAdd = this.toPkgAdd.bind(this);
        this.addActivity = this.addActivity.bind(this);
        this.removeActivity = this.removeActivity.bind(this);
        this._onListChange = this._onListChange.bind(this);
    }

    componentDidMount()
    {
        ReactDOM.findDOMNode(this.myRef.current).setAttribute('required', true);
        $('#setSchedule').modal('handleUpdate')
    }

    componentDidUpdate()
    {
        $('#setSchedule').modal('handleUpdate')
    }

    toSchedule()
    {
        $('#addPkg').modal('dispose')
        $('#setSchedule').modal('show')
    }

    toPkgAdd()
    {
        $('#setSchedule').modal('hide')
        $('#setSchedule').on('hidden.bs.modal', function (e) {
            $('#addPkg').modal('show')
        })
    }

    addPackage(e)
    {
        this.setState({
            showModal: true,
            editId: -1
        });
    }

    editPackage(id)
    {
        this.setState({
            nombrePaquete: this.state.items[id][0],
            precioPaquete: this.state.items[id][1],
            horaInicio: this.state.items[id][2],
            horaFinal: this.state.items[id][3],
            capacidadPaquete: this.state.items[id][4],
            tipoRuta: this.state.items[id][5],
            tipoGeografia: this.state.items[id][6],
            showModal: true,
            editId: id
        });
    }

    deletePackage(id)
    {
        this.state.items.pop(id);

        this.setState({
            showMessage: true,
            message: 'Paquete eliminado'
        });
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
        let message = 'Paquete agregado';
        if (this.state.editId === -1) {
            this.state.items.push([
                this.state.name,
                this.state.descrip,
                this.state.breakfast?'Sí':'No',
                this.state.lunch?'Sí':'No',
                this.state.coffe?'Sí':'No',
                parseInt(this.state.capacity, 10),
                this.state.type,
                this.state.precio]);
        } else {
            this.state.items[this.state.editId] = [
                this.state.name,
                this.state.descrip,
                this.state.breakfast?'Sí':'No',
                this.state.lunch?'Sí':'No',
                this.state.coffe?'Sí':'No',
                parseInt(this.state.capacity, 10),
                this.state.type,
                this.state.precio];
            message = 'Cambios guardados';
        }

        //Reincia los inputs
        this.setState({
            name: '',
            descrip: '',
            breakfast: false,
            precio: '',
            lunch: false,
            coffe: false,
            capacity: 0,
            tipoRuta: '',
            durHora: 0,
            durMin: 0,
            descItiner: '',
            showModal: false,
            showMessage: true,
            message: message
        });

        $('#setSchedule').modal('toggle')
    }

    firstSubmit(e)
    {
        e.preventDefault();

        if (!(this.state.name == '' || this.state.descrip == '' || this.state.precio == '' || this.state.capacity == 0))
        {
            $('#addPkg').modal('hide')
            $('#addPkg').on('hidden.bs.modal', function (e) {
                $('#setSchedule').modal('show')
            })
        }

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

        $('#addPkg').modal('hide')
        $('#setSchedule').modal('hide')
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
        var alertModal;

        if(this.props.alertModal!='')
        {
            alertModal = <div className="alert alert-success alert-dismissible fade show" role="alert" style={{fontSize: "12px"}}>
                Hemos creado una plantilla para tu mensaje. ¡Edítalo o crea uno nuevo que se adecúe a tus necesidades!.
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        }
        return(
            <div>
                <AdminNavigation />
                <Layout>
                    <div className="row justify-content-center">
                        <h3 className="mt-4">
                            Administración paquetes
                        </h3>
                    </div>

                    <div className="row justify-content-end pr-3">
                        <button type="button" className="btn btn-primary m-2 rounded-circle" data-toggle="modal" data-target="#addPkg" style={{height: "50px"}}>
                            <AddIcon />
                        </button>
                    </div>

                    <div className="" style={{whiteSpace: "nowrap", overflowX: "auto"}}>
                        <AdminTable headers={['Nombre','Descripción','Desayuno', 'Almuerzo', 'Cafe','Capacidad','Tipo de ruta','Precio']}>
                            {this.state.items.map((item, index) => <AdminTableItem id={index} items={item} onEdit={this.editPackage} onDelete={this.deletePackage} />)}
                        </AdminTable>
                    </div>

                    <div className="modal fade" id="addPkg" tabIndex="-1" role="dialog" aria-hidden="true">
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
                                                <CurrencyInput
                                                    className="form-control"
                                                    id="precio"
                                                    value={this.state.precio}
                                                    onChange={this.handleInputChange}
                                                    ref={this.myRef}
                                                    prefix={'₡ '}
                                                />
                                            </div>
                                            <div className="col mt-2 form-group">
                                                <label htmlFor="type">Tipo de viaje</label>
                                                <select className="form-control" placeholder="Tipo de viaje" name="type" value={this.state.type} onChange={this.handleInputChange}>
                                                    <option>Científico</option>
                                                    <option>Cultural</option>
                                                    <option>Educativo</option>
                                                    <option>Recreativo</option>
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
                    </div>

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
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.toPkgAdd}>
                                            Atrás
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

                <Toast style={{
                        position: 'absolute',
                        top: 80,
                        right: 10,}}
                    onClose={() => this.setState({showMessage: false})} show={this.state.showMessage} delay={5000} autohide>
                    <Toast.Header>
                        <strong className="mr-auto"></strong>
                    </Toast.Header>
                    <Toast.Body>{this.state.message}</Toast.Body>
                </Toast>

            </div>
        )
    }
}

export default AdminPackages;
