let computer_nubmer_array = [];
let available_number_array = [0,1,2,3,4,5,6,7,8,9]

function random_numberArr_machine(){
    while(computer_nubmer_array.length<3){
        let computer_number = (Math.floor(Math.random()*10));
        if (computer_nubmer_array.includes(computer_number)){
            let position = computer_nubmer_array.indexOf(computer_number)
            computer_nubmer_array.splice(position,1)
        }
        computer_nubmer_array.push(computer_number)
    }
}

let coin = prompt("최대 몇판으로 설정하실?")
random_numberArr_machine()
for (let i = 1; i<=coin; i++){
    console.log("<"+i+"번째판"+">")
    let strike = 0
    let ball = 0
    let user_number_array = [];
    while(user_number_array.length<3){
        let user_nubmer = Number(prompt("0~9까지 숫자중 하나 입력"));
        if (user_number_array.includes(user_nubmer)){
            alert("중복숫자임 다시입력하세요")
            let position = user_number_array.indexOf(user_nubmer)
            user_number_array.splice(position,1)
        }
        user_number_array.push(user_nubmer)        
        if (!(available_number_array.includes(user_nubmer))){
            alert("0~9숫자중 하나로 다시 입력하세요!")
            user_number_array.pop()
        }
    }  

    for(let i =0; i<3; i++){
        let compare = computer_nubmer_array.indexOf(user_number_array[i])
        if (compare == i){
            strike+=1
        }
        else if (compare == -1){
            continue;
        }
        else{
            ball+=1
        }
    }

    alert("입력값: "+user_number_array+" <결과: "+strike+"스트라이크, "+ball+"볼"+">")
    console.log(strike+"스트라이크"+ball+"볼")
    console.log("컴퓨터숫자:"+computer_nubmer_array)
    console.log("유저 숫자:"+user_number_array)
    console.log("")

    if (strike == 3){
        alert("홈런, 유저승")
        console.log("홈런, 유저승")
        break
    }
    if (i == coin){
        alert(coin+"판 다끝남!")
        console.log("판수 소진으로 인한 패배")
    }
}

/*
-숫자야구게임 만들기
(1)컴퓨터는 임의의 숫자 3개 낸다. 0~9
(2)유저는 숫자 0~9까지 숫자 3개를 아무거나 내서 컴퓨터가 낸 숫자를 추측한다.
만약 컴퓨터가 1 2 3 을 내고 내가 7 8 9 를 내면 숫자와 자리가 모두 다르니깐 바로 아웃.
만약 컴퓨터가 4 5 6 을 내고 내가 5 7 9 를 내면 숫자는 1나맞지만 자리가 다르니깐 1볼
만약 컴퓨터가 1 2 3 을 내고 내가 1 2 4 를 내면 숫자 1 2 가 맞고 자리도 맞으니깐(인덱스 위치가 맞음) 2 스트라이크
만약 컴퓨터가 1 4 7 을 내고 내가 4 5 7 를 내면 1스트라이크 1볼
기회 횟수는 내가 설정
*/