import {login} from '@/api/login.js'
import {getItem,setItem,removeItem} from '@/utils/localStorage'
import { getToken,setToken,removeToken } from '@/utils/cookies'
const getDefaultState = ()=>{
    return {
        userInfo:getItem('userInfo') || {},
        token:getToken() || '',
        topbarchange:false,
    }
}

const state = getDefaultState()

const mutations = {
    TOPBAR_CHANGE(state,data){
        state.topbarchange = data
    },
    REMEVE_TOKEN (state,data) {
        state.token = data
    } ,
    USERINFO(state,data){
        state.userInfo = data
    }
}

const actions ={
    login({commit},userInfo){
        return new Promise((resolve,reject)=>{
            login(userInfo).then(data=>{
                if(data.code == 200){
                    let userInfo = data.data.userInfo
                    let token = data.data.token
                    setToken('token',token)
                    setItem(userInfo,'userInfo')
                    commit('TOPBAR_CHANGE',true)
                    commit('REMEVE_TOKEN',getToken())
                    commit('USERINFO',getItem('userInfo'))
                    resolve(data.message)   
                }else{
                    reject(data.message)
                }
            })
        })
    },
    logOut({commit}){
        return new Promise((reslove,reject)=>{
            removeToken()
            removeItem('userInfo')
            commit('TOPBAR_CHANGE',false)
            commit('REMEVE_TOKEN','')
            commit('USERINFO',{})
            reslove()
        })
    }
}


export default {
    namespaced: true,
    state,
    actions,
    mutations
}