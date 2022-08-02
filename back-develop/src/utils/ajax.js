
import axios from 'axios'


const instance = axios.create({

    // baseURL:process.env.VUE_APP_BASE_API_SKR,
    // baseURL:'http://localhost:3000',
    baseURL:'http://192.168.205.36:3000',

    timeout:5000
})

instance.interceptors.request.use((config)=>{
    return config
})

instance.interceptors.response.use((config)=>{
    return config.data
})


export default instance