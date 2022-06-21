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


for (i=1; i<=13; i++){
    cards.push("♡"+i);
    cards.push("♧"+i);
    cards.push("♤"+i);
    cards.push("◇"+i);
}

while(cards.length>2){
    console.log("<"+count+" 번째 드로우"+">")
    let user_card=[];
    let computer_card1=[];
    let computer_card2=[];
    let random = Math.floor(Math.random()*cards.length);
    user_card = String(cards.splice(random,1));
    random = Math.floor(Math.random()*cards.length);
    computer_card1 = String(cards.splice(random,1));
    random = Math.floor(Math.random()*cards.length);
    computer_card2 = String(cards.splice(random,1));

    userNum = Number(user_card.substr(1));
    computerNum1 = Number(computer_card1.substr(1));
    computerNum2 = Number(computer_card2.substr(1));

    if ((userNum > computerNum1 && userNum < computerNum2) || (userNum > computerNum2 && userNum < computerNum1)){
        alert("성공!, 유저카드: "+user_card+" 컴퓨터카드: "+computer_card1+", "+computer_card2)
        console.log("성공!, 유저카드: "+user_card+" 컴퓨터카드: "+computer_card1+", "+ computer_card2)
        alert("2500지급!")
        userAccount += 2500;
    }
    else{
        alert("실패, 유저카드: "+user_card+" 컴퓨터카드: "+computer_card1+", "+computer_card2)
        console.log("실패, 유저카드: "+user_card+" 컴퓨터카드: "+computer_card1+", "+computer_card2)
        alert("ㅠㅠ 잔고 -2000")
        userAccount -= 2000;
    }

    if (userAccount<=0){
        alert("잔고소진으로 인한 게임패배!")
        console.log("잔고소진으로 인한 게임패배!")
        break;
    }
    else if (userAccount>=20000){
        alert("잔고 20000 돌파! 게임승리!")
        alert("잔고 20000 돌파! 게임승리!")
        break;
    }
    
    count++;
    console.log("잔고:"+userAccount);
    console.log("")
}


