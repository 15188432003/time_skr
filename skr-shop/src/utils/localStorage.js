
 export let setItem=(data,name)=>{
    localStorage.setItem(name,JSON.stringify(data))
}
export let getItem=(name)=>{
    let data = JSON.parse(localStorage.getItem(name))
    return data
}
export let removeItem=(name)=>{
    localStorage.removeItem(name)
}
