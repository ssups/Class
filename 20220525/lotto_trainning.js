/*
과제
로또번호 생성기
1~45
6개의 숫자를 뽑아낸다.
힌트: 인덱스를 랜덤하게
*/

let lottoNumber = [];

function random_number_machine(){
     random_value = Math.floor(Math.random() * 45+1);     
}

while(lottoNumber.length < 6){
    random_number_machine()   
    
    if (!(lottoNumber.indexOf(random_value) === -1)){
        //console.log("중복발생")
        position = lottoNumber.indexOf(random_value) // 중복되는 숫자 위치
        lottoNumber.splice(position,1)
    }  
    lottoNumber.push(random_value) 
     
}
console.log("롯또넘버 6자리:",lottoNumber)


