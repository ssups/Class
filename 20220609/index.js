// //이벤트 함수 타겟
// //클릭의 event.target
// window.onclick =function(event){
//     // event.target은 이벤트가 발생한 요소
//     // event 태그의 이벤트가 담겨있다
//     console.log(event.target)
//     // 클래스가 무엇인지로 판단을 해서 이벤트를 적용시킬수 있다
//     if(event.target.classList.contains('_target')){
//         console.log('있어')
//     }
//     //클래스가 무엇인지 가져와
//     //조건문을 이벤트를 설정해 줄수 있다.
//     let _class = event.target.className;
//     switch (_class){
//         case "_target":
//             break;
//     }
// }

// //마우스의 현재 페이지에서의 위치 
// window.onmousemove = function(e){
//     //e.type 해당 이벤트의 타입이 무엇인지
//     console.log(e.type)
//     //e.pageX 문서 페이지의 상에서 마우스의 X좌표
//     console.log(e.pageX)
//     //e.pageY 문서 페이지의 상에서 마우스의 Y좌표
//     console.log(e.pageY)
// }

// _input.onkeydown = function(e){
//     //_input 여기에 이벤트는 keyboardEvent
//     //e.keyCode ascii코드 숫자로 보이고 영문키 각 엔터 컨트롤 알트 그리고 숫자 입력시 표기
//     console.log(e.code);
//     if(e.code == "Backspace"){
//         alert("백스페이스 누르지마!")
//     }
// }

//기본 동작을 취소하는 방법
// _btn.onclick = function (e){
//     // 기본 동작을 취소하는 함수 preventDefault
//     e.preventDefault()
//     //버블링 현상을 막는 방법 (이벤트 전파)
//     //stopPropagetion() 이벤트의 전파를 막는 함수
//     e.stopPropagetion();
// }
