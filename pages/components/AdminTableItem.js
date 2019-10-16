import React, {Component} from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Button from 'react-bootstrap/Button'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Link from 'next/link';

class AdminTableItem extends Component {

    constructor ()
    {
        super();

        //Se necesita hacer bind a todas la funciones que se usen dentro de la clase.
        this.onDelete = this.onDelete.bind(this);
    }

    onDelete()
    {
        if (typeof this.props.onDelete==='function')
        {
            this.props.onDelete(this.props.id);
        }
    }

    render() {
        return(
            <tr>
                {this.props.items!=undefined && this.props.items.map(data => <td style={{overflow: "auto"}}>{data}</td>)}
                <td>
                <a onClick={() => typeof this.props.onEdit==='function' && this.props.onEdit(this.props.id)}>
                    <EditIcon />
                </a>
                <OverlayTrigger
                    placement='bottom'
                    trigger='click'
                    overlay={
                        <Tooltip id={this.props.id}>
                        </Tooltip>
                    }
                >
                <a onClick={this.onDelete} style={{cursor: "pointer"}}>
                    <DeleteIcon />
                </a>
                </OverlayTrigger>
                </td>
            </tr>
        );
    }
}

export default AdminTableItem;
