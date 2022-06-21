/*
배열이란?
여러개의 값을 순차적으로 나열
사용빈도는 매우 높다
일반적인 배열은 인덱스로 빠르게 접근이 가능. 
but 요소를 삽입,삭제시 효율적이지 않음
자바스크립트에서의 배열은 해시 테이블로 구현된 객체다.
해시 테이블로 접근하는경우 일반적인 배열보다 퍼포먼스가 떨어진다.
but 요소를 삽입, 삭제의 경우 일반적인 배열보다 빠름
*/

//1.
const arrNum = new Array();
arrNum[0] = 1;
arrNum[1] = 2;
arrNum[2] ="배열" ;

console.log(arrNum);

const arrNum1 = new Array(1,2,3,"하하하하",'A');

console.log(arrNum1[0]);
console.log(arrNum1[3]);
console.log(arrNum1[1]);

//선언과 동시에 값 대입
const arrNum2 = [1,2,3,4,5,6,7,8,9]; //이방법을 주로 쓴다
console.log (arrNum2);

//빈배열
const arrNum3 = [];
arrNum3[0] = 1;
arrNum3[1] = 2;
console.log(arrNum3);

//빈배열
const arrNum4 = [];
for (let i = 0; i < 5; i++){
    arrNum4[i] = i + 1;
}
console.log(arrNum4)

for(let i = 0; i<arrNum4.length; i++){
    document.write(arrNum4[i]);
}

const arr = [1,2,3];
console.log("arr의 데이터: ", arr)
console.log(arr.length);

//현재 length 프로퍼티 값보다 작은 값을 할당하면 배열의 길이가 줄어듦
const arr1 = [1,2,3,4,5]; //length = 5
arr1.length = 3; //앞에 3가지 값 말고는 뒤에 다 날림
console.log(arr1)

//현재 length 프로퍼티 값보다 큰 값을 할당하면 배열의 길이가 늘어나고,
//빈칸엔 비어있다(값이 없음)라고 뜸
const arr2 = [2]; //length = 1
arr2.length = 3;
console.log(arr2.length)
console.log(arr2)

const arr3 = [1, ,3];
console.log(arr3.length)
console.log(arr3);

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




