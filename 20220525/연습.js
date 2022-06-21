let lottoNumber2 = [];

function random_number_machine(){
     random_value2 = Math.floor(Math.random() * 46);     
}

while(lottoNumber2.length < 6){
    random_number_machine()   
    
    if (lottoNumber2.includes(random_value2)){
        //console.log("중복발생")
        position = lottoNumber2.indexOf(random_value2) // 중복되는 숫자 위치
        lottoNumber2.splice(position,1)
    }  
    lottoNumber2.push(random_value2)     
}

console.log(lottoNumber2)