/*
고차함수: 함수를 인수로 전달받거나 함수를 반환하는 함수
고차 함수는 외부상태의 변경이나 가변데이터를 피하고 불변성을 지향하는
함수형 프로그래밍에 기반을 두고 있음.
*/
/*

sort: 정렬함. 원본배열을 직접 변경하며 정렬된 배열을 리턴한다.

*/

const fruits = ['Banana', 'Oragne', 'Apple' ];
fruits.sort(); //기본적으로 오름차순 정렬
console.log(fruits)

fruits.reverse(); // 내림차순 정렬
console.log(fruits)

const points = [40,30,1,5,2,25,100,10];
//1: U+0031, 2: U+0032, 10:0+0031U+0030
points.sort(); // [1, 100, 2, 25, 30, 40, 5]
console.log(points); //문자열로 인식해서 유니코드 순서로 정렬해서 숫자오름차순으로 안됨
//따라서 숫자요소를 정렬할때는 정렬순서를 정의하는 비교함수를 인수로 전달해야 한다.
points.sort((a,b)=>a-b);
console.log(points);

//===========================================================

// let sum = function(a,b){
//     return a+b;
// }
// let sum1 = (a,b)=>a+b; //arrow function(화살표함수) 형태
// let double = n=>n*2 //인수가 하나밖에 없으면 가로를 안써도됨
// let double1 = function(n){
//     return n*2;
// }
// let print = ()=>alert('안녕'); //인수가 없으면 빈괄호

//===============================================================

const numbers = [1,2,3];
const pows = [];

// for(let i = 0; i<numbers.length; i++){
//     pows.push(numbers[i] **2);
// }
// console.log(pows);

numbers.forEach(item=>pows.push(item**2)); //forEach 형태의 반복문은 브레이크를 달수없다는 단점이 있음
console.log(pows);

//======================================================================

//map
const number = [1,4,9];
const roots = number.map(item=>Math.sqrt(item));
console.log(roots); //원본 배열을 건드리지 않고, 새로운 배열을 반환함
console.log(number); //원본 배열이 변하지않고 그대로 있음.

//함수 오버로딩(함수 이름은 동일하지만 매개변수 갯수가 다르거나 자료형이 다르다. 즉 함수하나에 기능2개)

function myFunc(a,b,c){
    const len = arguments.length; //argument == [a,b,c] -> 펑션이 받는 인수 arry
    if (len==0){
        console.log("매개변수 없음")
    }
    else if(len==1){
        console.log("매개변수 1개")
    }
    else if (len==2){
        return a+b;
    }
    else{
        return a+b+c;
    }
}

//디폴트 매개변수
function call(a,b = 5){ //인수값을 안넣으면은 자동으로 5로 배정된다.
    return a+b;
}
console.log(call(1));

//=======================================
/*
Recursive Function(재귀함수) 반드시 종료조건!! 
단점: 메모리를 많이먹고, 종료조건이 반드시 있어야 한다
장점: 코드가 간결해짐, 반복문을 쓰지 않아도 된다
*/
//1~100까지 합
let res = 0;
for(let i = 0; i<101; i++){
    res+=i;
}

function RecursiveFunction(n){
    if (n<=1)return 1; //종료조건(없으면 무한대로 돈다)
    return n+RecursiveFunction(n-1)
}
//피보나치 수열
function fibo(num){
    let res = [0,1];
    if(num==0){
        console.log([0]);
    }
    if(num==1){
        console.log([0,1])
    }
    for(let i = 2; i<=num; i++){
        res.push(res[i-2]+res[i-1]);
        console.log(res);
    }
}
fibo(8);

//피보나치수열을 재귀함수로 만든거
function RecursiveFibo(num){
    if(num<2)return num;
    return RecursiveFibo(num-1)+RecursiveFibo(num-2);
}
console.log(RecursiveFibo(8));

abc1 = [1,2,3]
abc2 = [0,3,4]


console.log(abc2[0,1])










/*
1. 정리할것
    -고차함수-
    배열메서드중 filter, reduce, some, every
    find findIndex
2. 하노이탑(재귀함수의 대표적인 녀석)(숙제는아님)
3. 실습과제
    -숫자야구게임 만들기
        (1)컴퓨터는 임의의 숫자 3개 낸다. 0~9
        (2)유저는 숫자 0~9까지 숫자 3개를 아무거나 내서 컴퓨터가 낸 숫자를 추측한다.
        만약 컴퓨터가 1 2 3 을 내고 내가 7 8 9 를 내면 숫자와 자리가 모두 다르니깐 바로 아웃.
        만약 컴퓨터가 4 5 6 을 내고 내가 5 7 9 를 내면 숫자는 1나맞지만 자리가 다르니깐 1볼
        만약 컴퓨터가 1 2 3 을 내고 내가 1 2 4 를 내면 숫자 1 2 가 맞고 자리도 맞으니깐(인덱스 위치가 맞음) 2 스트라이크
        만약 컴퓨터가 1 4 7 을 내고 내가 4 5 7 를 내면 1스트라이크 1볼
        기회 횟수는 내가 설정
        (3)



-디버깅 확인: 소스에서 원하는줄 숫자 선택하면 밑에 중단점(브레이크포인트)에 뜬다
그상태로 새로고침하고 f10을 누르면 칸넘어감, 원하는 숫자에 마우스가져다대면 
각자코드 실행결과 나옴
*/