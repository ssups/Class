/*
1. 회사에 4명이 있어요.(모든 직원의 월급에 대한 정보를 담고있는 객체가 있다.)
모든 팀원의 월급을 합한 값을 구하고(메서드로 만들기) 결과를 출력하기.
2. 객체 A가 프로퍼티 값이 숫자인 경우 그 값을 두배로 늘려주는 함수 만들기
let a = {
    w: 200,
    h: 500
}

a={
    w:400
    h:1000,
}
이런식으로 나오게 하기. 타입검사 넣기
*/

let company_pay = {
    I:1000,
    My:500,
    Me:800,
    Mine:1500,
    sum : function(){
        return this.I+this.Me+this.My+this.Mine
    }
 }

function show(thing){

}  


console.log("직원들월급: ",company_pay)
console.log("직원들 월급 합: ",company_pay.sum())


let arrA = {
    w: 200,
    h: 500,
    t: "안녕하세요",
    r: "zz",
    k: 1000
}
let arrB = {
    w: 200,
    h: 500,
    t: "안녕하세요",
    r: "zz",
    k: 1000
}

function multiplyer(arr){
    for(i in arr ){    
        if (typeof(arr[i])=='number'){
            arr[i] = arr[i]*2
        }
    }
    return arr
}

console.log("함수대입전 객체: ",arrA)
console.log("함수대입 후 객체: ",multiplyer(arrA))

function Multiplyer(arr){
    for(i in arr ){    
        if (typeof(arr[i])=='number'){
            arr[i] = arr[i]*2
        }
    }
    this.arr = arr
}
new Multiplyer(arrB)
console.log("new함수 거친 객채: ",arrB)



// information1_rs = {};
// console.log(information1);
// // multiplyer(information1,information1_rs);
// console.log(informationNew);

// for( i in information1_rs){
//     console.log(i+": "+information1_rs[i]);
// }


/*
게임 월남뽕
카드 52장(조커x) 13*4
ace,2,3,4,5,6,7,8,9,10,j,q,k
(1) 카드 두장을 보여줌
    만약에 딜러가 뽑아서 하트(기호)5, 다이아7이 나왔다.
    내가 뽑은 카드 1장이 컴퓨터카드 두장번호 사이에 있으면 승리
    내가 뽑은 카드 1장이 컴퓨터카드 두장번호와 중복되거나, 사이에 없으면 진다.
    나온카드는 빼버린다 (총 17판 가능장)
    

*/

