/*
입력을 4개 받는다. (점수 입력받는다.)
평균값을 구하고, 그 평균값이
70~79 C학점
80~89 B학점
90~100 A학점
*/

let math_score = Number(prompt("수학점수 입력"))
let korean_score = Number(prompt("국어점수 입력"))
let science_score = Number(prompt("과학점수 입력"))
let english_score = Number(prompt("영어점수 입력"))

function score_average(a,b,c,d){
    return (a+b+c+d)/4
}

let score_average_result = score_average(math_score,korean_score,science_score,english_score)

if ((score_average_result>=70) && (score_average_result<80)) {
    alert("평균: "+score_average_result+"점 C학점 입니다.")
}

else if ((score_average_result>=80) && (score_average_result<90)) {
    alert("평균: "+score_average_result+"점 B학점 입니다.")
}
else if ((score_average_result>=90) && (score_average_result<100)) {
    
    alert("평균: "+score_average_result+"점 A학점 입니다.")
}
else{
    alert("평균: "+score_average_result+"점 낙제 입니다.")
}