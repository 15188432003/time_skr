import Cookies from 'js-cookie'
   

//利用cookie加密存储token
export let setToken=(name,data)=>{
    Cookies.set(name,data)
}
export function getToken(){
    return Cookies.get('token')
}
export async function removeToken(){
    await Cookies.remove('token')
    return true
}