export default function getFormDate(time,type) {
    let date = new Date(Number(time))
    let year = date.getFullYear()
    let month = date.getMonth()+1
    let day = date.getDate()
    let hour = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()

    //补0处理
    month = month >= 10 ? month : ('0' + month);
    day = day >= 10 ? day : ('0' + day);
    hour = hour >= 10 ? hour : ('0' + hour);
    minutes = minutes >= 10 ? minutes : ('0' + minutes);
    seconds = seconds >= 10 ? seconds : ('0' + seconds);

    if(type){
        return `${year+type+month+type+day} ${hour}:${minutes}:${seconds}`
    }else{
        return `${year}:${month}:${day} ${hour}:${minutes}:${seconds}`
    }   
}