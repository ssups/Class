/*
자바스크립트는 프로토타입 기반 객체지향 언어다~
프로토타입에 대해서 정리 하기.

class:
0개 이상의 메서드만 정의할 수 있다.
생성자, 프로토타입 메서드, 정적메서드

*/
class CStudent{

       //생성자
    constructor(age,phone,city){
        this.age = age;
        this.phone = phone;
        this. city = city;        
    }
    //메서드
    getInfo(){
        return "나이는: "+this.age + "살, 핸드폰 번호: "+this.phone + "사는 곳은: "+this.city+"입니다."
    }
}

let st = new CStudent(10,10,"서울시 강남구"); //인스턴스 생성
console.log(st);
console.log(st.age);
console.log(st.getInfo());

//getter, setter
//클래스는 프로퍼티의 값을 가져오거나 값을 설정하기 위해getter, setter를 제공한다.
//클래스 필드에 접근할때 직접 변수에 접근하는 형태가 아닌 get, set을 통한 접근하는 방법이다.
//외부에 값을 전달하거나 외부로부터 가지고 올때 추가적인 조작이 가능하고,
//내부 구조를 캡슐화 하는데에도 유리하다.

//private, public, protected 
class Product{
    constructor(name,price){
        this.name = name;
        this.price = price;        
    }
    get getName(){
        return "제품명: "+this.name;
    }
    set setPrice(price){
        this.price = price;
    }
}

let Pr = new Product("아이폰 14 언제 출시함?", 1000000);
console.log(Pr);
console.log(Pr.getName);
Pr.setPrice = 7000
console.log(Pr);

// class Person{
//     name = "Lee";
// }
// const me = new Person();
// console.log(me.name);

class Person{
    #name = "Lee"; //#을 붙히면 private가 되기 때문에 외부에서 접근 불가 기본값은 항상 public임

    constructor(name){
        this.#name = name;
    }
    get getName(){
        return this.#name
    }
}
const me = new Person("Lee");
//console.log(me.#name); //접근불가
console.log(me.getName); //getName 쓰면 접근 가능


