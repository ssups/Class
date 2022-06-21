let user_account = Number(prompt("유저금액?"));
let computer_account = Number(prompt("컴퓨터금액?"));
let surrounder_account = 0;
let coin = Number(prompt("최대몇판?"))
let result = 0;

function computer_postion_function(){
    let computer_value = Math.floor(Math.random() * 10);
    if ((computer_value >= 0) && (computer_value < 4)) {
        computer_position = "가위";
    }
    else if ((computer_value >= 4) && (computer_value < 7)) {
        computer_position = "바위";
    }
    else {
        computer_position = "보";
    }  
    return computer_position      
}
function play_result(position_1, position_2){
    
    if(position_1 == position_2){
        result = 3
    }
    else if (position_1 == "가위"){
        if (position_2 == "바위"){
            result = 2
        }
        else if (position_2 == "보"){
            result = 1
        }
    }
    else if(position_1 == "바위"){
        if(position_2 == "가위"){
            result = 1
        }
        else if(position_2 == "보"){
            result = 2
        }
    }
    else if(position_1 == "보"){
        if(position_2 == "가위"){
            result = 2
        }
        else if(position_2 == "바위"){
            result = 1
        }
    }
}
function money_divider(result, amount){
    if(result==1){
        user_account += amount*3
        computer_account -= amount
    }
    else if(result==2){
        computer_account += amount*3
        user_account -= amount
    }        
}
function surrounder_luck(result, amount){
    let odd = Math.floor(Math.random() * 10);
    if (odd<=4){
        console.log("기부당첨!")
        surrounder_account += amount*1.5
        if (result==1){
            user_account -= amount*1.5
            console.log("유저가 구경꾼에게", amount*1.5, "만큼 기부")
        }
        else if (result==2){
            computer_account -= amount*1.5
            console.log("컴퓨터가 구경꾼에게", amount*1.5, "만큼 기부")
        }
    }
}

for (let game_count=1; game_count<=coin; game_count++){
let user_position = prompt("가위 바위 보 중 입력하시요.");
let bet_amount = prompt("배팅금액을 입력하시오. 유저잔고:"+ user_account)
console.log("<"+game_count+"번째 게임>")
user_account -= bet_amount;
computer_account -= bet_amount;
computer_postion_function();
console.log("유저",user_position)
console.log("컴퓨터",computer_position)
play_result(user_position,computer_position)
if (result==1){
    console.log("가위바위보 유저 승")
}
else if (result==2){
    console.log("가위바위보 컴퓨터 승")
}
else if (result==3){
    console.log("가위바위보 무승부")
}
if (result < 3){
    money_divider(result,bet_amount)
    surrounder_luck(result, bet_amount)
}
console.log("배팅금",bet_amount)
console.log("유저잔고",user_account)
console.log("컴퓨터잔고",computer_account)
console.log("구경꾼잔고",surrounder_account)
console.log("")
if (user_account<=0){
    console.log("<유저 청산으로 인한 패배>")
    break
}
if (computer_account<=0){
    console.log("<컴퓨터 청산으로 인한 승리>")
    break
}
}



