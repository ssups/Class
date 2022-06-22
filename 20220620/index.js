// regexp의 test함수
// test함수는 일치하는 부분의 문자열이 있으면 true를 반환하고 틀리면 false를 반환한다
// 주로 쓰는곳 이메일 패스워드 아이디 형식검사

btn.onclick = function(){
    // input의 값을 val에 담고
    let val = input.value.replace(/\d/g,"").replace(/\s/g,"").match(/./g).join("_")
    console.log(val)
    // 검사식
    // 정규식 객체 생성 new RegExp(검사식,플래그) 
    // i는 대소문자 상관없이 찾는다.
    // let reg = new RegExp(val)
    // input value가 test가 맞는지 확인 test()함수로
    // 맞으면 ture 틀리면 false
    // console.log(input.value.match(val));
};

// let str = "this is true";
// let reg = /this/i;

// // match(정규식 객체) str 문자를 검사하다.
// // 문자열에 있는 함수
// // 맞는 문자 반환
// console.log(str.match(reg));
// // 정규식의 test 함수 사용
// // 정규식에 있는 함수
// // 식에 적합한지 확인해준다. (true, false)
// console.log(reg.test(str));

// // 문자 클래스들
// // 문자 클래스는 특정 문자의 특별한 표현이다.
// let str2 = "aa2a3a4a5__a6a7a8a913251325"

// // 모든 숫자
// // /\d/ 숫자를 검사하는데 플로그 g를 붙여서 모든 숫자를 검사
// let reg2 = /\d/g;

// console.log(str2.match(reg2))

// // join() 함수는 배열의 요소 하나하나를 합쳐서 하나의 문자열로 반환 해주고
// // join(매개변수) 매개변수를 넣으면 값과 값 사이에 구분자를 바꿀수있다.
// // 매개변수 문자로 바꿔준다.
// let num = str2.match(reg2).join();
// // join에 매개변수를 문자열로 추가하면 구분점을 그 문자열로 바꿀수 있다.
// let num2 = str2.match(reg2).join("");

// // str2.match(reg2).join(); 배열을 하나의 문자열로 반환해줬다. join()함수가
// // 구분점은 ,로
// console.log(num);
// console.log(num2);

// 문자 클래스 종류

// 1. \d 모든 숫자 : 0 ~ 9까지의 숫자

// 2. \s 공백 : 줄바꿈이나 공백 기호

// 3. \w 문자 : 단어에 들어가는 문자와 _(언더바)
// 라틴문자나 숫자 등 안되는 애들 (키릴 문자,힌디 문자는 X)

// 조금 간단한 실습
// 위에 있는 걸 사용해서 문자랑 숫자를 섞어서 쓰는데 
// 문자만 뽑아서 페이지에 보이거나 콘솔에 보이기
// 구분점은 _ 언버바로

// 문자 클래스의 반대
// 반대 클래스

// 1. \D : \d의 반대 숫자가 아닌것들

// 2. \S : \s의 반대 공백이 아닌 것들

// 3. \W : \w의 반대 단어 , 숫자가 아닌것들

// let br3 = "dsajfghkj12h3jkh21jksdhfjk123"
// //replaceAll함수는 해당되는 전체 문자 변환;
// // \/D\g 숫자가 아닌것들 전체
// console.log(br3.replaceAll("a",""))

// // 특별한 문자 클래스

// // .(점) : 줄바꿈 문자를 제외한 모든 문자 (\n)

// // 특수문자도 잡을수 있고 모든 문자를 그냥 줄바꿈 제외 다 잡는다.
// console.log("- _-안231".match(/./g))
// console.log("-_ -안231".match(/./g))
// console.log("-_-안231".match(/./g))
// console.log("-_-안231".match(/./g))

// // 문자 클래스 여러개 문자를 조건으로  검사
// // 조건식 해석 /w 첫글자 (문자나 숫자) \d (0-9까지 숫자) /s (공백 포함)
// console.log("zw z".match(/\w\d\s\w/))

// 수량 {몇 개}
// 숫자 갯수 3개 까지
console.log("123415234".match(/\d{3}/g))

//갯수 범위 
//{최소 갯수 , 최대 범위}
console.log("".match(/\d{2,3}/g))

//{최소 갯수,} 최소 갯수는 3개 이상이여야 하고 길이는 상관 없이 
console.log("123415234".match(/\d{3,}/g))

//세트 및 범위
//[]대괄호 안의 문자 또는 문자 클래스
//임의의 문자를 검색한다.

//세트 사용
//문자를 찾는데 A나Z가 앞에 있고 BC가붙은 문자
//gi 붙여서 모두 검색하고 대소문자 구분없이
console.log("ABCZBCXBC".match(/[az]bc/gi))

//범위 사용
// [0-9A-F]의 뜻은 0~9까지의 숫자 또는 문자 A~F까지를 찾는다는 뜻
// [0-9]이거는  \d와 같다.
// [a-zA-Z0-9_]이거는 \w와 같다.
console.log("ABCDE".match(/A[0-9A-F][0-9A-F]/))

//범위 제외
//[^0-9]\D : 숫자를 제외한 모든 문자 제외
//[^\s] :공백이 아닌 모든 문자

//숫자와 문자를 제외해서 abc를 제외한 문자가 나온다
console.log("abcd123.-".match(/[^\sA-Z]/gi));

// 과제 회원가입 페이지 이쁘게 만들고 
//1. 부트스트랩 사용하던지 CSS 사용하던지 이쁘게 만들고
//2. input에 회원가입 조건 추가해서 통과하면 수락되게(이름,전화번호,이메일)
//3. input에 쓴 값이 회원가입 조건에 충족하지 않으면
//4. 충족 되지 않은 이유 표시
