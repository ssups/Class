// crypto
// 암호화

// 단방향 양방향 암호 방식
// 단방향은 복호화를 통해서 원래의 값을 알수 없고,
// 양방향은 복호화해서 원래의 값을 알수있다.

// 네이버같은 페이지만 봐도 비밀번호 찾기를 시도할시
// 비밀번호를 알려주지 않고 비밀번호 변경을 시켜준다.

// 복호화는 decoding 하는거
// 부호화는 incoding 하는거

// 요즘 사이트 비밀번호 찾기하면 비밀번호를 직접 알려주지 않고 비밀번호를 변경하라고 하는데
// 단방향 암호 방식이라서 그런거임.

// 단방향의 비교 검증 방법
// 데이터 베이스에 저장된 암호와
// 로그인 할때 입력받은 비밀번호를 단방향으로 암호화 시켜서
// 비교를 하면은 기존의 비밀번호는 저장되지 않고 암호화된 문자열로만 비교한다.

// 단방향 암호화는 해쉬 알고리즘을 사용해서 문자열을 고정된 길이의
// 문자열로 암호화 시킨다.

//  1241234랑 12312893782478488 둘의 길이가 다른데
// 해쉬 알고리즘으로 길이를 정해놓으면
// 둘다 정해진 길이의 암호로 암호화된다.

// crypto 모듈 가져오기

const { rejects } = require("assert");
const crypto = require("crypto"); // 내부에 이미 설치되어 있는 모듈
const pw = "2324214"; // 임이의 비밀번호

// 단순 해싱으로 비밀번호 해싱
// let hashAlgor = crypto.createHash("sha512");
// 사용할 해시 알고리즘은 sha512 암호 알고리즘을 쓸건데
// (md5, sha1, csha256, sha512 등이 있는데)
// sha512 알고리즘은 국가안보국(NSA)에서 설계한 암호 해쉬함수이다.
// sha512sms 512비트(64바이트) 해시값을 만들어 주는데
// 일반적으로 길이가 128자리인 16진수로 랜더링 된다.

// 선택된 알고리즘으로 해싱한다.
// let hashing = hashAlgor.update(pw); // 인수로 암호화 시킬 문자열 사용

// let hashStirng = hashing.digest("base64"); // 보여줄 인코딩 설정
// 인코딩할 알고리즘을 넣어준것이 base64
// digest함수를 사용해서
// 해싱된 객체를 base64를 통해서 문자열로 반환해준다
// console.log(hashStirng);

// 왜 이렇게 하냐.. 알고리즘으로 암호화하면 해커가 뚫기 힘듬
// 하지만 이렇게 해쉬 알고리즘만으로 암호화하면 같은 값이 들어갔을때
// 암호화된 문자열도 계속 같기 때문에 암호화의 효과가 좀 안좋다.

// 해커를 더 힘들게 하려면
// slat라는 기법을 써야한다.
// 암호화를 강하게 해준다.

// 복호화를 방해하기 위해서 단방향 암호화 salt를 쓰자.
// 비밀번호에 추가 문자열을 덧붙여서, 같은 비밀번호를 암호화 시키더라도 다른 해쉬 출력값을 가지게 한다.

// salt 값은 항상 비밀번호에 매번 추가시켜서 사용해야 하니깐
// salt값을 잘 보관해넣고 숨겨놓자. (ex.env파일에 보관)

// salt값을 만들어보자
// crypto의 랜덤 바이트 생성 함수를 통해서 랜덤한 바이트를 생성 시킬수 있다.
// 32바이트 이상이어야지 짐작하기 어렵다.
// randomBytes 함수가 랜덤한 바이트를 만들어주는 함수
// 인수 첫번째는 byteSize,
crypto.randomBytes(32, (err, byte) => {
    // 32bit 길이의 랜덤한 byte 생성
    if (err) {
        // console.log(err);
    } else {
        // console.log(byte);
    }
});

// crypto의 randombytes 함수로 salt값을 만들어서
// 데이터 베이스에 저장한후
// 모든 패스워드가 고유의 salt값을 가질수 있다.

// 이 기법과 또다른 보안을 강화시킬 수 있는 방법
// key stretching
// key stretching 은 salt와 패스워드를 해시 함수에 넣는 과정을 반복시켜
// 복호화의 계산량을 늘리고 값 출력을 임의적으로 느리게 만드는 방법이다.

// pbkdf, scrypto, bcrypto 이 세가지 방법 있는데,
// bcrypto가 많이 사용된다.

// pbkdf
// 해시함수의 컨테이너 역할을 하고
// 해시함수에 salt를 적용해서 해시함수의 반복횟수를 지정해서 암호화할수 있고,
// IOS 표준에 적밯하며 NIST에서 승인된 알고리즘이다.

// scrypto
// 얘가 좀 강력한 녀석인데
// 많은 메모리와 CPU를 잡아먹어서
// 과부하가 걸릴수 있다.
// 특히나 오프라인 공격에 강하지만 자원을 많이 써서 위험하다.
// OpenSSL 1.1 이상을 제공하는 시스템에서만 사용할수있다.
// 주어진 자원에서 공격자가 사용할수 있는 병렬 처리양이 한정되어 있다.

// bcrypto
// 보안에 집착하기로 유명한 OpenBSD에서 사용하고
// .NET 및 자바를 포함한 많은 플랫폼 언어에서도 사용할수있다.
// 반복횟수를 늘려 연산속도를 늦출수 있어서 연산능력이 증가해도
// 공격에 대비를 할수있다.
// 암호화된 stirng중에서 일부분을 salt로 쓰고 있어서
// 그 데이터를 얻어온후에 pw와 같이 보내서 비교한다.

// pbkdf

crypto.randomBytes(32, (err, byte) => {
    crypto.pbkdf2(
        pw, // 해싱하려고 한 문자열 (패스워드)
        byte.toString("base64"), // 문자열로 변환하는데 인코딩 방식은 base64
        1000, // 반복횟수를 지정, 반복횟수가 많아질수록 복호화하기 어려워 지는데 시간도 많이 걸린다.
        64, // 길이를 설정
        "sha512", // 암호화 알고리즘 설정
        (err, hashed) => {
            // 마지막은 콜백 함수
            // console.log(hashed);
        }
    );
});

// slat 값을 만들어주는 함수
const createSalt = () => {
    // 암호화를 처리하는데 시간이 걸리기 때문에
    // Promise를 사용해서 비동기 처리를 한다.
    return new Promise((resolve, reject) => {
        // 랜덤 바이트 생성길이는 64
        crypto.randomBytes(64, (err, byte) => {
            console.log(byte.toString("base64"));
            if (err) {
                // 실패시 err 값 반환
                reject(err);
            } else {
                // 성공시 resolve 함수로 반환
                resolve(byte.toString("base64"));
            }
        });
    });
};

// 비밀번호를 해싱해주는 함수
const pwHashed = (userId, password) => {
    // Promise를 사용해서 비동기 처리를 한다.
    return new Promise((resolve, reject) => {
        // 유저 테이블에서 user_id 값이 있는지 확인
        const sql = "SELECT * FROM users WHERE user_id=?";
        client.query(sql, [userId], async (err, result) => {
            if (result[0]?.salt) {
                // 해당 유저 아이디에 대응되는 salt값이 있으면 그 값을 가져온다 (salt값은 암호화할때마다 바뀌기때문에 가져와서 비교하고)
                // (비밀번호값은 같은 값을 암호화하면 같은 결과갑을 가지기때문에 입력값을 다시 암호화시켜서 비교한다)
                const salt = await result[0].salt;
                // pdkdf2 암호화를 하는데 해싱 알고리즘은 sha512
                // 길이: 64, 반복횟수: 1000
                crypto.pbkdf2(
                    password,
                    salt,
                    1000,
                    64,
                    "sha512",
                    (err, key) => {
                        if (key.toString("base64") === result[0].password) {
                            resolve(key.toString("base64"));
                        } else {
                            reject("첫번째err");
                        }
                    }
                );
            } else {
                reject("두번째err");
            }
        });
    });
};
const createPwHashed = password => {
    // 비동기처리
    return new Promise(async (resolve, reject) => {
        const salt = await createSalt(); //여기서 salt값을 만들고
        // 여기서 33244 만큼 반복시키는 key stretching
        // 비밀번호에 문자를 더해서 암호화시키는 기법 salt 사용
        // 여기서 salt는 랜덤값이다
        crypto.pbkdf2(password, salt, 1000, 64, "sha512", (err, key) => {
            if (err) {
                reject("err");
            } else {
                // 비밀번호 마다 고유의 salt 값을 가지고 있게 하기 위해서
                // 암호화한 비밀번홍놔 salt 값을 둘다 데이터 베이스에 저장할꺼임
                resolve({ password: key.toString("base64"), salt });
            }
        });
    });
};

// 간단 암호화된 로그인 만들어 보자
// 모듈은 express, fs, mysql2

// express 열고, 데이터베이스 연결까지
// 데이터베이스 이름은 test8로
// express 에서 body 객체 사용할꺼임

const express = require("express");
const app = express();
const PORT = 4000;
const mysql = require("mysql2");
const fs = require("fs");

const client = mysql.createConnection({
    user: "root",
    password: "!!Min159357",
    database: "test8",
    multipleStatements: true,
});
// 테이블 만들기(1회성)
// const sql = `CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY,
//      user_id VARCHAR(255), password VARCHAR(255), salt VARCHAR(255))`;
// client.query(sql);

app.listen(PORT, () => {
    console.log(`${PORT}번 포트에 서버 열림`);
});

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    fs.readFile("view/join.html", "utf-8", (err, data) => {
        res.send(data);
    });
});
app.get("/login", (req, res) => {
    fs.readFile("view/login.html", "utf-8", (err, data) => {
        res.send(data);
    });
});

app.post("/join", async (req, res) => {
    const { password, salt } = await createPwHashed(req.body.user_pw);
    const sql = "INSERT INTO users (user_id, password, salt)VALUE(?,?,?)";
    client.query(sql, [req.body.user_id, password, salt], () => {
        res.redirect("/login");
    });
});
app.post("/login", (req, res) => {
    const { user_id, user_pw } = req.body;
    pwHashed(user_id, user_pw)
        .then(result => {
            res.send(result + "로그인 됐어요");
        })
        .catch(err => {
            res.send(err);
        });
});
