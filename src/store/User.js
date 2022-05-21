import axios from "axios";
export default {
    actions:{
        async login(context, data){ 
            return await axios.post('http://localhost:3000/auth/login', data)
            .then(res=>{               
                console.log(res)
                context.commit('setUser', res.data.user)
                context.commit('setToken', res.data.token)               
                return res.data
            })
            .catch(err=>{
                console.log(err)
                throw err
            })
        },
        async auth(context, data){ 
            return await axios.post('http://localhost:3000/auth/auth', data)
            .then(res=>{               
                console.log(res)
                context.commit('setUser', res.data.user)
                context.commit('setToken', data.token)               
                return res.data
            })
            .catch(err=>{
                console.log(err)
                throw err
            })
        }
    },
    state:{
        User:null,
        token:null
    },
    mutations:{
        setUser(state, data){
            state.User = data
        },
        setToken(state, data){
            state.token = data
        },
        log_Out(state){
            state.User = null
            state.token = null
        }
    },
    getters:{
        getToken(state){
            return state.token
        },
        getUser(state){
            return state.User
        }

    }
}