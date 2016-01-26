import React from 'react'
import $ from 'jquery'
import {OverlayTrigger, Tooltip} from 'react-bootstrap'
import PolicyRow from '../policy_row'
import SlideDown from '../slide_down'
import Ux3Func from '../../services/Ux3Func'
import {IMG} from '../../constants/AppConstants'

const tooltip = {
    pre: <Tooltip>Es el valor total que se debes pagar a la aseguradora para obtener las coberturas que ésta ofrece en cada póliza. Incluye IVA</Tooltip>,
    rce: <Tooltip>Es el valor hasta por el cual la aseguradora responde cuando le haces algún daño a personas o bienes externos a tu vehículo</Tooltip>,
    pc: <Tooltip>Se da cuando después de un siniestro (robo o accidente) el costo de la reparación de los daños de tu vehículo es menor al 75% del valor comercial del mismo.</Tooltip>,
    pt: <Tooltip>Es cuando, luego de un accidente, la reparación completa del automóvil asegurado supera el 75% del valor asegurado.</Tooltip>,
    av: <Tooltip>Recibes acompañamiento de parte de tu aseguradora en caso de necesitar una grúa, carro taller, hospedaje, ambulancia, cerrajería, gasolina, entre otros mientras estás en carretera.</Tooltip>,
    rtm: <Tooltip>Tienes derecho a realizar la revisión técnico mecánica gratis o con un descuento mientras tu póliza esté vigente.</Tooltip>,
    vr: <Tooltip>Es el préstamo de otro vehículo en caso que el tuyo no esté apto para su uso debido a un accidente u robo. Cada aseguradora define las condiciones para su préstamo.</Tooltip>,
    ce: <Tooltip>Tienes derecho a un conductor para que te lleve a tu hogar cuando no estés en condiciones aptas para manejar.</Tooltip>,
    ap: <Tooltip>Póliza adicional de accidentes personales que cubre al asegurado en caso de ir manejando y tener un siniestro.</Tooltip>,
    dt: <Tooltip>Revisa todas las coberturas que tiene la  póliza que elijas, además de sus términos y condiciones.</Tooltip>,
}

let PolicyList = React.createClass({
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
        let $header = $("#table-ux > thead").clone()
        let $tr = $header.find('tr')[0]
        let tr = $('#table-ux tr')[0]
        let td = tr.cells

        setTimeout(function () {
            for (let i = 0; i <= td.length; i++) {
                if (td[i]) {
                    $tr.cells[i].width = td[i].clientWidth
                }
            }
            $('#header-fixed').append($header)
        }, 3000)
    },
    getInitialState(){
        return {
            sortKeyParam: 'insurance_company_code',
            sortAscParam: true
        }
    },


    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    },

    handleScroll(event) {
        let scrollTop = event.srcElement.body.scrollTop
        let initialScroll = $('.rastreator').height()

        if (scrollTop >= initialScroll) {
            $('#header-fixed').show()
        } else {
            $('#header-fixed').hide()
        }
    },


    render() {
        let list = this.props.list;

        let tr = []

        {
            list.map((policy) => {
                if (policy.error == false) {
                    tr.push(
                        <PolicyRow key={ policy.policy_id }
                                   url={ policy.url }
                                   name={ policy.name}
                                   logo={ policy.logo }
                                   terms_pdf={ policy.terms_pdf }
                                   insurance_company_code={ policy.insurance_company_code }
                                   rce_display={ policy.rce_display }
                                   dppd_display={ policy.dpph_display }
                                   dptd_display={ policy.dpth_display }
                                   assistance_on_travel={ policy.assistance_on_travel }
                                   vehicle_replacement={ policy.vehicle_replacement }
                                   sober_driver={ policy.sober_driver }
                                   driver_personal_accidents={ policy.driver_personal_accidents }
                                   monthly_price={ policy.monthly_price }
                                   max_differ_months={ policy.max_differ_months }
                                   price_total_without_formatting={ policy.price_total_without_formatting }>
                        </PolicyRow >
                    )
                    tr.push(
                        <SlideDown key={ `${policy.policy_id}${policy.opportunity_id}` }
                                   tires={ policy.tires }
                                   ajpc={ policy.ajpc }
                                   ajpp={ policy.ajpp }
                                   assistance_on_travel={ policy.assistance_on_travel }
                                   home_assistance={ policy.home_assistance }
                                   funeral_assistance={ policy.funeral_assistance }
                            />
                    )
                } 
            })
        }

        return (
            <div>
                <table id="table-ux" className="quote-table" width="100%">
                    <thead>
                    <tr>
                        <th className="orderBy" onClick={this.props.sortList.bind(this, 'insurance_company_code')}>
                            <span>Aseguradora</span>
                            <i className="fa fa-caret-down" style={{marginLeft: 5}}></i>
                        </th>
                        <th onClick={this.props.sortList.bind(this, 'price_total_without_formatting')}>
                            <span>Precio &nbsp;
                                <OverlayTrigger placement='bottom' overlay={tooltip.pre}>
                                    <i className="fa fa-info-circle"></i>
                                </OverlayTrigger>
                                <i className="fa fa-caret-down" style={{marginLeft: 5}}></i>
                            </span>
                        </th>
                        <th className="hidden-xs tooltip-th">
                            Responsabilidad Civil Extracontractual &nbsp;
                            <OverlayTrigger placement='bottom' overlay={tooltip.rce}>
                                <i className="fa fa-info-circle"></i>
                            </OverlayTrigger>
                        </th>
                        <th className="hidden-xs hidden-sm hidden-md">
                            <table width="100%">
                                <tr>
                                    <td style={{borderBottom: '1px solid #67737B'}} colSpan="2">Deducible</td>
                                </tr>
                                <tr>
                                    <td style={{borderRight: '1px solid #67737B'}} className="tooltip-th">
                                        Pérdida <br/>Parcial &nbsp;
                                        <OverlayTrigger placement='bottom' overlay={tooltip.pc}>
                                            <i className="fa fa-info-circle"></i>
                                        </OverlayTrigger>
                                    </td>
                                    <td className="tooltip-th">
                                        Pérdida <br/>Total &nbsp;
                                        <OverlayTrigger placement='bottom' overlay={tooltip.pt}>
                                            <i className="fa fa-info-circle"></i>
                                        </OverlayTrigger>
                                    </td>
                                </tr>
                            </table>
                        </th>
                        <th className="hidden-xs hidden-sm">Asistencia en Viaje <OverlayTrigger placement='bottom'
                                                                                                overlay={tooltip.av}>
                            <i className="fa fa-info-circle"></i>
                        </OverlayTrigger>
                        </th>
                        <th className="hidden-xs hidden-sm">Vehículo <br/>Reemplazo <br/><OverlayTrigger
                            placement='bottom' overlay={tooltip.vr}>
                            <i className="fa fa-info-circle"></i>
                        </OverlayTrigger></th>
                        <th className="hidden-xs hidden-sm">Conductor <br/>Elegido <br/><OverlayTrigger
                            placement='bottom' overlay={tooltip.ce}>
                            <i className="fa fa-info-circle"></i>
                        </OverlayTrigger>
                        </th>
                        <th className="hidden-xs hidden-sm">Accidentes <br/>Personales <OverlayTrigger
                            placement='bottom' overlay={tooltip.ap}>
                            <i className="fa fa-info-circle"></i>
                        </OverlayTrigger></th>
                        <th><span>Personalizar <OverlayTrigger placement='bottom' overlay={tooltip.dt}>
                            <i className="fa fa-info-circle"></i>
                        </OverlayTrigger></span></th>
                    </tr>
                    </thead>
                    <tbody className="policies-row">
                    {(() => {
                        if (list.length == 0) {
                            return (
                                <tr>
                                    <td colSpan="11" className="searching">
                                        <i className="fa fa-spinner fa-spin"></i> Buscando pólizas para tu vehículo...
                                    </td>
                                </tr>
                            )
                        }
                    })()}

                    {
                        tr.map((obj) => {
                            return (
                                obj
                            )
                        })
                    }

                    {
                        list.map((pol) => {
                            if (pol.default == true) {
                                return (
                                    <tr key={ pol.policy_id }>
                                        <td className="logo-insurance">
                                            <img src={`${IMG}${pol.logo}`} className="gray-img"
                                                 width="90px"
                                                 height="auto"/>
                                        <span className="plan-name"
                                              style={{maxWidth: '100px', textWrap: 'avoid', display: 'block', margin: '0 auto'}}>
                                            { pol.name }
                                        </span>
                                        </td>
                                        <td className="error-message" colSpan="10">
                                            <span>{ pol.error_message || 'Buscando cotizaciones' }</span>
                                        </td>
                                    </tr>
                                )
                            }
                        })
                    }
                    </tbody>
                </table>
                <table id="header-fixed" className="quote-table"></table>
            </div>
        )
    }
})

export default PolicyList