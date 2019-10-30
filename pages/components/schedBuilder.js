//Packages
import React, { Component } from 'react';

class SchedBuilder extends Component {
    constructor(props)
    {
        super(props);
        // console.log ("schedBuilder", props)

        var propsId = '';
        var propsDesc = '';
        var propsHora = '';
        var propsMin = '';

        if (this.props.hasOwnProperty('item'))
        {
            propsId = (typeof this.props.item.id == 'undefined' ? '' : this.props.item.id)
            propsDesc = (typeof this.props.item.descrip == 'undefined' ? '' : this.props.item.descrip)
            propsHora = (typeof this.props.item.hora == 'undefined' ? '' : this.props.item.hora)
            propsMin = (typeof this.props.item.min == 'undefined' ? '' : this.props.item.min)
        }

        this.state = {
            id: propsId,
            descripActiv: propsDesc,
            durHora: propsHora,
            durMin: propsMin
        }

        this.removeActivity = this.removeActivity.bind(this);
    }

    removeActivity(id)
    {
        this.props.commonProps.delete(this.state.id)
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
