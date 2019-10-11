import Layout from './components/GeneralLayout';
import AdminNavigation from './components/AdminNavigation';
import AdminTable from './components/AdminTable';
import AdminTableItem from './components/AdminTableItem';
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Toast from 'react-bootstrap/Toast'
import { Formik, Field } from 'formik';
import AddIcon from '@material-ui/icons/Add';

import React, { Component } from 'react';

class AdminPackages extends Component {

    constructor ()
    {
        super();

        //inicializa state
        this.state = {
            nombrePaquete: '',
            precioPaquete: '',
            breakfast: false,
            lunch: false,
            coffe: false,
            horaInicio: '',
            horaFinal: '',
            capacidadPaquete: '',
            tipoRuta: '',
            tipoGeografia: '',
            showModal: false,
            showMessage: false,
            editId: -1,
            items: []
        };

        //Se necesita hacer bind a todas la funciones que se usen dentro de la clase.
        this.handleInputChange = this.handleInputChange.bind(this);
        this.addPackage = this.addPackage.bind(this);
        this.editPackage = this.editPackage.bind(this);
        this.deletePackage = this.deletePackage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    InputField = ({
        field,
        form: _,
        ...props
        }) => {
        return (
            <div>
                <input style={{marginTop:5, marginBottom:15 , padding:10}} {...field} {...props} />
            </div>
        );
    };

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

    handleSubmit(e)
    {
        e.preventDefault();

        //Poner aqui lo que tiene que hacer el form cuando se envia la informacion
        let message = 'Paquete agregado';
        if (this.state.editId === -1) {
            this.state.items.push([
                this.state.nombrePaquete,
                this.state.horaInicio,
                this.state.horaFinal,
                this.state.capacidadPaquete,
                this.state.tipoRuta]);
        } else {
            this.state.items[this.state.editId] = [
                this.state.nombrePaquete,
                this.state.horaInicio,
                this.state.horaFinal,
                this.state.capacidadPaquete,
                this.state.tipoRuta];
            message = 'Cambios guardados';
        }
        //console.log(this.state);

        //Reincia los inputs
        this.setState({
            nombrePaquete: '',
            horaInicio: '',
            horaFinal: '',
            capacidadPaquete: '',
            tipoRuta: '',
            showModal: false,
            showMessage: true,
            message: message
        });
    }

    handleClose(e)
    {
        //Reincia los inputs
        this.setState({
            nombrePaquete: '',
            precioPaquete: '',
            horaInicio: '',
            horaFinal: '',
            capacidadPaquete: '',
            tipoRuta: '',
            tipoGeografia: '',
            showModal: false
        });
    }

    //Actualiza los valores cada vez que se hace un cambio en el input
    handleInputChange(e)
    {
        //obtiene el valor y el nombre del componente que cambio
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        console.log(value, name);

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
                    <div className="row justify-content-center">
                        <h1 className="mt-2 mb-4">
                            Administración paquetes
                        </h1>
                    </div>

                    <div className="row justify-content-end pr-3">
                        <button type="button" className="btn btn-primary m-2 rounded-circle" data-toggle="modal" data-target="#addPkg" style={{height: "50px"}}>
                            <AddIcon />
                        </button>
                    </div>
                    <div className="package-admin-table">
                        <AdminTable headers={['Nombre Paquete','Hora inicio','Hora final','Capacidad','Tipo de ruta']}>
                            {this.state.items.map((item, index) => <AdminTableItem id={index} items={item} onEdit={this.editPackage} onDelete={this.deletePackage} />)}
                        </AdminTable>
                    </div>

                    <div className="modal fade" id="addPkg" tabIndex="-1" role="dialog" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Nuevo paquete</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form className="" onSubmit={this.handleSubmit}>
                                        <div className="mt-2 form-group">
                                            <label htmlFor="name">Nombre del paquete</label>
                                            <input className="form-control" name="name" type="text" placeholder="Nombre del paquete" value={this.state.name} onChange={this.handleInputChange}/>
                                        </div>
                                        <div className="mt-2 form-group">
                                            <label htmlFor="description">Descripción del paquete</label>
                                            <textarea className="form-control" name="description" type="textarea" rows="2" placeholder="Descripción del paquete" value={this.state.descrip} onChange={this.handleInputChange}/>
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
                                                <input className="form-control" name="capacity" type="number" min="0" placeholder="Capacidad máxima del grupo" value={this.state.capacity} onChange={this.handleInputChange}/>
                                            </div>
                                            <div className="col mt-2 form-group">
                                                <label htmlFor="type">Tipo</label>
                                                <select className="form-control" placeholder="Tipo de viaje" value={this.state.type} onChange={this.handleInputChange}>
                                                    <option>Científico</option>
                                                    <option>Cultural</option>
                                                    <option>Educativo</option>
                                                    <option>Recreativo</option>
                                                </select>
                                            </div>
                                        </div>
                                        {/*<Field name="nombrePaquete" placeholder="Nombre del paquete" component={this.InputField} className="form-control" value={this.state.nombrePaquete}  onChange={this.handleInputChange} />
                                        <Field name="horaInicio" placeholder="Hora de Inicio" component={this.InputField} className="form-control" value={this.state.horaInicio}  onChange={this.handleInputChange} />
                                        <Field name="horaFinal" placeholder="Hora Final" component={this.InputField} className="form-control" value={this.state.horaFinal}  onChange={this.handleInputChange} />
                                        <Field name="capacidadPaquete" placeholder="Capacidad de paquete" component={this.InputField} className="form-control" value={this.state.capacidadPaquete}  onChange={this.handleInputChange} />
                                        <Field name="tipoRuta" placeholder="Tipo de ruta" component={this.InputField}  className="form-control" value={this.state.tipoRuta}  onChange={this.handleInputChange} />*/}
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.handleClose}>
                                        Cancelar
                                    </button>
                                    <button type="button" className="btn btn-primary" type="submit">
                                        Confirmar
                                    </button>
                                </div>
                            </div>
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
