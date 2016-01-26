import React from 'react'
import $ from 'jquery'
import {Modal, Button} from 'react-bootstrap'
import Ux3Services from '../../services/Ux3Services'

let Navbar = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },

    getInitialState() {
        return {
            showModal: false,
            modalCallme: false,
            now: false,
            modalMobil: false,
            format: "YYYY-MM-DD",
            inputFormat: "DD/MM/YYYY",
            mode: "date",
            agent: '',
            cont: false
        }
    },

    close() {
        this.setState({showModal: false})
    },

    showModal() {
        this.setState({showModal: true})
    },

    openCall() {
        this.setState({modalCallme: true})
    },

    closeCall() {
        this.setState({modalCallme: false})
    },

    showFormNow() {
        this.setState({now: true})
        this.setState({later: false})
    },

    showFormLater() {
        this.setState({later: true})
        this.setState({now: false})
    },

    sendNow() {
        Object.size = function (obj) {
            var size = 0, key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) size++;
            }
            return size;
        };

        let code1 = Object.size(this.context.router.getCurrentParams())

        if (code1 != 0) {
            let data = {
                phone_number: $('#phone_number').val(),
                activity_type: 'now',
                opportunity_uuid: code1.uuid
            }

            if (data.phone_number.length < 10) {
                $('#phone_number').next().css('display', 'block');
                return;
            }

            Ux3Services.sendCallmeNow(data)
                .then((data) => {
                    //console.log(data)
                    this.setState({
                        agent: data.agent,
                        cont: true
                    })
                }).catch((error) => {
                    console.log(error)
                })
        } else {
            let data = {
                phone_number: $('#phone_number').val(),
                activity_type: 'now',
                opportunity_uuid: '00000000-0000-0000-0000-000000000000'
            }

            if (data.phone_number.length < 10) {
                $('#phone_number').next().css('display', 'block');
                return false;
            }

            Ux3Services.sendCallmeNow(data)
                .then((data) => {
                    //console.log(data)
                    this.setState({
                        agent: data.agent,
                        cont: true
                    })
                }).catch((error) => {
                    console.log(error)
                })
        }

    },

    showWebChat() {
        $zopim.livechat.say('Necesito ayuda')
        /*$zopim.livechat.window.toggle();*/
    },

    showModalMobil() {
        this.setState({modalMobil: true})
    },

    closeMobil() {
        this.setState({modalMobil: false})
    },

    render() {
        return (
            <div>
                <Modal bsClass="modal" bsSize="large" show={this.state.showModal} onHide={this.close}>
                    <Modal.Body>
                        <a className="close-ud" onClick={this.close}>×</a>

                        <h1 className="text-left blue bebas">Preguntas frecuentes</h1>
                        <span className="blue">¿Qué diferencia a ComparaMejor.com de una agencia o corredora de seguros tradicional?</span><br/>
                        <span className="text-justify"><b>R:</b> Nuestra principal diferencia es la ACCESIBILIDAD, ya que dispones de nuestro servicio las 24
                        horas del día y los 365 días del año. Te permitimos comparar en tiempo real las ofertas que hay
                        en el mercado para un perfil como el tuyo, y te ayudamos a adquirir en línea tu póliza pensando
                        siempre en tu comodidad y economía.</span>
                        <br/><br/>

                        <span className="blue">¿Qué métodos de pago ofrece ComparaMejor.com?</span><br/>
                        <b>Contado:</b> Pago de tu póliza en una sola cuota <br/>
                        <b>Fraccionado:</b> Divide el valor de tu póliza en 3 o 4 cuotas sin intereses <br/>
                        <b>Financiado:</b> Paga tu póliza con nuestro aliado Credivalores con las mejores tasas de
                        interés
                        <br/><br/>

                        Además, al momento de realizar tus pagos, lo puedes hacer con:
                        <br/>
                        • Tarjeta de crédito <br/>
                        • PSE/Tarjeta débito <br/>
                        • Transferencia bancaria <br/>
                        • Consignación bancaria <br/>

                        <br/>
                        <span className="blue">¿Qué hacen con mis datos?</span><br/>
                        <span className="text-justify"><b>R:</b> Tus datos son mantenidos de manera confidencial y segura . Solo enviaremos la información al
                        proveedor del producto que estás solicitando. Por ejemplo: al corredor de seguros que le
                        corresponde recibir tu solicitud.</span>

                        <br/><br/>

                        <span className="blue">¿Por qué confiar en ComparaMejor.com?</span> <br/>

                        <span className="justify">
                        ComparaMejor.com es un portal online especializado en ofrecer soluciones rápidas y dinámicas a
                        los usuarios que desean decidir, de forma autónoma y responsable, sobre la adquisición de
                        productos ofrecidos en el mercado financiero. Utilizamos tecnología de punta para cumplir con
                        estándares de calidad, optimizar el proceso de solicitud y ventas online, y continuar generando
                        alternativas innovadoras a las necesidades actuales del sector.</span>
                    </Modal.Body>
                </Modal>

                <header className="comparamejor-main-header rastreator text-center">
                    <a href="http://comparamejor.com">
                        <img className="logo pull-left" height="55px" width="auto"
                             src="https://segdig1.s3.amazonaws.com/static/bower_components/frontendquillo/images/main/ComparaMejor.svg"
                             alt="ComparaMejor.com" align="left"/>
                    </a>

                    <div className="list-faqs hidden-xs">
                        <span className="icon" onClick={this.showModal}><i className="fa fa-question-circle"></i> Preguntas</span>
                        <span className="icon" onClick={this.showWebChat}><i
                            className="fa fa-wechat"></i> Web chat</span>
                        <span className="icon" onClick={this.openCall}><i
                            className="fa fa-phone"></i> Te llamamos gratis</span>
                    </div>

                    <button onClick={this.showModalMobil}
                       className="btn btn-callme visible-xs"><i
                        className="fa fa-phone"></i> Llámame ya!</button>

                    <div className="hidden-xs contact">
                        <span className="first"><a href="tel:7561234"><i
                            className="fa fa-phone"></i></a> (1) 756 1234</span>
                    </div>
                    <div style={{clear: 'both'}}></div>
                </header>

                <Modal bsClass="modal" bsSize="xs" show={this.state.modalMobil} onHide={this.closeMobil}>
                    <Modal.Body>
                        <a className="close-ud" onClick={this.closeMobil}>×</a>

                        <div className="form-inline form">
                            <div className="form-group">
                                <label forHtml="phone_number">Tu número celular:</label>
                                <input type="text" id="phone_number" name="phone_number" maxLength="10"
                                       placeholder="Tu número celular"/>
                                <div className="block-error">Ingresa un número de celular. Debe tener 10 dígitos.</div>
                                {(() => {
                                    if (this.state.cont == true) {
                                        return (
                                            <span>En unos momentos te llamara {this.state.agent}</span>
                                        )
                                    }
                                })()}
                            </div>
                            <a onClick={this.sendNow} className="btn btn-continue">Confirmar tu número</a>
                        </div>
                    </Modal.Body>
                </Modal>

                <Modal bsClass="modal" show={this.state.modalCallme} onHide={this.closeCall}>
                    <Modal.Body>
                        <a className="close-ud" onClick={this.closeCall}>×</a>

                        <div className="buttons">
                            <a onClick={this.showFormNow} className="call-me-now">¡Llámame ahora!</a>
                            <a onClick={this.showFormLater} className="call-me-later">¡Llámame más
                                tarde!</a>
                        </div>

                        {(() => {
                            if (this.state.now == true) {
                                return (
                                    <div className="form" id="form-now">
                                        <div className="form-group">
                                            <label htmlFor="phone_number">Tu número celular: </label>
                                            <input type="text" id="phone_number" name="phone_number" maxLength="10"
                                                   placeholder="Tu número celular" className="r-numeric"/>

                                            <div className="block-error">Ingresa un número de celular. Debe tener 10
                                                dígitos.
                                            </div>

                                            {(() => {
                                                if (this.state.cont == true) {
                                                    return (
                                                        <div><br/>En unos momentos te llamara {this.state.agent}</div>
                                                    )
                                                }
                                            })()}
                                        </div>
                                        <a onClick={this.sendNow} className="btn btn-continue">Confirmar tu número</a>
                                    </div>
                                )
                            }
                        })()}

                        {(() => {
                            if (this.state.later == true) {
                                return (
                                    <div className="form form-inline" id="form-later">
                                        <div className="form-group">
                                            <label htmlFor="phone_number">Tu número celular: </label>
                                            <input type="text" id="phone_number" name="phone_number" maxLength="10"
                                                   placeholder="Tu número celular" className="r-numeric"/>

                                            <div className="block-error">Ingresa un número de celular. Debe tener 10
                                                dígitos.
                                            </div>
                                        </div>
                                        <div className="form-group mg">
                                            <label for="date">Día:</label>
                                            <input type="text" name="date" id="date"/>
                                        </div>
                                        <div className="form-group mg">
                                            <label for="hour">Hora:</label>
                                            <span className="select-wrapper">
                                                <input id="hour" type="text" className="time ui-timepicker-input"
                                                       autocomplete="off"/>
                                            </span>
                                        </div>
                                        <br/><br/>
                                        <a onClick={this.sendLater} className="btn btn-continue">Agendar</a>
                                    </div>
                                )
                            }
                        })()}
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
})

export default Navbar