// 모듈로 내보내기
module.exports = {
  extends: ['airbnb-base', 'plugin:node/recommended', 'prettier'],
};

// 설정 해보자
// 미리 좋은 세팅들이 있으니까 쓰자

// 유명한 air bnb 설정 쓸거임
// https://github.com/airbnb/javascrip

// air bnb 패키지 설치 명령어
// =======================================================================
// npm install --save-dev eslint-config-airbnb-base
// npm install --save-dev eslint-plugin-import
// npm 패키지 두개를 동시에 다운받아야하면
// npm install --save-dev eslint-config-airbnb-base eslint-plugin-import
// =======================================================================
// --save-dev는 개발환경
// --save-dev로 받은건 devDependencies에 작성된다.
// 개발에만 필요하고 실제 구동은 필요 없는것들

// 그담에 eslint용 prettier을 또 다운받아 줘야함
// eslint prettier package 다운 명령어
// =======================================================================
// npm install --save-dev eslint-config-prettier
// =======================================================================

// prettier와 충돌이 나기 때문에 오류가 많이 뜨는데
// 위에 module.exports -> extends안에 prettier도 넣어주면 된다 그러면 두개 규칙이 같이 적용됨
// ESlint 규칙을 쓰기만 하면
// 나중에 면접가서도 eslint 사용할줄 알고요 에어비엔비 규칙성을 다룰줄 안다.
// 근데 이게 쫌 ... 지금까지 우리가 작업한거보다 좀 많이 깐깐하다.

// node에 대한 설정 -> node 전용 플러그인 설치를 통해
// node 전용 플러그인 설치 명령어
// =====================================================================
// npm install --save-dev eslint-plugin-node
// =====================================================================
// 교정할 js 파일 첫줄에 // @ts-check 쓰기(주석도포함)
// -->타입을 잡아주는 역할을 한다.
