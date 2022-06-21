/*
부모클래스(Monster) 를 만든 다음에
부모클래스를 상속받고,
하위클래스(Boss 등등...) 만든다.
부모클래스는 공격, 방어, 기타 걸어가기 등등... 가지고 있고,
하위클래스는 위에 해당하는 기능을 재정의한다.
*/

class Monster{
    constructor(name,level,powerA,powerD,speed){
    this.name = name;
    this.level = level;
    this.powerA = powerA;
    this.powerD = powerD;
    this.speed = speed;
    }
    getInfo(){
        console.log("내 이름은 "+this.name+" 레벨은 "+this.level+"이다")
    }
    attack(){
  
        console.log(this.name+"이 "+this.powerA+"의 공격력으로 공격한다.");
    }
    defend(){

        console.log(this.name+"이 "+this.powerD+"의 방여력으로 방어한다.")  
    }
    walk(){

        console.log(this.name+"이 "+this.speed+"의 속도로 걸아간다.")  
    }
}

class Boss extends Monster{
    getInfo(){
        console.log("내 이름은 "+this.name+" 레벨은 "+this.level+"이고, Boss계층이다.")
    }
}

class SubBoss extends Monster{
    getInfo(){
        console.log("내 이름은 "+this.name+" 레벨은 "+this.level+"이고, SubBoss계층이다.")
    }
} 

class Nomarl extends Monster{
    getInfo(){
        console.log("내 이름은 "+this.name+" 레벨은 "+this.level+"이고, Normal계층이다.")
    }
} 

let boss1 = new Boss("보스1",30,200,100,20);
boss1.getInfo();
boss1.attack();
boss1.defend();
boss1.walk();
console.log("")

let subBoss1 = new SubBoss("서브보스1", 20,100,50,10);
subBoss1.getInfo();
subBoss1.attack();
subBoss1.defend();
subBoss1.walk();
console.log("")

let subBoss2 = new SubBoss("서브보스2", 19,80,60,15);
subBoss2.getInfo();
subBoss2.attack();
subBoss2.defend();
subBoss2.walk();
console.log("")

let nomarl1 = new Nomarl("노말1", 5,50,25,5);
nomarl1.getInfo();
nomarl1.attack();
nomarl1.defend();
nomarl1.walk();
console.log("")

let nomarl2 = new Nomarl("노말2", 3,30,30,2);
nomarl2.getInfo();
nomarl2.attack();
nomarl2.defend();
nomarl2.walk();

