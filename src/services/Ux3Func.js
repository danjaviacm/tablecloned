const DATA_OPPORTUNITY = 'data-express'
const dataHistory = {}

class Ux3Func {
    loadData() {
        let data
        if (localStorage.getItem(DATA_OPPORTUNITY) !== null && localStorage.getItem(DATA_OPPORTUNITY) !== 'null'){
            data = JSON.parse(localStorage.getItem(DATA_OPPORTUNITY));
        }
        return data
    }

    saveValue(key, data) {
        dataHistory[key] = data;
        localStorage.setItem(DATA_OPPORTUNITY, JSON.stringify(dataHistory))
    }

    getValue(key) {
        let data = this.loadData()
        if(data == undefined){
            return false;
        } else {
            return data[key];
        }


    }
}

export default new Ux3Func()