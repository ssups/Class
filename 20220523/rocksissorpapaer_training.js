//가위바위보 게임
//유저랑 컴퓨터랑 하기
//유저는 가위, 바위, 보 셋중 하나를 낸다.
//컴퓨터도 마찬가지로 가위, 바위, 보를 낸다.(랜덤하게)
//결과에 따라 무승부, 패배, 승리를 표시한다.


// let user_value=Number(prompt("가위:0~3, 바위:4~6 보:7~9"))


// if ((user_value>=0) && (user_value<4)) {
//     user_position="가위"       
// }
// else if ((user_value>=4) && (user_value<7)){
//     user_position="바위"
// }
// else if ((user_value>=7) && (user_value<10)){
//     user_position="보"
// }
// else {
//     console.log("0~9사이로 다시 입력하세요")
// }


let game_count=1;

while(true){
        
    console.log(game_count+"번째 게임");
    let user_position = prompt("가위 바위 보 중 입력하시요."," 그만하고싶으면 '그만'이라고 치세요")
   
    let computer_value = Math.floor(Math.random() * 10);    

    if ((computer_value >= 0) && (computer_value < 4)) {
        computer_position = "가위"
    }
    else if ((computer_value >= 4) && (computer_value < 7)) {
        computer_position = "바위"
    }
    else {
        computer_position = "보"
    }


    if (user_position == computer_position) {
        console.log("비겼습니다!")   
    }
    else if ((user_position == "가위") && (computer_position == "바위")) {
        console.log("컴퓨터가 이겼습니다!")    
    }
    else if ((user_position == "가위") && (computer_position == "보")) {
        console.log("당신이 이겼습니다!")
    }
    else if ((user_position == "바위") && (computer_position == "가위")) {
        console.log("당신이 이겼습니다!") 
    }
    else if ((user_position == "바위") && (computer_position == "보")) {
        console.log("컴퓨터가 이겼습니다!")    
    }
    else if ((user_position == "보") && (computer_position == "가위")) {
        console.log("컴퓨터가 이겼습니다!")    
    }
    else if ((user_position == "보") && (computer_position == "바위")) {
        console.log("당신이 이겼습니다!")    
    }
    else if(user_position == "그만"){
        console.log("게임이 끝났습니다.")
        break
    }
    else {
            alert("다시 입력하세요")   
    }
    console.log("당신:", user_position);
    console.log("컴퓨터:", computer_position);
    console.log("");
    game_count++;
}


    


