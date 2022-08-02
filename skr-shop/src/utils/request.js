import axios from "axios";


const request = axios.create({
    baseURL:'http://localhost:3000',
    // baseURL:'http://localhost:3000/',
    timeout:5000
})

request.interceptors.request.use(config=>{
        return config
},error=>{
    return new Error('请求拦截')
})
request.interceptors.response.use(
    response=>{
        return response.data
    },
    error=>{
        console.log(111);
        return error
    }    
)

export default request