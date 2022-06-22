let gogo =document.querySelector("#do")
let name2 = document.querySelector("#name")
let time = document.querySelector("#time")
let text = document.querySelector(".text")

let a = () => {
    text.innerHTML ="<div>하고싶은일 :"+ gogo.value +"</div>"+"<div>시간 :"+ time.value+"</div>"+"<div>이름 :"+ name2.value+"</div>"
    console.log(text.innerHTML[5])
}
let b = () => {
    if(text.innerHTML[5]=="하"){
        text.innerHTML = "<div>이름 :"+ name2.value+"</div>"+"<div>시간 :"+ time.value+"</div>" +"<div>하고싶은일 :"+ gogo.value +"</div>"
    }
    else if(text.innerHTML[5]=="이"){
        text.innerHTML ="<div>하고싶은일 :"+ gogo.value +"</div>"+"<div>시간 :"+ time.value+"</div>"+"<div>이름 :"+ name2.value+"</div>"
    }
}
document.querySelector(".name1").addEventListener('click',a)
document.querySelector(".doit").addEventListener('click',b)
