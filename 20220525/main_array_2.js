/*
배열의 다양한 method들
push(): 배열의 끝에 원한는 값을 추가한다.
pop(): 배열의 끝에 있는 값을 삭제
shift(): 배열의 첫번째 있는 녀석을 삭제
reverse(): 배열을 역순으로 배치
concat(): 두개의 배열을 합침
indexOf(): 배열에서 인수로 전달된 값 검색 -> 인덱스(값의 순서)를 반환
           배열에 인수로 전달한 요소의 중복되는 요소가 여러개가 있다면
           첫번째로 검색된 요소의 인덱스를 반환한다.
           만약 검색하려는 값이 없으면 -1 반환
splice(): 배열 중간에 데이터를 삽입 또는 삭제를 하는 경우 사용
*/
console.log("배열의 method")
const arr4 = [1,2,3,4,5,6,7];

arr4.push(4);
console.log("push 이후 arr4의 데이터: ", arr4)

arr4.pop(); //뒤에값 부터 날림
console.log("pop 이후 arr4의 데이터: ", arr4)

arr4.shift();
console.log("shift 이후 arr4의 데이터: ", arr4)

arr4.reverse();
console.log("reverse 이후 arr4의 데이터: ", arr4)

let arr5 = [1,2,3,4,5,6];
let arr6 = [10,20,30,40,50,60];
arr5 = arr5.concat(arr6); //arr4에다가 arr5를 합친거
console.log("concat 이후 arr5의 데이터: ", arr5)

const arr7 = [0,2,0,0,0,0,0,2,3];
console.log(arr7.indexOf(2));
console.log(arr7.indexOf(4)); //4라는 값이 없음으로 -1이 뜸
console.log(arr7.indexOf(2,4)); //4번째값 이후에 있는 2의 위치
//console.log(arr.indexOf(a,b)) //배열에서 b번째값이후에있는 a값의 위치


const foods = ['apple', 'banana'];
console.log(foods.indexOf('banana')) //바나나가 포함되어 있는지, 위치가 어딘지 찾는거
if(foods.indexOf('orange')===-1){ //만약 food라는 배열에 orange가 없으면
    foods.push('orange'); //food배열에 orange 라는 값을 마지막에 추가해라
}
console.log(foods)

if(!foods.includes('orange')){ //orange가 포함되어 있지 않다면
    foods.push('orange'); //food 배열에 orange 라는 값을 마지막에 추가해라
}

const numArr = [1,2,3,4];
const res = numArr.splice(1,2,30,40); //배열의 인덱스 1부터 2개의 요소를 제거, 그 자리에 30,40 넣는다
console.log(res); //제거되는 요소
console.log(numArr); //제가거 완료된것

const numArr1 = [1,2,3,1,2]
//배열에서 특정 요소를 제거하려면 indexOf 메서드를 통해
//특정 요소의 인덱스를 가져오고 splice 메서드를 사용
function remove(arr,item){  
    const index = arr.indexOf(item); //제거할 item 요소가 있는지 확인 제거할 요소가 여러개 있다면 앞순서부터 제거 
    if(index !== -1) arr.splice(index,1)//제거할 item이 있다면 
        ; //제거
    
    return arr;
}
console.log(remove(numArr1,2));

/*
과제
로또번호 생성기
1~45
6개의 숫자를 뽑아낸다.
힌트: 인덱스를 랜덤하게
*/

let lottoNumber = [];
let res1 = [];

for(let i=1; i<=45; i++){
    lottoNumber.push(i);
}
console.log(lottoNumber)