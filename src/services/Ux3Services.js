import request from 'reqwest'
import {BASE_URL} from '../constants/AppConstants'

const url = BASE_URL

class Ux3Services {
    getAllPolicies(uuid) {
        return request({
            url: `${url}api/v1/opportunity-policies/?uuid=${uuid}`,
            type: 'json'
        })
    }

    getMonthsprice(option, uuid, code, total) {
        return request({
            url: `${url}usuarios/financiamiento/actualizar-pago-mensual/${uuid}/?differ_months=${option}&insurance_company_code=${code}&price_total=${total}`,
            type: 'json'
        })
    }

    getAgentAvailability() {
        return request({
            url: `${url}clientes/actividades/availability/`,
            type: 'json'
        })
    }

    sendCallmeNow(data) {
        return request({
            url: `${url}api/clientes/actividades/call_me_back/`,
            method: 'post',
            type: 'json',
            data: data
        })
    }
}

export default new Ux3Services()