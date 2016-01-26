import React from 'react'
import Router from 'react-router'
import $ from 'jquery'
import Ux3Func from '../../services/Ux3Func'
import Ux3Services from '../../services/Ux3Services'
import {IMG} from '../../constants/AppConstants'
import numeral from 'numeral'

let PolicyRow = React.createClass({
    mixins: [Router.Navigation],

    contextTypes: {
        router: React.PropTypes.func
    },

    getInitialState() {
        return {
            monthly_price: '',
            uuid: ''
        }
    },

    componentWillMount() {
        let code1 = window.location.href
        let code = code1.match(/[\w]{8}-[\w]{4}-[\w]{4}-[\w]{4}-[\w]{12}/)
        this.setState({
            uuid: code[0]
        })
    },

    continue(isc){
        Ux3Func.saveValue('selected_insurance_company_lite', isc)
        this.transitionTo('vehicle_zero_km')
    },

    slideDown(e) {
        $(e.target).parents('tr').next().toggle('easeInOut')
    },

    changePrice(uuid, code, total) {

        let option = document.querySelector('.differ_months').value
        Ux3Services.getMonthsprice(option, uuid, code, total)
            .then((data) => {
                this.setState({monthly_price: data})
            })
            .catch((error) => {
                console.log(error)
            })
    },

    render() {
        let result = []
        for (let i = 4; i <= this.props.max_differ_months; i++) {
            result.push(i)
        }
        const IMG_TABLE = 'https://segdig1.s3.amazonaws.com'

        let formatPriceTotal = numeral(this.props.price_total_without_formatting).format('$0,0');
        let formatMonth = numeral(this.state.monthly_price).format('$0,0');
        return (
            <tr className="policy-row">
                <td className="logo-insurance">

                    <img src={`${IMG}${this.props.logo}`} width="90px"
                         height="auto"/>
                        <span className="plan-name"
                              style={{maxWidth: '100px', textWrap: 'avoid', display: 'block', margin: '0 auto'}}>
                            { this.props.name }
                        </span>
                </td>
                <td className="price">
                    <div className="total-price">
                        { formatPriceTotal }
                    </div>
                    {(() => {
                        if (this.props.monthly_price) {
                            return (
                                <div>
                                    <div className="separator ta-center">
                                        <span>ó desde</span>
                                    </div>
                                    {(() => {
                                        if (this.state.monthly_price == '') {
                                            return (
                                                <div className="monthly-price"
                                                     dangerouslySetInnerHTML={{__html:  `${this.props.monthly_price}` }}></div>
                                            )
                                        } else {
                                            return (
                                                <div className="monthly-price"><h4><span
                                                    className="monthly-price">{formatMonth}</span> / mes</h4></div>
                                            )
                                        }
                                    })()}
                                    <div>
                                        <div className="block">
                                            <select className="differ_months form-control"
                                                    onChange={this.changePrice.bind(this, `${this.state.uuid}`, `${this.props.insurance_company_code}`, `${this.props.price_total_without_formatting}`)}>
                                                {
                                                    result.reverse().map((obj) => {
                                                        return (
                                                            <option value={obj}>{obj} Meses</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })()}

                </td>
                <td className="rce hidden-xs ">
                    <div className="details">
                        <span className="gray-light">
                            <span className="strong-blue">{ this.props.rce_display.txt } &nbsp;</span>
                            <strong>{ `$` + this.props.rce_display.rce_valor } &nbsp;</strong> { this.props.rce_display.rce_txt }
                        </span>

                        {(() => {
                            if (this.props.rce_display.txt == 'Hasta') {
                                return (
                                    <div>
                                            <span className="gray-light"><span
                                                className="strong-blue">Daños a bienes: &nbsp;</span>
                                                <strong>{ `$` + this.props.rce_display.dbt_valor } &nbsp;</strong> { this.props.rce_display.dbt_txt }
                                            </span>
                                            <span className="gray-light"><span
                                                className="strong-blue">Una Muerte/Lesión: &nbsp;</span>
                                                <strong>{ `$` + this.props.rce_display.mlp_valor } &nbsp;</strong> { this.props.rce_display.mlp_txt }
                                            </span>
                                            <span className="gray-light"><span
                                                className="strong-blue">Más Muertes/Lesiones: &nbsp;</span>
                                                <strong>{ `$` + this.props.rce_display.ml2p_valor } &nbsp;</strong> { this.props.rce_display.ml2p_txt }
                                            </span>
                                    </div>
                                )
                            }
                        })()}
                    </div>
                </td>
                <td className="deducibles hidden-xs hidden-sm  hidden-md">
                    <table width="100%">
                        <tr>

                            <td width="50%">
                                <h4 className="strong-green open-sans demi-bold"> { this.props.dppd_display.d_valor }</h4>
                                <span className="top"> { this.props.dppd_display.d_txt }</span>
                                <span className="gray-light"><small> { this.props.dppd_display.d_min_txt}</small></span>
                            </td>
                            <td width="50%">
                                <h4 className="strong-green open-sans demi-bold"> { this.props.dptd_display.d_valor }</h4>
                                <span className="top"> { this.props.dptd_display.d_txt }</span>
                                <span className="gray-light"><small> { this.props.dptd_display.d_min_txt }</small></span>
                            </td>
                        </tr>
                    </table>
                </td>
                <td className="check-without hidden-xs hidden-sm">
                    { this.props.assistance_on_travel == false ?
                        <img src={`${IMG_TABLE}/static/core-app/img/sections/cars/quote-table/without.svg`}/>
                        : <img src={`${IMG_TABLE}/static/core-app/img/sections/cars/quote-table/check.svg`}/>}
                </td>
                <td className="check-without hidden-xs hidden-sm">
                    { this.props.vehicle_replacement == false ?
                        <img src={`${IMG_TABLE}/static/core-app/img/sections/cars/quote-table/without.svg`}/>
                        : <img src={`${IMG_TABLE}/static/core-app/img/sections/cars/quote-table/check.svg`}/> }
                </td>
                <td className="check-without hidden-xs hidden-sm">
                    { this.props.sober_driver == false ?
                        <img src={`${IMG_TABLE}/static/core-app/img/sections/cars/quote-table/without.svg`}/>
                        : <img src={`${IMG_TABLE}/static/core-app/img/sections/cars/quote-table/check.svg`}/> }
                </td>
                <td className="check-without hidden-xs hidden-sm">
                    { this.props.driver_personal_accidents == false ?
                        <img src={`${IMG_TABLE}/static/core-app/img/sections/cars/quote-table/without.svg`}/>
                        : <img src={`${IMG_TABLE}/static/core-app/img/sections/cars/quote-table/check.svg`}/> }
                </td>

                <td className="customize">
                    <a href={this.props.url}
                       className="btn btn-continue">Más Info
                        <i className="fa fa-chevron-right"></i></a>
                    <br/><br/>
                    <a href={this.props.terms_pdf} target="_blank">Clausulado</a><br/>
                        <span className="infoClick" onClick={this.slideDown}>
                            <i className="fa fa-info-circle"></i>
                        </span>
                </td>
            </tr>
        )
    }
})

export default PolicyRow