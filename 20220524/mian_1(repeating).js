// document.write(1);
// document.write(2);
// document.write(3);
// document.write(4);
// document.write(5);
// document.write(6);
// document.write(7);
// document.write(8);
// document.write(9);
// document.write(10);

//반복문
// for(변수 선언문 or 할당문; 조건식; 증감식){
//     조건식이 참인 경우 반복 실행녀석들..
// }

// for (let i = 0; i <= 10; i++) {
//     console.log(i);
//     document.write(i);
//     document.write("<br>")
// }
// console.log("")

// //1부터 100까지 합
// let res = 0;
// for (let i = 1; i <= 100; i++) {
//     res += i;
// }
// console.log(res);
// console.log("")


// for (let i = 0; i <= 10; i++) {
//     if (i == 2) continue; //i==2면 건너뛰어라
//     console.log(i);
// }
// console.log("")


// for (let i = 5; i >= 0; i--) {
//     console.log(i);
// }
// console.log("")

// for (let i = 0; i < 3; i++) {
//     for (let k = 0; k < 3; k++) {
//         console.log(i, k);
//     }
// }
// console.log("")

// //구구단 만들기
// let result;
// for (let a = 2; a <= 9; a++) {
//     console.log(a + "단")
//     for (let b = 1; b <= 9; b++) {
//         result = a * b
//         console.log(a + "x" + b + "=" + result)
//     }
//     console.log("")
// }

//기본적으로 무한루프
//종료조건이 있어야 된다.

// let number = 0;
// while(true){
//     number++;
//     console.log(number);
//     if(number==10)break;   
// }

let number = 0;
while(number<10){
    number++;
    if(number %2 !=0)continue; //홀수면 건너뛰어라 (2로 나눴을때 나머지가 0이 아닌걸 건너뛰어라)
    console.log(number);
}

document.write("별모양1");
document.write('<br>');
for(let i = 0; i<5; i++){
    for(let k = 0; k<=i; k++){
        document.write('*');
    }
    document.write('<br>');
}
document.write('<br>')

document.write("별모양2");
document.write('<br>');
for(let i = 0; i<5; i++){
    for(let k = 1; k<=i; k++){
        document.write('\u00A0');
    }
    for(let h = 5; h>i; h--){
        document.write("*")
    }       
    document.write('<br>');
}
document.write('<br>')

document.write("별모양3");
document.write('<br>');
for(let i = 0; i<5; i++){
    for(let h = 4; h>i; h--){
        document.write("\u00A0")
    }       
    for(let k = 0; k<=i; k++){
        document.write('*');
    }
    document.write('<br>');
}
document.write('<br>')


document.write("별모양4");
document.write('<br>');
for(let i = 5; i>0; i--){
    for(let k = 0; k<i; k++){
        document.write('*');
    }
    document.write('<br>');
}
document.write('<br>')
