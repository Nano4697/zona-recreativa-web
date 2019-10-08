import React, {Component} from 'react'
import Table from 'react-bootstrap/Table'

class AdminTable extends Component {

    render() {
        return(
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {this.props.headers!=undefined && this.props.headers.map(item => <th>{item}</th>)}
                        <th>{/* Acciones */}</th>
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
