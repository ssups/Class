/*
function ?

함수? 
    코드 재사용성 높다.
    코드 유지보수가 좋다.
    함수는 정의를 통해서 생성한다.

*/



//      이름,(매개변수)
function sum(x,y){
    return x+y; //반환값
};

let result = sum(2,5,7);
console.log(result);

// function print(){
//     console.log("함수호출!");
// }
// print(); //함수호출

function sum1(a,b){
    console.log(arguments.length); // 길이표시
    return a+b;
}
console.log(sum1(1,2,3,4,5)) //인자과 초과 되어도 초과된만큼은 무시하고 출력한다.

/*
함수의 정의 방식에는 총 4가지가 있다.
1.함수 선언문
    function sum(x,y){
    return x+y; 
    };
2.함수 표현식
    let add = function(x,y){ //익명
        return x+y;
    };
    let add1 = function add(a,b){ //기명
        return a+b;
    }
3.Function 생성자 함수
    let add = Function('x', 'y', 'return a+b');
4.ES6 arrow Fuction
    let add=(x,y)=>x+y;

*/

//var, let, const



//====================호이스팅==================================
// console.log(a);
// var a = 1;  //변수초기화가 뒤에있기때문에 오류나야 정상이지만
//             //var는 암묵적으로 변수선언만 끌어올리기때문에(호이스팅)
//             //undefined가 뜬다. 따라서 var은 잘 안쓰는게 좋음

//함수 선언문
// foo();  //함수 선어문은 호이스팅이 발생해서 함수가 사용되긴한다.
// function foo(){
//     console.log("hello world")
// }

//함수 표현식은 호이스팅이 안됨.
// foo2(); //에러남
// let foo2 = function(){
//     console.log("나눈 푸우우22")
// }

// let foo3;
// foo3(); //에러남
// foo3 = function(){
//     console.log("나는 푸우우우~3")
// }

//결론: var은 안쓰면 된다, 함수 선언문은 호이스팅이 일어남으로 조심하기
//================================================================

//전역변수 지역변수
//지역변수: 반복구문같은거 안에서만 쓰이는 변수 반복구문이 끝나면 사라진다
//전역변수는 많이 안쓰는게 좋고 지역변수를 최대한 쓰는게 좋다.
var a=1;
for (let i=0; i<2; i++) {
        const d = "const로 선언된 d";

    for (let k =0; k<2; k++) {
        console.log(d);    
        
        if(true){
            const f = 2;
            console.log(f);
        }
        
        
    }
}