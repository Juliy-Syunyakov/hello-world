import axios from "axios";
export default {
    actions:{
        async getDeviceSensorData(context, data){
            return await axios.post('http://localhost:3000/device/getDeviceData', data)
            .then(res=>{               
                console.log(res)           
                return res.data
            })
            .catch(err=>{
                console.log(err)
                throw err
            })
        },
        async createDevice(context, data){ 
            return await axios.post('http://localhost:3000/device/create', data)
            .then(res=>{               
                console.log(res)           
                return res.data
            })
            .catch(err=>{
                console.log(err)
                throw err
            })
        },
        async getAllDevices(context, data){ 
            return await axios.post('http://localhost:3000/device/getAll', data)
            .then(res=>{               
                console.log(res)    
              context.commit('setDevices', res.data)       
                return res.data
            })
            .catch(err=>{
                console.log(err)
                throw err
            })
        }
    },
    state:{
        Devices:[],
        chart:null
    },
    mutations:{
        setDevices(state, data){
            state.Devices = data
        },
        setChart(state, data){
            state.chart = data
        }

    },
    getters:{
        getDevices(state){
            return state.Devices
        },
        getChart(state){
            return state.chart
        },
        getChartData(state){
            return `${state.chart.deviceName} ${state.chart.type}`
        }
    }
}