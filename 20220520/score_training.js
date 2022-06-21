/*
let english = prompt("영어")
let math = prompt("수학")
let science = prompt("과학")
let korea = prompt("한국어")


let typecasting_english = Number(english)
let typecasting_math = Number(math)
let typecasting_science = Number(science)
let typecasting_korea = Number(korea)

console.log("점수 합:",typecasting_english+typecasting_korea+typecasting_math+typecasting_science)
console.log("점수 평균값: ",(typecasting_english+typecasting_korea+typecasting_math+typecasting_science)/4)
*/


let english = Number(prompt("영어"))
let math = Number(prompt("수학"))
let science = Number(prompt("과학"))
let korea = Number(prompt("한국어"))

let sum = score_sum(english, math, science, korea)
let average = score_average(english, math, science, korea)

function score_sum(a,b,c,d){
    return a+b+c+d
}
function score_average(a,b,c,d){
    return (a+b+c+d)/4
}

console.log("점수합: ", sum)
console.log("평균: ", average)


