
const a = 1;
switch (a) {
    case 1:
        console.log("나는 스위치문이다.")
        break;

    default:
        break;
}
/*
switch (표현식) {
    case 표현식1:  //if
        
        break;
    case 표현식2: //elsif

        break;

    default: //else
        break;
}
*/


let input = Number(prompt("숫자입력해라"));
const COMPARENUM = 1;
const COMPARENUM_1 = 2;
switch (input) {
    case COMPARENUM:
        console.log("1번째 케이스 실행");
        console.log("내가 입력한 숫자:", input);
        break; //코드 중간에 탈출
    case COMPARENUM_1:
        console.log("2번째 케이스 실행");
        console.log("내가 입력한 숫자: ",input);
        break;
    default:
        console.log("디폴트 실행");
        break;
}


let randomNumber = Math.random(); //Math.random(): 0과 1사이의 숫자를 무작위로 내뱉음
console.log(randomNumber);

let rand1 = Math.floor(Math.random()); // Math.floor(): 소수점 첫번째 자리 이후를 버려서 정수로 나타냄
console.log(rand1);

let rand2 = Math.floor(Math.random()*10); 
console.log(rand2);