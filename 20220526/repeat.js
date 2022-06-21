let user_number_array = [];

function user_numbArr_machine(array){
    
    while(array.length<3){
        let user_nubmer = Number(prompt("0~9까지 숫자중 하나 입력"));
        if (array.includes(user_nubmer)){
            alert("중복숫자임 다시입력하세요")
            let position = array.indexOf(user_nubmer)
            array.splice(position,1)
        }
        array.push(user_nubmer)
    }
    
    return array
    
}

for (i=0; i<5; i++){    
    let user_number_array = [];
    user_numbArr_machine(user_number_array)
    console.log(user_number_array)
    }