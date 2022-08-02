
export let setItem=(name,data)=>{
    sessionStorage.setItem(name,JSON.stringify(data))
}
export let getItem=(name)=>{
    let data = JSON.parse(sessionStorage.getItem(name))
    return data
}
export let removeItem=(name)=>{
    sessionStorage.removeItem(name)
}
