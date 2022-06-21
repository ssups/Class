/*
객채(object)
기본 데이터 타입을 제외한 나머지 녀석들 모두 객체라고 볼 수 있다.
함수, 배열, 정규표현식 ... 객체에는 key, value가 존재한다.

프로퍼티: 객체의 상태를 나타내는 값
메서드: 프로퍼티를 참조하고 조작할수 있는 동작
*/
// const person = {
//     //properties
//     name: 'Lee', age = 20 //name, age -> key / 'Lee', 20 -> value
//     age: 20
// };

let counter = {
    num:0, //properties
    increase : function(){ // method
        this.num++;
    }
}
let person = {
    name: 'Lee',
    Hello : function(){
        console.log(`Hello My name is ${this.name} `) //따옴표가아니라 느낌표 왼쪽에있는 키
    }
}

console.log(typeof person);
console.log(person);
console.log(person.name);
person.Hello();

//중괄호 내에 프로퍼티를 정의하지 않으면 빈 객체 생성
let empty = {};

//객체 안에 객체를 넣을 수 있다.
let student ={
    list:{a:10, b:20, c:30},//객체
    print: function(){
        console.log("나는 프린트");
    }
}

//전역변수 안쓰는게 좋지만 불가피하게 사용하게 된다면
//1. 하나의 객체를 전역변수로 만들고 객체의 속성으로 변수를 관리
    let myObj = {};
    myObj.cal = {a:null, b:null};
    myObj.test = {c:null, d:null};
    myObj.cal.a = 10;
    myObj.cal.b = 20;

    function sum(){
        return myObj.cal.a+myObj.cal.b;
    }
    console.log(sum()) //결과: 30
    
    let korea = {
        a:500,
        b:300,

        seoul:{
            a:100,
            b:20,
            c:50
        },
    };

    let circle = {
        radius : 5,
        getDiameter : function(){
            return 2* this.radius; //this -> 자기 자신의 객체 여기서는 circle 을 가리킴
        }
    }
    console.log(circle.getDiameter());

    //프로퍼티 접근
    // . []
        console.log(circle.radius);
        console.log(circle['radius']); // 둘다 circle 객체 안에있는 radius라는 키값이 가지는 value를 불러온다.
                                       // 하지만 for구문 안에서 value 값을 불러올때는 circle[radius] 형식으로만 불러올 수 있다.
    let obj = {a:10, b:20, c:30};

for (const key in obj){   //key in obj -> obj객체 안에 있는 key =>그래서 결국 객체인 obj 안에있는 key 갯수만큼 반복
     console.log(key);     // 
    }
    for (const val in obj){  //obj 안에 있는 value 갯수만큼 반복
        console.log(obj[val]); //obj[val] -> obj 안에있는 value값 불러오기
        //obj[key] -> key값에 해당하는 value가 불러와짐 
    }
    //위에꺼랑 같으표현
    /*
    for (i in obj){
        console.log(obj[i])
    }
    */
    for(i in obj){ //i는 객체안에 있는 프로퍼티 key값을 차례대로 받는다. 그리고 key값이 3개가 들어있기 때문에 3번 반복
        console.log("key: "+i+" value"+obj[i]);
    }

//==========================================================================================    

function User(name){
    //this = {}; ->(암묵적으로 생략된 표현)
    this.name =name;
    this.isCheck = false;

    //return this; ->(암묵적으로 생략된 표현)
}
//let user = new User("홍길동");

function Person(name, age, city) {
    this.name = name;
    this.age = age;
    this.city = city;
    this.information = function(){
        console.log("나는 "+this.name+" 나이는 "+this.age+" 사는곳은 "+this.city);
    }
}
//개별 객체를 new로 생성 (인스턴스 생성) 
//인스턴스: 
//  클래스에 의해 메모리에 저장된 실체 -> 객체가 메모리에 저장되어 실제로 존재하는 것.
let p1 = new Person("사자",19,"에버랜드");
let p2 = new Person("호랑이",20,"내 앞마당");
p1.information();
p2.information();

