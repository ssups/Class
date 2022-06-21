// let message = "Hello", age = 25, num = 1;

// alert(message + age);

//let 1a; 변수명은 숫자로 시작하면 안된다
//let my-Name; 하이폰도 변수명우로 안됨
//대소문자 구분됨

// const COLOR_RED = "#F00";
// const COLOR_GREEN = "#F0";

// +, -, *, /, %, **(거듭제곱)

//산술연산자
//5*4 -> 20
//문자열을 연결
//"My name is" + "Lee" -> My name is Lee

//const color = "red" ->red

/*
==========================
이항 산술 연산자
+, -, *, /, %
===========================
단항 한술 연산자
++(1씩 증가를 해줌)
--(1씩 감소)
*/

let x = 1;
x++; // x = x+1;
console.log("++후 x의 값은: ", x);

x--; // x = x-1;
console.log("--후 x의 값은:", x);

let number = 5;
let result;

//선할당후 후증가
result = number++;
console.log(result, number);

//선증가 후할당
result = ++number;
console.log(result, number)

//선할당 후감소
result = number--;
console.log(result, number);

//선감소 후할당
result = --number;
console.log(result, number);

/*
할당연산자
=:                      x= 5
+=:                     x+= 5 -> x= x+5
-=:                     x-= 5 -> x= x-5
*=:                     x*= 5 -> x=x*5
/=:                     x/= 5 -> x=x/5
%=:                     x%= 5 -> x=x%5
*/

let num = 10;

num += 5; //num = num + 5
console.log("+= 연산자", num);
num -= 5; //num = num - 5
console.log("-+연산자", num);

/*
비교연산자

==:     a==b     a와 b가 같다(값)
===:    a===b    a와 b의 값과 타입이 같다
!=:     a!=b     a와 b는 값이 다르다
!==:    a!==b    a와 b의 값과 타입이 다르다

*/

//이상한 결과를 줄 수 있음.
console.log(5 == 5); //true
console.log(5 == "5"); //true 
console.log("0" == ""); //false
console.log(0 == ""); //true
/////////////////////////////
console.log(5 === "5"); //false

console.log(5 != 8); //true
console.log(5 != 5); //false
console.log(5 != "5"); //false
console.log(5 !== "5"); //true

/* 
대소비교 연산자

>:      a>b     a가 b보다 크다.
<:      a<b     a가 b보다 작다.
>=      a>=b    a가 b보다 크거나 같다.
<=      a<=b    a가 b보다 작거나 같다.

*/
console.log(5 > 0); //true
console.log(5 > 5); //false
console.log(5 >= 5); //true
console.log(5 <= 5); //true

//만약에 이러이러한 조건이 맞다면
/*
const a=1;
const b=2;
if (a<b) { 
    // 조건이 맞으니깐 여기를 실행해라
    console.log("맞아요!")
}
*/


//삼항연산자: 결과가 참이면 앞에꺼 거짓이면 뒤에꺼 
let z = 3;
let res = z % 2 ? '홀수' : '짝수';
console.log(res);

/* 
논리연산자
==================================
||      논리합(OR)
a || b -> 둘중하나라도 참이면 true
0    0 -> false
1    0 -> true
0    1 -> true
1    1 -> true
========================================
&&       논리곱(and)
a && b -> 둘다 참이여야 true
0    0 -> false
1    0 -> false
0    1 -> false
1    1 -> true
=========================================
!        부정(Not)
*/

console.log(true || true); //1 1
console.log(true || false); //1 0
console.log(false || true); //0 1
console.log(false || false); //0 0

console.log(true && true); //1 1
console.log(true && false); //1 0
console.log(false && true); //0 1
console.log(false && false); //0 0

console.log(!false);


