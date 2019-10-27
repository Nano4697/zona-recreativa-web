//Packages
import React, { Component } from 'react';

class SchedBuilder extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            id: this.props.item.id,
            descripActiv: this.props.item.descrip,
            durHora: this.props.item.hora,
            durMin: this.props.item.min
        }

        this.removeActivity = this.removeActivity.bind(this);
    }

    removeActivity(id)
    {
        this.props.commonProps.onDelete(this.state.id)
    }

    render()
    {
        const {itemSelected, dragHandleProps} = this.props;

        return (
            <div className="border rounded px-2 my-2 py-2">
                <div className="dragHandle" {...dragHandleProps}>
                <div className="row">
                    <div className="col-11">
                        {this.state.descripActiv} <br/>
                    {"Duración: " + this.state.durHora + " hora y " + this.state.durMin + " minutos."}
                    </div>
                    <div className="col-1">
                        <button type="button" className="close" onClick={this.removeActivity} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default SchedBuilder;
