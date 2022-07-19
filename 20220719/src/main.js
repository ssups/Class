// mysql 프로젝트에 연결

// mysql과 mysql2의 차이점
// mysql은 콜백 기반이기 때문에 promise를 사용하지 못하기 때문에 mysql2를 쓸거고
// mysql을 보안한다하면 promise-mysql을 설치해서 사용해야 한다.
// mysql2는 promise를 지원하기때문에 바로써도 된다.

// mysql npm 설치 명령어
// ===============================
// npm i mysql2
// ===============================

// mysql2 모듈을 require 함수로 가져온다.
const mysql = require('mysql2');

// createConnection 옵션
// host: 연결할 호스트를 나타냄
// port: 연결할 포트
// user: 사용자의 이름
// password: 사용자 비밀번호
// database: 연결할 데이터 베이스 이름
// debug: 디버그 모드를 사용할 것인지.

const temp = mysql.createConnection({
  user: 'root',
  //   host: '127.0.0.1',
  //   port: 3306,
  password: '!!Min159357',
  database: 'test4',
});

// 내맥은 localhost가 6자리 아이피로 인식해서 host에서 직접 localhost ip를 입력해주는 방식을 쓰던가 (host:'127.0.0.1')
// 터미널에서  sudo vim /private/etc/hosts 입력후 편집으로 ::1 localhost 라고 적혀져있는 줄을 주석처리해야 해결이 된다.
// 현재는 밑의방법으로 해결해논 상태이다.

// database: 'test4' = test4 이름의 데이터베이스를 사용하겠음
// query함수의 첫번째 매개변수는 쿼리문을 입력해주고
// 두번째 매개변수는 콜백함수 매개변수는 첫번째 쿼리 에러, 두번째 쿼리 결과
// 이후 등등
temp.query('SELECT * FROM posts', (err, res) => {
  if (err) {
    console.log(err);
    console.log('안됨');
  } else {
    console.log(res);
  }
});

const http = require('http');

const server = http.createServer((req, res) => {
  req.statusCode = 200;
  res.write('123');
  res.end('456');
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log('port: ', PORT);
});
