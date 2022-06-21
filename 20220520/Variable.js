//변수 (데이터를 저장하는 공간)

//제일 앞에 붙는게 키워드 변수임 (var)
var num = 1; //끝에 세미콜론 안붙여도 되지만 붙여주기!
console.log(num); 

var str = "나는 무엇일까요?"
console.log(str);

//변수를 사용하려면 반드시 선언을 해야한다.
var num1; //변수선언
num1 = 10; //초기화(어떠한 값이 대입이 된것)
console.log("변수 num1에 들어간 녀석은? : ",num1)
var num2 = 20; //변수 선언과 동시에 초기화

var score;//선언
score=100; //할당
console.log(score);
score=20; //재할당
console.log(score);

//var : 재선언, 재할당 가능
//let : 재할당은 가능하지만 재선언은 불가
//const : 재선언, 재할당 둘다 불가(콘스트 쓸때 암묵적으로 변수이름 대문자로 지정)
//따라서 const를 제일 많이 사용한다.

var score=10000;
console.log(score);

let number = 5;
console.log("let으로 선언한 녀석", number);
number = 10;
console.log("let으로 선언한 녀석", number)
// let number = 1; 재선언 불가

const maxNumber = 1;
console. log("const 키워드로 선언한 녀석", maxNumber);
// maxNumber = 2;  재할당 불가
//console.log("const 키워드로 선언한 녀석", maxNumber);
// const maxNumber = 10; 재선언 불가

const a = 1;
const b = 2;
const c = a+b;
console.log(c);

//변수이름을 지을때 주의사항.
///누가봐도 알아먹을수 있게 지을것.
///변수에 1,2,3 숫자붙히지 말기
///한글쓰지말기
///이왕이면 풀네이밍으로 쓰기
///코딩컨벤션에 References 참고하기

/*
    데이터타입
    ===========================================================
    원시타입   
        1.숫자타입(number): 숫자, 정수, 실수 구분없이 하나의 숫자타입만 존재.
        2.문자열타입(string): 문자열
        3.불리언타입(Boolean): 참과 거짓(true or false) 
        4.undefined: var키워드로 선언된 변수에 암묵적으로 할당되는 값
        5.null: 값이 없다는 것을 의도적으로 명시할때 사용하는 값
        6.심벌타입(symbol): ES6에서 추가된 7번째 타입(별로 안씀)
    ============================================================= 
    객체타입: 객체, 함수, 배열 등...
       
*/

const inteager = 10; //정수
const double = 10.12; //실수
const negative = -20; //음의정수

console.log(typeof inteager); //typeof: 해당되는 변수의 데이터타입 보기
console.log(typeof double);
console.log(typeof negative);

const binary = 0b01000001; //binary: 2진수
console.log(binary); 

const hex = 0x41; //hex: 16진수
console.log(hex); 

console.log(1 == 1.0); // ==: 둘이 같냐?
console.log(1 === 1.0); // ===: 타입까지 같냐? (js는 모든 수를 실수로 취급함)
console.log(3/2);

const string = "문자열" ; //단일문자면 ''쓰고 단어이상이면 ""를 쓴다.
const string1 = '문' ;
console.log(typeof string);
console.log(typeof string1);
console.log(string);
console.log(string1);


let d = 10;
//alert(d); //경고 팝업창 띄우기

//let value = prompt("숫자입력해보기") //텍스트 입력하는 팝어창 띄우기
//console.log("value의 값:", value); //팝업에 텍스트 입력하면 콘솔에 그 값이 뜨게함

/*
사칙연산
+, -, *, /, %
*/

const number1 = 5;
const number2 = 3;

const result = number1+number2;
const result1 = number1-number2;
const result2 = number1*number2;
const result3 = number1/number2;
const result4 = number1%number2;

console.log(result);
console.log(result1);
console.log(result2);
console.log(result3);
console.log(result4); // %:몫은 버리고 나머지값(모듈러연산)


//let input1 = prompt("첫번째 숫자 입력");
//let input2 = prompt("두번째 숫자 입력");

//console.log(input1+input2) //이런식으로 하면 문자열로 인식해서 숫자두개 나열함.

///////////////////////////////////////////////////////////////

//let input3 = prompt("첫번째 숫자 입력"); //입력한 문자열을 숫자로 형변환
//let input4 = prompt("두번째 숫자 입력");
//let inputTypeCasting = Number(input3);
//let inputTypeCasting1 = Number(input4);

//console.log(inputTypeCasting+inputTypeCasting1);//형변환에 의해 원하는 결과가 나온다.

/*
입력을 4개의 점수를 받는다.
입력받은 4개의 총 합을 구한다.
평균값을 출력해라
*/
