/*
1. 콜백 함수란 무엇인가??
    비동기 방식으로 작성된 함수를 동기 처리하기 위해 주로 사용
    비동기 처리를 기본으로 하고 일부 구간에서 순차적인 처리가 필요할때(예? API?)
    응답을 받은 다음에 처리해야 할때
*/    

// 익명의 함수 사용
// let num = ["222","12",3,4];
// num.forEach(function(el,i){
//     console.log(el);
//     console.log(i);
// });

//함수의 이름만 전달하는 방법
//매개변수로 이름과 함수를 받을 함수
//보통 함수를 선언한 뒤에 함수 타입 파라미터를 맨 마지막으로 하나더 선언해준다.
function myFun(text, callBack){
    //매개변수로 받은 text 보여줌
    console.log(text);
    //매개변수로 받은 콜백함수 사용
    callBack();
}

// callFun 콜백으로 전달해서 보여줄 함수를 만듬
function callFun(){
    console.log('난 콜백');
};

myFun("안뇽",callFun);

// 함수를 사용했고, 첫번째 매개변수(parameter)는 임의의 문자를 삽입
// 함수를 전달하는 부분은 우리가 함수를 사용할때 ()괄호를 붙이는데
// ()괄호는 함수를 사용하겠다는 뜻이고, 콜백으로 함수를 전달할때는
// ()괄호가 없이 함수의 이름만 전달하는 것

//전역변수, 지역변수 콜백함수 파라미터로 전달

//전역 변수를 선언
let myName = "윤철";

//매개 변수로 함수를 받을 함수를 만듬
function callBackFun(call){
    //지역 변수 선언
    let youName = "병현";
    call(youName);
}

function callName(you){
    //매개 변수로 넘길 함수를 선언해둔 myName 전역 변수를 사용하고
    //자신이 받은 매개 변수 you를 사용한다.

    console.log(myName + "이랑 "+you+"사이가 좋아");
}

//callBackFun 함수를 사용하는데 매개 변수로 callName함수의 이름을 전달
callBackFun(callName);

//콜백에서 주의할점 -> this를 보호하자
// class con{
//     constructor(){
//         this.name;
//     };
//     setname = function(firstName, lastName){
//         this.name = firstName + " " + lastName;
//     };
// }

let con = {
    name: '홍길동',
    setname: function (firstName, lastName){
        this.name = firstName +" "+ lastName;
    }
}

// let _con = new con();
// console.log(_con);
// _con.setname();

function getName(firstName, lastName, callBack){
    callBack(firstName, lastName)
}

getName("나 병현", "나 윤철", con.setname);
console.log(con.name);
console.log(window.name);

//우리가 getName이 함수에 전달한 callBack매개 변수에는 con.setname의
//함수가 전달이 되었는데 con.setname(); 이렇게 코드상에서 사용하면
//this는 con 객체이지만 getName함수에 getName의 이름으로 callBack
//함수를 전달해서 사용하면 this는 window 객체이다.

//제일 그지같은 코드
//콜백 지옥
//첫번째로 숫자 값을 받고 두번째로 함수를 받는다.
function temp(num,call){
    let _num = num*num;
    console.log(_num);
    call(_num);
}
//함수를 실행하는데 첫번째 매개변수로 5의 값을 전달
//두번째 매개변수로 매개변수 하나를 받을 익명 함수를 전달
temp(5,function(result){
    //이 안에서 함수를 또 실행시키는데 위에 익명함수의 매개변수 값을 전달
    //첫번째 매개변수로 result(실행시킨후 값)을 다시 전달 
    temp(result,function(result){
        console.log("첫번쨰")
        temp(result, function(result){
            console.log("두번쨰")
            temp(result,function(result){
                console.log("세번쨰")
                temp(result, function(result){
                    console.log("네번쨰")
                });
            });
        });
    });
});

//해결방안
// function add(num){
//     return new Promise((res,rej) =>{
//         let _num = num+num;
//         console.log(_num);
//         res(_num);
//     })
// }

// //Promise는 정상 수행 후 resolve, 실패 후 reject가 실행된다.
// //callback을 사용했던 것과 마찬가지로 reslove에 값을 담아 전달한다.

// //Promise Hell이다. 이건
// add(5).then((result) => {
//     add(result).then((result) => {
//         console.log("끝")
//     });
// });

//Promise Hell을 탈출하려면
function add(num){
    return new Promise((resolve,reject) => { //new Promise는 function을 모수로 받는데,
        let _num = num + num;                //모수가 되는 function은 resolve랑 reject를 모수로 받는다
        console.log(_num);
        resolve(_num);
    })
}

add(5).then((result) => {
    return add(result);
})
.then((result) => {
    return add(result);
})
.then((result) => {
    console.log("Hell 지옥 탈출");
});

function eat(){
    return new Promise(function(resolve){
        //setTime 밑에 쓴 숫자는 1000당 1초이다
        //setTimeout은 밑의 시간 이후에 실행
        setTimeout(() => {
            resolve("5초후 날 볼거야(작업 완료)");
        }, 5000);
    });
}
//await: 처리 될때까지 기다려줌
(async function(){
    var result = await eat(); //eat() resolve가 될떄까지 기다려
    console.log(result+"리저트");
})();

// window.onload = function(){
//     //window 객체로드 이후 
// }