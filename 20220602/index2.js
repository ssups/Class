//CSS 선택자

//태그 선택자
//div {color:red; } 이렇게 하면은 모든 div 선택자 컬러 레드
//p {color:black;} 모든 p 선택자 컬러 블랙

//ID 셀렉터
// #name { color: red; } 이렇게 쓰면은 id 어트리뷰트가 name인 선택자인 애들이 컬러 레드
//ID는 고유 이름만 가능

//클래스 셀렉터
//.content{color: red; } 클래스는 동일한 이름을 가질 수 있다.
//content 클래스를 가지고 있는 모든 요소에 컬러를 넣음

//어트리뷰트 셀렉터
//dive[href] {color: red;} -> div에 href를 가지고 있는 모든 요소에 컬러 적용
//div[target="_blank"] {color: red;} div에 target이 있는데, 그 타겟값이 "_blank"인 모든 요소에 컬러 적용

//자식 선택자
// .content. name{color: red;} -> content클래스의 자식요소로 name을 가지고 있는 요소들에 컬러 적용
// .content > .name {color: red;} -> content클래스의 자식요소인데 부모 바로 아래 자식요소 (첫번째 한개만) 적용

//형제 셀렉터
// .content + .content2 { color: red;} -> content클래스의 같은 레벨의 형제에 적용

//가상 클래스 셀렉터
//a: hover {color: red;} a에 마우스를 올렸을때 변하는 스타일
//input:focus {color: red;} input이 포커스 상태일때 변하는 스타일

//다수의 클래스 선택자
// .content.active {color: red;} content클래스도 가지고 있고, active클래스도 가지고 있는 요소만 적용
