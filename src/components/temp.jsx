import React from 'react'
import Pusher from 'pusher-js'
import PolicyList from './policy_list'
import Ux3Services from '../services/Ux3Services'
import Ux3Func from '../services/Ux3Func'
import $ from 'jquery'
import {KEY_PUSHER} from '../constants/AppConstants.js'
import {Modal, Button, Carousel, CarouselItem} from 'react-bootstrap'
import aseguradoras from '../services/Aseguradoras'
import { default  as Router, Route, NotFoundRoute, RouteHandler} from 'react-router'

let QuoteTable = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },

    getInitialState(){
        return {
            policies: [],
            asc: true,
            showModal: true,
            controls: false,
            indicators: false
        }
    },

    funct(data) {
        this.state.policies = data
        this.setState({policies: data})
    },

    sortList(prop){
        let asc = !this.state.asc;
        let list_sort = this.state.policies.sort(function (a, b) {
            if (asc) return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            else return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
        });
        this.setState({
            policies: list_sort,
            asc: asc
        });
    },

    componentWillMount() {
        let code1 = this.context.router.getCurrentParams()
        let code = code1.uuid
        let local_polilicies = aseguradoras;

        Ux3Services.getAllPolicies(code)
            .then((data) => {
                data.map((obj) => {
                    //console.log(local_polilicies);
                    local_polilicies.push(obj)
                    local_polilicies = this.dropKeyByDefault(obj.insurance_company_code, local_polilicies)
                })
                //console.log(local_polilicies);
                this.setState({policies: local_polilicies})

            }).catch((error) => {
                console.log(error)
            })
    },

    dropKeyByDefault(key, data) {
        let keydrop = false;
        data.forEach(function (obj, i) {
            if (key == obj.insurance_company_code) {
                if (obj.default) {
                    keydrop = i;
                }
            }
        });
        if (keydrop !== false) {
            delete data[keydrop]
        }

        return data.filter(function (val) {
            return val
        });
    },

    componentDidMount() {
        $('.loading-bar').animate({
            width: '100%'
        }, 60000, () => {
            $('.loading-bar').addClass('completed');
        })

        setTimeout(function () {
            this.setState({showModal: false});
        }.bind(this), 10000)

        let opp_id = JSON.parse(localStorage.getItem('opp_id'))

        // Pusher Channel by Binding
        if(opp_id != null) {
            let pusher = new Pusher(KEY_PUSHER)
            let channel = pusher.subscribe('car-comparison-table-' + opp_id.opp_id)
            channel.bind('quoted_policy', function (data) {
                let local_polilicies = this.state.policies;
                local_polilicies.push(data);
                local_polilicies = this.dropKeyByDefault(data.insurance_company_code, local_polilicies)
                //local_polilicies
                this.funct(local_polilicies)
                //console.log(pol)
            }.bind(this))
        }
    },

    close() {
        this.setState({showModal: false})
    },

    render() {
        return (
            <div>
                <Modal bsClass="modal" dialogClassName="carouselCont" show={this.state.showModal} onHide={this.close}>
                    <Modal.Body>
                        <Carousel controls={this.state.controls} indicators={this.state.indicators}>
                            <CarouselItem>
                                <img
                                    src="http://segdig1.s3.amazonaws.com/static/core-app/img/applications/loadingux3-1/post1.png"/>
                                <ul className="listModal text-center">
                                    <li><img
                                        src="https://segdig1.s3.amazonaws.com/static/core-app/img/logos/insurance-companies/vector/color/allianz.svg"
                                        alt="Allianz"/>
                                    </li>
                                    <li><img
                                        src="https://segdig1.s3.amazonaws.com/static/core-app/img/logos/insurance-companies/vector/color/sura.svg"
                                        alt="Sura"/></li>
                                    <li><img
                                        src="https://segdig1.s3.amazonaws.com/static/core-app/img/logos/insurance-companies/vector/color/generali.svg"
                                        alt="Generali"/>
                                    </li>
                                    <li><img
                                        src="https://segdig1.s3.amazonaws.com/static/core-app/img/logos/insurance-companies/vector/color/equidad.svg"
                                        alt="Equidad Seguros"/></li>
                                    <li><img
                                        src="https://segdig1.s3.amazonaws.com/static/core-app/img/logos/insurance-companies/vector/color/previsora.svg"
                                        alt="Previsora"/></li>
                                    <li><img
                                        src="https://segdig1.s3.amazonaws.com/static/core-app/img/logos/insurance-companies/vector/color/seguros-del-estado.svg"
                                        alt="Seguros del Sstado"/></li>
                                    <li><img
                                        src="https://segdig1.s3.amazonaws.com/static/core-app/img/logos/insurance-companies/vector/color/mundial.svg"
                                        alt="Mundial Seguros"/></li>
                                    <li><img
                                        src="https://segdig1.s3.amazonaws.com/static/core-app/img/logos/insurance-companies/vector/color/aig.svg"
                                        alt="AIG Seguros"/>
                                    </li>
                                    <li><img
                                        src="https://segdig1.s3.amazonaws.com/static/core-app/img/logos/insurance-companies/vector/color/solidaria.svg"
                                        alt="Solidaria"/></li>
                                </ul>
                            </CarouselItem>
                            <CarouselItem>
                                <img
                                    src="http://segdig1.s3.amazonaws.com/static/core-app/img/applications/loadingux3-1/post2.png"/>
                            </CarouselItem>
                        </Carousel>
                    </Modal.Body>
                </Modal>

                <div className="quote-table-cars">
                    <div className="loading-bar"></div>
                    <PolicyList list={this.state.policies} sortList={this.sortList}/>

                    <div className="terms">
                        Aunque en la gran mayoría de casos nuestras cotizaciones cuentan con datos precisos, la
                        información
                        mostrada
                        en esta página esta sujeta a corroboración. La oferta final de cada compañía puede variar en
                        costo y
                        condiciones de cobertura debido a características específicas de cada persona. Se deja
                        constancia
                        que toda
                        la información brindada es de referencia y no genera ninguna obligación legal. Ver
                        <a href="https://comparamejor.com/co/terminos-y-condiciones/"> Términos de Uso</a> para mayor
                        información.
                    </div>
                </div>
            </div>
        )
    }
})

let routes = (
    <Route>
        <Route name="final_table" path=":uuid/" handler={QuoteTable}/>
    </Route>
)

Router.run(routes, Router.HistoryLocation, (Handler) => {
    React.render(<Handler/>, document.getElementById('app'))
})