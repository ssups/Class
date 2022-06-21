
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

let cards=[];
let count=1;
let userAccount = 10000;

function gameSet(){
    for (i=1; i<=13; i++){
        cards.push("♡"+i);
        cards.push("♧"+i);
        cards.push("♤"+i);
        cards.push("◇"+i);
    }

    console.log("잔고:"+userAccount);
}


function userDraw(){
    if (count == 18){
        alert("카드소진, 게임시작 다시 누르세요")
    }
    console.log("<"+count+" 번째 드로우"+">")
    let user_card=[];
    let random = Math.floor(Math.random()*cards.length)
    user_card = String(cards.splice(random,1));
    console.log("뽑은카드: "+user_card)
    userNum = Number(user_card.substr(1));
}

function compDraw(){
    let computer_card1=[];
    let computer_card2=[];
    random = Math.floor(Math.random()*cards.length);
    computer_card1 = String(cards.splice(random,1));
    random = Math.floor(Math.random()*cards.length);
    computer_card2 = String(cards.splice(random,1));
    console.log("컴퓨터카드: "+computer_card1+" "+ computer_card2)
    computerNum1 = Number(computer_card1.substr(1));
    computerNum2 = Number(computer_card2.substr(1));
}

function result(){
    if ((userNum > computerNum1 && userNum < computerNum2) || (userNum > computerNum2 && userNum < computerNum1)){
        alert("성공!")
        console.log("성공!")
        alert("2500지급!")
        userAccount += 2500;
        console.log("잔고:"+userAccount);
    }
    else{
        alert("실패")
        console.log("실패")
        alert("ㅠㅠ 잔고 -2000")
        userAccount -= 2000;
        console.log("잔고:"+userAccount);
    }
    if (userAccount<=0){
        alert("잔고소진으로 인한 게임패배!")
        console.log("잔고소진으로 인한 게임패배!")
    }
    else if (userAccount>=20000){
        alert("잔고 20000 돌파! 게임승리!")
        alert("잔고 20000 돌파! 게임승리!")
    }
    count++;
}





function showAccout(){
    console.log("잔고:"+userAccount);
}



console.log("")


















































// let dealer_card = [];
// let user_card = [];
// let card_trashcan = [];
//let card=[]

// function random_card_machine() {
//      randomNuber = Math.floor(Math.random() * 14 + 1)
//      randomSymbolNumber = (Math.random()*10)
//      if (randomSymbolNumber <= 2.5) {
//          randomSymbol = "♡";
//      }
//      else if (randomSymbolNumber > 2.5 && randomSymbolNumber<=5) {
//          randomSymbol = "♧";
//      }
//      else if (randomSymbolNumber > 5 && randomSymbolNumber<=7.5) {
//          randomSymbol = "♤";
//      }
//      else {
//          randomSymbol = "◇";
//      }
//      card.push(randomSymbol)
//      card.push(randomNuber)
//  }
//  function card_throwaway_machine(){
//      card_trashcan.push(card[0])
//      card_trashcan.push(card[1])
//      card.splice(0,2)
//  }

// random_card_machine();
// console.log(card)
// card_throwaway_machine();
// console.log(card);
// console.log(card_trashcan);