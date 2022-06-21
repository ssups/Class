
function game(game_coin){
    let game_count = 1;
    let user_pocket = 10000;
    let computer_pocket = 10000;
    let surrounder_pocket = 0;

    while (game_count<=game_coin) {
        let user_position = prompt("가위 바위 보 중 입력하시요.");
        let bet_amout = prompt("얼마를 배팅하시겠습니까? 잔고:"+user_pocket);
        console.log(game_count + "번째 게임");   
        console.log("배팅금액:", bet_amout) 
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
        if (user_position == computer_position) {
            console.log("비겼습니다!");
            computer_pocket -= bet_amout;
            user_pocket -= bet_amout;
        }
        else if ((user_position == "가위") && (computer_position == "바위")) {
            console.log("컴퓨터가 이겼습니다!");
            let luck = Math.random() * 10;
            if ((0<=luck) && (luck<=4)){  
                console.log("컴퓨터가 기부당첨!")
                console.log("기부금액:" , bet_amout*1.5)           
                computer_pocket -= bet_amout*1.5
                surrounder_pocket += bet_amout*1.5
            }        
            computer_pocket += bet_amout*2;
            user_pocket -= bet_amout*2;
        }
        else if ((user_position == "바위") && (computer_position == "보")) {
            console.log("컴퓨터가 이겼습니다!");
            let luck = Math.random() * 10;
            if ((0<=luck) && (luck<=4)){  
                console.log("컴퓨터가 기부당첨!")
                console.log("기부금액:" , bet_amout*1.5)              
                computer_pocket -= bet_amout*1.5
                surrounder_pocket += bet_amout*1.5
            }        
            computer_pocket += bet_amout*2;
            user_pocket -= bet_amout*2;
        }
        else if ((user_position == "보") && (computer_position == "가위")) {
            console.log("컴퓨터가 이겼습니다!");
            let luck = Math.random() * 10;
            if ((0<=luck) && (luck<=4)){  
                console.log("컴퓨터가 기부당첨!")
                console.log("기부금액:" , bet_amout*1.5)             
                computer_pocket -= bet_amout*1.5
                surrounder_pocket += bet_amout*1.5
            }        
            computer_pocket += bet_amout*2;
            user_pocket -= bet_amout*2;
        }
        else if ((user_position == "가위") && (computer_position == "보")) {
            console.log("당신이 이겼습니다!");
            let luck = Math.random() * 10;
            if ((0<=luck) && (luck<=4)){
                console.log("당신이 기부당첨!")
                console.log("기부금액:" , bet_amout*1.5)            
                user_pocket -= bet_amout*1.5
                surrounder_pocket += bet_amout*1.5    
            }
            computer_pocket -= bet_amout*2;
            user_pocket += bet_amout*2;
        }
        else if ((user_position == "바위") && (computer_position == "가위")) {
            console.log("당신이 이겼습니다!");
            let luck = Math.random() * 10;
            if ((0<=luck) && (luck<=4)){
                console.log("당신이 기부당첨!")
                console.log("기부금액:" , bet_amout*1.5)            
                user_pocket -= bet_amout*1.5
                surrounder_pocket += bet_amout*1.5    
            }
            computer_pocket -= bet_amout*2;
            user_pocket += bet_amout*2;
        }
        else if ((user_position == "보") && (computer_position == "바위")) {
            console.log("당신이 이겼습니다!");
            let luck = Math.random() * 10;
            if ((0<=luck) && (luck<=4)){
                console.log("당신이 기부당첨!")
                console.log("기부금액:" , bet_amout*1.5)            
                user_pocket -= bet_amout*1.5
                surrounder_pocket += bet_amout*1.5    
            }
            computer_pocket -= bet_amout*2;
            user_pocket += bet_amout*2;
        }
        else {
            alert("다시 입력하세요")
            break;
        }

        if (user_pocket<=0){
            alert("패배, 금액을 다 소진하셨습니다.")
            console.log("당신:", user_position);
            console.log("컴퓨터:", computer_position);
            console.log("당신 지갑:", user_pocket);
            console.log("컴퓨터 지갑:", computer_pocket);
            console.log("구경꾼 지갑:", surrounder_pocket)
            console.log("<당신지갑 소진으로 인한 패배>");
            break;
        }
        else if (computer_pocket<=0){
            alert("승리, 컴퓨터의 금액이 다 소진되었습니다.")
            console.log("당신:", user_position);
            console.log("컴퓨터:", computer_position);
            console.log("당신 지갑:", user_pocket);
            console.log("컴퓨터 지갑:", computer_pocket);
            console.log("구경꾼 지갑:", surrounder_pocket)
            console.log("<컴퓨터지갑 소진으로 인한 승리>");
            break;
        }

        console.log("당신:", user_position);
        console.log("컴퓨터:", computer_position);
        console.log("당신 지갑:", user_pocket);
        console.log("컴퓨터 지갑:", computer_pocket);
        console.log("구경꾼 지갑:", surrounder_pocket)
        console.log("");
        game_count++;
    }
}

let coin = prompt("몇판할래?")
game(coin)

 



/*

가위바위보 게임 개선하기 
     1. 10판만 실행되기
     2. 유저는 소지금이 만원
     3. 컴퓨터도 소지금 만원
     4. 이겼으면 내가 배팅한 금액에 *2
     5. 무승부면 아무것도 없고(배팅금액 다시 지급 안됨)
     6. 졌으면 배팅금액 *2만큼 차감
     7. 종료조건은 10판을 다 돌았거나 소지금이 둘중 하나라도 소진했을 경우 )
     8. 구경꾼이 있다. 랜덤확률로 딴유저가 베팅한 금액의 1.5배 기부
        함수 쓸만한거: 배팅금액, 가위바위보 게임


*/

