// react
// 페이스북에서 만들었고, 페이스북에서 제공해주는 라이브러리임

// 리액트의 데이터 구조는 단방향 데이터 흐름을 가지고 있다.

// 리액트의 랜더링
// 리액트는 view 즉 보여주는거에 집중된 라이브러리

// 가상돔을 가지고 있다가
// 1. 변화가 일어나면 변화된 버전의 돔으로 바꿔줌
//    데이터가 업데이트되면 UI를 가상돔에 리렌더링 한다.(다시 그려줌)
//    그니깐 하나에 index.html을 가지고 여러 가상돔을 가진 js를 다 출력해줌(하나의 페이지를 여러페이지 처럼 쓸수있게 해줌)
// 2. 가상돔끼리 비교
//    변화 전의 가상돔과 변화된 가상돔을 비교해서
//    비교했을때 바뀐 부분만 실제 돔에 리렌더링 해서 적용한다.

// 리액트의 장점
// 일단 유명하고 많이 사용한다.
// 바닐라자바로만 개발할때보다 편안하고 스크립트에서 DOM태그를 다루기 쉽다.
// 재활용성이 높다.
// 불편하게 태그 선택자를 사용할 일이 적다.
// html과 js파일이 많아질수록 관리하기 힘든 부분을 보완
// 새로고침하지 않고 페이지를 동적으로 보여줄수 있다(모바일 앱처럼)
// 다른 페이지로 이동한것 처럼 눈속임할수있음
// 바닐라자바가 가지고 있는 문제를 해결하기 위해 만들어졌다.(태그선택자를 일일이 사용해야 하는 등의 문제점)
// JSX를 사용해서 html과 js를 합친 컴포넌트로 만들수 있고, 태그의 이름을 자유롭게 지을수 있다.
// html파일과 js파일을 따로 만들 필요가 없다. 모든 파일을 js파일로만 만들 수 있다.
// JSX는 문자열도아니고 html도 아닌 javascript XML 웹 응용 프로그램의 구조를 만들기 위한 표준 마크업 언어를 확장한 문법.

// 리액트 설치 명령어
// npx create-react-app 여기에 하고싶은 폴더 이름을 정해주면됨.

// src 폴더 에 가보면 index.js와 app.js가 있는데
// 여기서 app.js가 컴포넌트이다. index.js에서 이걸 가져와서(import) 보여주고(render) 있다.
// 그리고 컴포넌트는 하나의 부모 태그로 무조껀 감싸서 반환해줘야 한다.
// app.js는 html과 js를 합쳐놓은 컴포넌트
// document.getElementById('root')이게 리액트가 동적으로 내용을 render해줄 위치
// ReactDOM.createRoot -> 시작점 생성
// ReactDOM.createRoot(첫번째 인수로 render해줄 컴포넌트, render할 위치)

// public 폴더는 정적폴더
// 여기에 있는 index.html 을 사용하는거고 이 안에 html DOM 인 id 가 'root'인 div 태그가 하나 존재한다.
// 그안에 react를 사용해서 계속해서 내용들을 바꿔서 render 해준다.
// 원래는 다른 페이지로 이동할때마다 html, css, js 파일 다 따로 불러왔었는데
// react를 사용하면 그럴 필요가 없다. 새로고침도 필요없다

// 편리한 익스텐션
// es7+react/redux/graphQL/react-native snippents -> 이게 익스텐션 이름임
// 우리가 리액트로 작업을 하면서 리액트 키워드를 사용할수 있게 도와준다.
// rafce 같은 자동완성 사용가능

// 이번달 달력만 만들기 주말은 빨간색 글자 평일은 검정색 글자