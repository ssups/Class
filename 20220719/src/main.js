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

// database: 'test4' = test4 이름의 데이터베이스를 사용하겠음
// query함수의 첫번째 매개변수는 쿼리문을 입력해주고
// 두번째 매개변수는 콜백함수 매개변수는 첫번째 쿼리 에러, 두번째 쿼리 결과
// 이후 등등
temp.query('SELECT * FROM products', (err, res) => {
  if (err) {
    // console.log(err);
    console.log('에러');
    const sql =
      'CREATE TABLE products(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(20), number VARCHAR(20), series VARCHAR(20))';
    temp.query(sql);
  } else {
    console.log(res);
  }
});

const http = require('http');

const server = http.createServer((req, res) => {
  req.statusCode = 200;
  // res setHeader() 함수를 사용해서 해더의 정보를 설정할 수 있다.
  // utf-8로 컨텐츠 내용을 인코딩하는 속성을 추가한다면.
  res.setHeader('Content-Type', 'application/json', 'charset = utf-8'); // 한글이 안깨지도록 하는거;

  // 요청된 url 확인
  // req.url

  // 요청된 method 확인
  // req.method

  // js 내용이 수정되었을때 자동으로 모니터링 해서 서버를 재시작 해주는 툴
  // nodemon 노드모니터링
  // nodemon 설치 명령어
  // =======================================================
  // 개발환경에서만 사용할꺼니깐 --dev 붙여주고
  // npm install --dev nodemon
  // npm install -g nodemon
  // =======================================================

  const URL = req.url;
  switch (URL) {
    case '/':
      res.end('메인 페이지');
      break;

    case '/list':
      temp.query('SELECT * FROM products', (err, data) => {
        if (err) {
          console.log(err);
        } else {
          // data에는 products 테이블의 내용
          res.end(JSON.stringify(data));
        }
      });
      break;

    case '/add':
      // (name, number, series) VALUES(?,?,?) 작성하면 이렇게 벨류의 값을
      // 두번째 배열 타입의 매개변수로 추가할 수 있다.
      // eslint-disable-next-line no-case-declarations
      const sql = 'INSERT INTO products (name, number, series) VALUES(?,?,?)';
      temp.query(sql, ['이름', '123', '123']);
      break;

    case '/mypage/modify':
      res.end('마이페이지 수정');
      break;

    default:
      break;
  }
  console.log(req.url);
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log('port: ', PORT);
});
