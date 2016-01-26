import React from 'react'
/*
 1) Llantas estalladas
 2) vidrios estallados
 3) Asistencia Juridica
 4) Revisión antes de viaje
 5) Asistencia al hogar
 6) Cartera Protegida
 7) Pequeños accesorios
 8) Servicio Exequial
* */
class SlideDown extends React.Component {
    render() {
        const img = 'https://segdig1.s3.amazonaws.com'
        return (
            <tr className="slide-down">
                <td colSpan="10">
                    <div className="row ta-left">
                        <div className="col-xs-12 col-md-6 col-lg-3">
                            { this.props.tires == false ?
                                <img src={`${img}/static/core-app/img/sections/cars/quote-table/without.svg`}
                                     width="20px" height="auto"/>
                                : <img src={`${img}/static/core-app/img/sections/cars/quote-table/check.svg`}
                                       width="20px" height="auto"/>}
                            &nbsp; Llantas estalladas
                        </div>
                        <div className="col-xs-12 col-md-6 col-lg-3">
                            { this.props.ajpc == false ?
                                <img src={`${img}/static/core-app/img/sections/cars/quote-table/without.svg`}
                                     width="20px" height="auto"/>
                                : <img src={`${img}/static/core-app/img/sections/cars/quote-table/check.svg`}
                                       width="20px" height="auto"/>}
                            &nbsp; Asistencia juridica civil
                        </div>
                        <div className="col-xs-12 col-md-6 col-lg-3">
                            { this.props.ajpp == false ?
                                <img src={`${img}/static/core-app/img/sections/cars/quote-table/without.svg`}
                                     width="20px" height="auto"/>
                                : <img src={`${img}/static/core-app/img/sections/cars/quote-table/check.svg`}
                                       width="20px" height="auto"/>}
                            &nbsp; Asistencia juridica penal
                        </div>
                        <div className="col-xs-12 col-md-6 col-lg-3">
                            { this.props.assistance_on_travel == false ?
                                <img src={`${img}/static/core-app/img/sections/cars/quote-table/without.svg`}
                                     width="20px" height="auto"/>
                                : <img src={`${img}/static/core-app/img/sections/cars/quote-table/check.svg`}
                                       width="20px" height="auto"/>}
                            &nbsp;Revisión antes de viaje
                        </div>
                    </div>
                    <div className="row ta-left">
                        <div className="col-xs-12 col-md-6 col-lg-3">
                            { this.props.home_assistance == false ?
                                <img src={`${img}/static/core-app/img/sections/cars/quote-table/without.svg`}
                                     width="20px" height="auto"/>
                                : <img src={`${img}/static/core-app/img/sections/cars/quote-table/check.svg`}
                                       width="20px" height="auto"/>}
                            &nbsp; Asistencia al hogar
                        </div>
                        <div className="col-xs-12 col-md-6 col-lg-3">
                            { this.props.funeral_assistance == false ?
                                <img src={`${img}/static/core-app/img/sections/cars/quote-table/without.svg`}
                                     width="20px" height="auto"/>
                                : <img src={`${img}/static/core-app/img/sections/cars/quote-table/check.svg`}
                                       width="20px" height="auto"/>}
                            &nbsp; Servicio exequial
                        </div>
                    </div>
                </td>
            </tr>
        )
    }
}

export default SlideDown