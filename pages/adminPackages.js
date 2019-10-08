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
        const {value, name} = e.target;
        // console.log(value, name);

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
                        <a onClick={this.addPackage}><AddIcon /></a>
                    </div>
                    <div className="package-admin-table">
                        <AdminTable headers={['Nombre Paquete','Hora inicio','Hora final','Capacidad','Tipo de ruta']}>
                            {this.state.items.map((item, index) => <AdminTableItem id={index} items={item} onEdit={this.editPackage} onDelete={this.deletePackage} />)}
                        </AdminTable>
                    </div>

                    <Modal show={this.state.showModal} onHide={this.handleClose} centered>
                        <Modal.Header closeButton>
                            <Modal.Title></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="" style={{textAlign: 'center'}}>
                                <Formik  onSubmit={(data)=>{console.log(data)}}
                                    initialValues = {{
                                    nombrePaquete: "",
                                    horaInicio: "",
                                    horaFinal: "",
                                    capacidadPaquete: "",
                                    tipoRuta: "" }}>
                                    {({handleSubmit}) =>
                                        <Form onSubmit={handleSubmit}>
                                            <Field name="nombrePaquete" placeholder="Nombre del paquete" component={this.InputField} className="form-control" value={this.state.nombrePaquete}  onChange={this.handleInputChange} />
                                            <Field name="horaInicio" placeholder="Hora de Inicio" component={this.InputField} className="form-control" value={this.state.horaInicio}  onChange={this.handleInputChange} />
                                            <Field name="horaFinal" placeholder="Hora Final" component={this.InputField} className="form-control" value={this.state.horaFinal}  onChange={this.handleInputChange} />
                                            <Field name="capacidadPaquete" placeholder="Capacidad de paquete" component={this.InputField} className="form-control" value={this.state.capacidadPaquete}  onChange={this.handleInputChange} />
                                            <Field name="tipoRuta" placeholder="Tipo de ruta" component={this.InputField}  className="form-control" value={this.state.tipoRuta}  onChange={this.handleInputChange} />
                                        </Form>
                                    }
                                </Formik>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="light" onClick={this.handleClose}>
                                Cancelar
                            </Button>
                            <Button variant="dark" onClick={this.handleSubmit}>
                                Enviar
                            </Button>
                        </Modal.Footer>
                    </Modal>
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
