import React from 'react'
import CallmeNow from '../../modals/callme_now'

let VehicleInfo = React.createClass({
    getInitialState() {
        return {
            modal: false
        }
    },

    showModal() {
        this.setState({modal: true})
    },

    render() {
        return (
            <section className="vehicle-info">
                <ul className="pull-left">
                    <li className="reference">
                        <span className="key">Referencia:</span>
                        <span className="value"># {this.props.opp_id} </span>
                    </li>

                    {(() => {
                        if (this.props.vehicle_registration != 'SINPLA' && this.props.vehicle_registration != null) {
                            return (
                                <li className="plate">
                                    <span className="key">Placa:</span>
                                    <span className="value upper"> {this.props.vehicle_registration} </span>
                                </li>
                            )
                        }
                    })()}

                    {(() => {
                        if (this.props.data == 'true') {
                            return (
                                <li className="vehicle-name">
                                    <span className="key">Vehículo:</span>
                                    <span className="value"> car.vehicle_brand|title   car.vehicle_line|title   car.vehicle_reference|title   car.vehicle_model </span>
                                </li>
                            )
                        }
                    })()}

                    {(() => {
                        if (this.props.data == 'true') {
                            return (
                                <li className="vehicle-value">
                                    <span className="key">Valor asegurado:</span>
                                    <span className="value enfasis">$ quote.insured_value|intcomma </span>
                                </li>
                            )
                        }
                    })()}

                </ul>

                {(() => {
                    if (this.props.callme == 'false') {
                        return (
                            <a ng-show="agent_availability" style={{margin: '0 5px'}}
                               onClick={this.showModal} className="btn btn-continue pull-right hidden-xs"><i
                                className="fa fa-phone"></i> Llámame</a>
                        )
                    }
                })()}

                <div style={{clear: 'both'}}></div>

                {(() => {
                    if (this.state.modal == true) {
                        return (
                            <CallmeNow />
                        )
                    }
                })()}
            </section>
        )
    }
})

export default VehicleInfo