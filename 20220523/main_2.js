//조건문

//만약에 조건이 true면 실행시켜라

let number = 1;
let number1 = 2;
//만약에 조건이 참이라면
if (number < number1) {
    console.log(1); //여기를 실행해라
};

//실행시킬 코드가 한줄이라면 중괄호 빼도댐
//if(number<number1)console.log(1);

const age = 10;
const age1 = 20;
if (age < age1) {
    console.log("if의 조건이 참(true)이면 여기가 실행된다.");

}
else if (age > age1) {
    console.log("바로 위에 있는 if문이 거짓일때만 여기가 실행");
}
else {
    console.log("위 조건이 전부 아니면 여기가 실행");
};

let inputNum = Number(prompt("아무 숫자나 입력"));

if(inputNum<10){
    console.log("내가 입력한 값: ",inputNum)
}
else if(inputNum>10 || inputNum<20){
    console.log("첫번째 else if실행");
    console.log("내가 입력한 값: ", inputNum);
}
else if(inputNum>10 && inputNum<20){
    console.log("두번째 else if 실행");
    console.log("내가 입력한 값: ", inputNum);
}
else{
    console.log("else 실행")
}


