let gogo =document.querySelector("#do")
let name2 = document.querySelector("#name")
let time = document.querySelector("#time")
let text = document.querySelector(".text")
let a = () => {
    c = "<div>하고싶은일 : "+gogo.value +"</div>"
    d =`<div>이름 : ${name2.value} </div>`
    e =`<div>시간 : ${time.value}</div>`
    text.innerHTML = c+e+d
}
let b = () => {
    let f = c
    c = c.replace(c,d)
    d = d.replace(d,f)
    text.innerHTML = c+e+d
}
document.querySelector(".name1").addEventListener('click',a)
document.querySelector(".doit").addEventListener('click',b)
