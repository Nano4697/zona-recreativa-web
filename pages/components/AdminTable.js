import React, {Component} from 'react'
import Table from 'react-bootstrap/Table'

class AdminTable extends Component {

    render() {
        return(
            <Table striped bordered hover style={{tableLayout: "fixed"}}>
                <thead>
                    <tr>
                        <th style={{width: "6%"}}>Nombre</th>
                        <th style={{width: "12%"}}>Descripción</th>
                        <th style={{width: "4%"}}>Desayuno</th>
                        <th style={{width: "4%"}}>Almuerzo</th>
                        <th style={{width: "2.5%"}}>Cafe</th>
                        <th style={{width: "4%"}}>Capacidad</th>
                        <th style={{width: "4%"}}>Tipo de ruta</th>
                        <th style={{width: "4%"}}>Precio</th>
                        <th style={{width: "3%"}}></th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.children}
                </tbody>
            </Table>
        );
    }
}

export default AdminTable;
