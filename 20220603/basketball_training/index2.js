//컴퓨터의 스코어
let comScore = 0;
//플레이어의 스코어
let userScore = 0;

let turn = false;

//게임의 횟수
let gameCount = 10;
computer.disabled = true;

function userShoot() {
    if (turn) return; //turn이 true면 return으로 함수 종료
    let shootType = Math.random() < 0.5 ? 2 : 3; //참이면 왼쪽값(2) 거짓이면 오른쪽값(3)
    if (shootType === 2) {
        if (Math.random() < 0.5) {
            console.log("유저 2점 슛 성공");
            text2.innerHTML = "슛결과: 유저 2점 슛 성공";
            userScoreUpdate(shootType);
        }
        else {
            console.log("유저 2점 슛 실패")
            text2.innerHTML = "슛결과: 유저 2점 슛 실패";
        }

    }
    else {
        if (Math.random() < 0.33) {
            console.log("유저 3점 슛 성공")
            text2.innerHTML = "슛결과: 유저 3점 슛 성공";
            userScoreUpdate(shootType);
        }
        else {
            console.log("유저 3점 슛 실패")
            text2.innerHTML = "슛결과: 유저 3점 슛 ";
        }
    }
    textUpdate('컴퓨터')
    // 다 동작후 turn을 다시 ture로
    turn = true;
}

function comShoot() {
    if (!turn) return; //turn이 false면 return문으로 함수 종료
    let shootType = Math.random() < 0.5 ? 2 : 3; //참이면 왼쪽값(2) 거짓이면 오른쪽값(3)
    if (shootType === 2) {
        if (Math.random() < 0.5) {
            console.log("컴퓨터 2점 슛 성공")
            text2.innerHTML = "슛결과: 컴퓨터 2점 슛 성공";
            comScoreUpdate(shootType);
        }
        else {
            console.log("컴퓨터 2점 슛 실패")
            text2.innerHTML = "슛결과: 컴퓨터 2점 슛 실패";
        }

    }
    else {
        if (Math.random() < 0.33) {
            console.log("컴퓨터 3점 슛 성공")
            comScoreUpdate(shootType);
            text2.innerHTML = "슛결과: 컴퓨터 3점 슛 성공";
        }
        else {
            console.log("컴퓨터 3점 슛 실패")
            text2.innerHTML = "슛결과: 컴퓨터 3점 슛 실패";
        }

    }
    textUpdate('유저')
    gameCounting();
    turn = false; //다 동작후 turn을 false로
}

// document.querySelector("요소의 클래스(.classname) or 아이디(#idname)" or 어티리뷰트 선택자) 요소 선택자
//Id는 고유 하나만 존재하기 때문에 그냥 아이디 이름만 써도 된다
//user. -> document.querySelector("#user"). 둘이 똑같음
// document.getElementById

//addEventListener 첫 매개변수는 이벤트 타입을 문자열로, 두번째 매개변수는 이벤트 작동시 실행할 함수
user.addEventListener("click", function () {
    //user를 click클릭하면 실행되는 함수
    userShoot();
});

computer.addEventListener("click", function () {
    //user를 click클릭하면 실행되는 함수
    comShoot();
});

function userScoreUpdate(addScore) {
    userScore += addScore;
    console.log("유저 점수: " + userScore)
    document.querySelector('.user-score').innerHTML = userScore;

}

function comScoreUpdate(addScore) {
    comScore += addScore;
    console.log(`컴퓨터 점수: ${comScore}`)
    document.querySelector('.computer-score').innerHTML = comScore;

}

// text 갱신 하는 함수
function textUpdate(name) {
    text.innerHTML = `<${name} 차례>`; // name+"차례" 랑 같은 표현
    switch (name) {
        case "유저":
            computer.disabled = true;
            user.disabled = false;
            break;
        case "컴퓨터":
            computer.disabled = false;
            user.disabled = true;
            break;

        default:
            break;
    }
}

function gameCounting(){
    gameCount --;
    //게임 카운트 감소;
    shots.innerHTML = gameCount; //게임 카운트 감소를 shots에 넣는다.
    if(gameCount === 0){
        //게임의 승패를 보여주고
        if(comScore > userScore){
            text.innerHTML = "컴퓨터의 승리"
        }
        else if(comScore < userScore){
            text.innerHTML = "유저의 승리"
        }
        else{
            text.innerHTML = "무승부"
        }
        computer.disabled = true;
        user.disabled = true;
    }
}