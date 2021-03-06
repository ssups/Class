// @ts-check
// 대망의 node.js
// ndoe.js가 뭔가
// 자바스크립트를 써서 데이터베이스에 연결해 서버로 요청을 보내는 기능을 구현할 수 있다.
// node.js는 크롬 V8 자바스크립트 엔진으로 빌드된 자바스크립트 런타임이다.
// node.js를 웹서버 자체로 생각하는건 잘못된것 아파치 같은 웹서버중 하나가 아니다.
// 자바 스크립트로 브라우저가 아니라 서버에서 자바스크립트가 동작하도록 도와주는 런타임 플랫폼이라고 생각하면 된다.

// 2009년에 라이언 달 이라는 개발자가 node.js를 처음 만들었고, 지금까지도 업데이트가 잘되고 있다.
// node.js를 설치해서 실행한다고 웹서버가 실행되는게 아니고 node.js에 있는 라이브러리를
// npm(node package manager)를 이용해 설치하고 사용할 수 있다.

// node.js의 특징 4개
// ================================================================
// 1. 자바스크립트로 백엔드 서버 로직을 개발할 수 있다.(장점)
// 2. 구글에서 개발한 js엔진을 쓰기 때문에 속도가 빠르다.(인터프린터 방식)
// 3. 논 블로킹 방식 node.js의 모든 API는 비동적으로 작동하며 호출 후 다른 API를 바로 불러올 수 있다.
//    한번 불러왔던 API를 요청하면 이벤트 루프가 확인해서 동작
// =================================================================================

// node.js가 왜 생겼냐면
// 방대한 오픈소스 생태계를 구축하기 위해서
// npm(node package manager)를 사용해서 패키지들을 다운받을 수 있고,
// 리액트, 일스프레스, 코아 이런 익숙한 것들의 패키지들은 다 npm에 등록되어있다.
// 특수한걸 만드는 사람이 아닌이상 거의다 기능이 이미 나와있는 것들이 많다.
// 잘쓰면 빠르고 좋은 효과를 볼수있다.

// 모듈
// 패키지는 클래스의 묶음, 패키지의 모임이 모듈
// 기능들의 모임, 파일의 모임

// require를 많이 사용할거
// node.js의 require가 무엇인가?

// node.js에서 모듈을 가져오는 방법 require함수를 사용해서 가져온다.
// require(경로나 이름)
const http = require('http');

// http객체 안의 createServer함수를 사용해서 서버를 만듬
// http.createServer를 변수에 담으면 서버가 되는 부분을 반환받을 수 있다.
const server = http.createServer((req, res) => {
  // req 요청값
  // 404 500 이런 오류들
  // http에서 ok를 나타내는 번호가 200번이라서
  req.statusCode = 200;
  // http 상태 코드
  // 100번때: 정보응답
  // 200번때: 성공응답
  // 300번때: 리다이렉션 메시지, 요청한 url이 변경됏을때
  // 400번때: 클라이언트상의 오류, 클라이언트에 오류가 있을때
  // 500번때: 서버 오류 응답, 서버에 오류가 있을때
  // write함수-> 문자를 싸서 보내주는 함수
  res.write('123');
  // end함수-> 끝맺음 매개변수 문자를 보내주면서 끝
  res.end('456');
});

const PORT = 3000;

// 서버가 되는 server에 함수를 사용한다. 서버를 열어줌
// listen함수로 서버를 열어줌
server.listen(PORT, () => {
  console.log('port: ', PORT);
});
// server 객체의 준비가 되면 listen 함수로 해당 포트에 서버를 대기시킨다.
// 서버를 대기시키는 이유는 클라이언트에서 요청이 오면 서버가 받아서 처리할 수 있다.
// 여기 들어가는 매개변수는 (포트번호, 호스트의 이름, 백 로그, 콜백 함수)이렇게 있다.

// node.js 실행하는법
// 터미널 창에서 node치고, 자바스크립트 파일의 경로 입력
// 크롬들어가서 주소창에 localhost:포트이름 써주면 됨

// node.js코딩을 해볼수 있는 곳 테스트용 코드들
// 코드 샌드박스, giltch 등등
// 노드 서버를 바로 볼수 있고, 코딩도 바로바로 테스트 해볼 수 있다.

// glitch 장점
// https 검증도 되어있는 웹 서버를 테스트로 사용해 볼수있다.
// node 프로젝트 생성버튼을 누르고
// server.js에 서버 로직을 작성한 후 바로
// preview 버튼을 눌러서 위에 버튼은 바로 그 창에서 화면을 볼 수 있고
// 테스트용 링크가 필요하면 preview버튼 눌렀을때 preview in a new window이 버튼을 누르면
// 클라이언트 요청을 보내볼 웹서버 주소로 접속이 된다.
// 그래서 테스트에 용이하게 사용할 수 있다.

// node.js 버전관리
// 버전관리 하는 방법 서버노드는 최신인데 로컬노드가 구버전이면
// 최신버전 기능이 있는데 구버전에 없을 경우에 기능이 실행되지 않음
// 이런 버전 문제가 생겼을 경우 해결해주는 아이 물론 우리가 조작을 해줘야한다.
// 삭제했다 깔았다하면 쉬운데 귀찮으니깐
// nvm(node version manager)
// 맥에서는 tj/n()을 사용해서 더 쉽게 할 수 있음(찾아보기)

// node 버전 바꾸는법
// sudo n 버전이름
// ex) sudo n 16.15.1
// nvm으로 바꾸는법
// nvm install 16.15.1 로 원하는 버전 설치하고
// nvm use 16.15.1 실행
// 가장 최신버전 쓸라면
// nvm use default
