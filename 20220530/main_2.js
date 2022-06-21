class Mother{
    constructor(name, age){
        this.name = name;
        this.age =age;
    }
    getInfo(){
        return console.log("내이름은 "+this.name+"이고, 나이는 "+this.age+"입니다.")
    }
}
let a = new Mother("부모", 50);
a.getInfo();

//extends 키워드를 사용해서 상속받을 수 있다.
//자식 클래스가 부모클래스를 상속받아 자식클래스에서 부모클래스의 기능을 물려받아서 사용할 수 있다.
//기존에 존재하던 기능을 토대로 새로운 기능을 확장시켜서 만들 수 있다.
class Child extends Mother{
}
let b = new Child("자식", 30);
b.getInfo();

class Animal{
    constructor(name){
        this.name = name;
        this.speed = 0;
    }
    run(speed){
        this.speed+=speed;
        console.log(this.name+"은"+this.speed+"로 달린다.","나는 부모다.")
    }
    stop(){
        this.speed = 0;
        console.log(this.name+"이 멈췄다.")
    }
}
let ani = new Animal("동물")
ani.run(5);
ani.stop();

class Cat extends Animal{
    //생성자(constructor)가 없는 경우 비어있는 생성자가 자동으로 만들어진다.
    run(speed){
        this.speed =speed;
        console.log(this.name+"는"+this.speed+"로 달린다", "나는 자식이다.")
    } //함수 오버라이딩: 상속받은 관계에서 부모의 함수를 받아서 새로 재정의함.
      //새로 정의하지 않으면(run 함수를 여기서 안쓰면) 부모의 함수를(run) 그대로 가져다 쓴다.
    speak(){
        console.log("야옹야옹");
    }
    stop(){
        // super.stop(); 부모클라스 함수를(stop) 불러옴 super -> 최상위 부모 클래스를 지칭함
        this.speak(); 
    }
}
let cat = new Cat("고양이");
cat.run(2);
cat.stop();

class Human{
    constructor(name, age){
        this.name = name;
        this.age = age;
    }
}
class Man extends Human{
    //상속받는 클래스에서는 반드시 부모클래스를 호출해야 하는데,,
    //super를 호출해야 한다. 혹은 생성자 생략하기.
    //일반적인 함수에서는 new 키워드와 함께 실행되면 빈 객체가 만들어지고
    //this키워드에 이 객체를 할당한다.
    //반면 상속클래스 (Man)의 생성자 함수가 실행되면 일반함수에서 일어나는 일이
    //일어나지 않는다. this에 객체를 할당하는 일은 부모클래스의 생성자가
    //처리 해주기 바라기 때문임.
     constructor(name, age){
         super(name,age);
         this.name = name;
         this.age = age;        
     }
}
let man = new Man("경일", 30);
console.log(man);

function func(){
    console.log("하이");
}

func();

window.func();
console.log(func() === window.func(0)); //true
//window는 자바스크립트에서 최상위 객체임

//this: C++에서는 멤버함수(클래스 안의 함수)가 속한 클래스를 가르키는 포인터
//JS에서의 this는 실행 컨텍스트가 생성될때 결정이 되고 실행 컨텍스트는
//함수를 호출할때 생성되므로  this는 함수가 호출될때 결정된다.(호출하는 방법에 따라 다르다)

var abc = 5;
console.log(abc);
console.log(window.abc);
console.log(this.abc);

function f(){
    if (window === this){
        console.log("윈도우는 this");
        }
}

f();


var student = {
    name: "hong",
    st: function(){
        console.log(this);
    }
};
student.st();

//전역공간에 있으므로 실행주체는 window객체가 되기 때문에
//아래의 this는 전역객체인 window가 뜬다.
var s = student.st;
s();

