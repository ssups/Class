//정규 표현식
//정규표현식은 문자 검색과 교체에 사용되는 패턴턴을 제공한다.
//자바스크립트에서 RegExp 객체의 문자 메서드를 조합해 정규변수로 사용할수있다. 

// box  변수에 box 태그를 선택자로 담아놓고
let box = document.querySelector('.box');

//box의 innerHTML 안녕하세요를 대입
box.innerHTML = "안녕하세요.";

// let rge = new RegExp('안녕');

//RegExp는 두개의 매개변수 string | RegExp , flags?: string
//앞은 찾는 문자
//두번쨰는 플래그
//플래그는 정규표현식에 영향을 주는 옵션

//플래그의 종류에는

//i : 대소문자 구분 없이 구별 할수 있다. A , a

//g : 패턴과 일치하는 모든 것을 찾는다. g가 없으면 일치하는 것에서 첫번째것만 가져온다.

//m : 다중 행모드 줄이 내려져있어도 찾아온다.백틱 같은걸로 행차이가 있어도

let string = "안녕하세요";
//문자열 함수 match("찾는 문자열 , "플래그")
// box.innerHTML = string.match(".")

let string2 = "하하하하하하하하하하하"

// 슬래시는 "/"자바스크립트에서 정규표현식을 생성하고 있다는것을 알려주는것이다.
// 문자열에 따음표를 쓰는것과 같다.

// g플래그 사용
box.innerHTML = string2.match(/하/g)
// g 는 패턴과 일치하는 모든 문자를 찾는데 콤마로 구분

// 정규식을 사용하는 이유는 

// 이메일인지 체크하는 정규식

// i 플래그 사용
// i 는 대소문자 구별 없이 문자를 찾는다.
let str = "나는 abC플래그, 나는 문자열"

let str2 = str.match(/abC/i)

//찾은 문자열을 배열의 형태로 담아 둔다.
console.log(str2)
console.log(str2[0])

console.log(str2.length)


box.innerHTML = str2
// let name = prompt("이름을 적으세용")
let str11 = "나는 웹 개발자 한결"

let str12= []
str12.push(str11.match(/나는 /g))
str12.push(str11.match(/웹 /g))
str12.push(str11.match(/개발자 /g))
str12.push(str11.match(/한결/g))


box.innerHTML =str12[0]+str12[1]+str12[2]+str12[3]
// 나는 웹 개발자 본인 이름
//
// 나는 웹 개발자
// box.innerHTML = 본인이름

//편하게 바꿔보기
// name2에 box.innerHTML 넣으면 내용은 "나는 웹 개발자 본인 이름" 이렇게 들어있고
// 해당 문자열을 찾아서 바꿔주는 편리한 아이 (replace);
// replace(정규식 생성, 찾은 문자열 바꿔줄 문자)
let name2 = box.innerHTML;
name2 = name2.replace(/한결/g,"고난")
box.innerHTML = name2

// replace를 사용해서 바꿔보았는데.
// replace의 두번째 매개변수에 특수문자를 입력하면 특수한 방법으로 문자열을 교체 할수 있다

// 특수한 방법에는 
// $&   패턴과 일치하는 부분의 문자열
// $`   일치하기 전의 문자열의 일부를 대입
// $'   일치한 후 문자열의 일부를 대입

let name3 = box.innerHTML;
box.innerHTML = name3.replace(/개발자/g,"$' 집에 가고싶다");

//이제 해보기
//1. input을 2개 만들고 하고싶은일, 이름 (입력받는거는 버튼으로 처리) 총 버튼 두개
//2. 두개의 box안의 내용이나 콘솔에 나오고
//3. 교체버튼을 누르면 바뀌기
//4. 뒤에 이름 뒤로 하고싶은일 대입 (두개의 위치를 바꿔보기 이름이랑 하고싶은일)
//5. 다한 사람은 이름이랑 하고싶은일 사이에 시간도 넣어 보세요
