// 오늘은 어제 스마트컨트렉트 자바스크립트 콘솔에서 배포를 했는데
// 자바스크립트 노드 환경에서 구현해볼것

// 자바스크립트로 스마트컨트렉트 배포

// 우분투에 .puppeth/node/keystore 폴더에
// personal.newAccount()함수로 계정을 생성할때마다 파일이 하나씩 만들어짐.
// 객체의 형태로 되어있고 암호화 되어있는 계정파일이라고 보면 된다.
// 단방향 암호화가 아니기 때문에 복호화를 통해서 개인키를 얻어내는게 가능하다.
// keystore안에있는 키파일을 복호화해서 개인키를 구할수있게 해주는 라이브러리
// keythereum 라이브러리를 사용하면 개인키를 받을수 있다.
// npm init -y 로 팩제이슨 만들고
// npm i keythereum

// 솔리디티파일 컴파일 위해서 solc 라이브러리도 설치
// npm i sloc

const keythereum = require("keythereum");
const path = require("path");

// key파일 안에서 주소 복사해와서 0x뒤에 붙여넣기 해서 address 에 할당
const address = "0xd066e1059db7ec8b9f722d99b50e6cac611dafe8";
// 밑의 경로는 키파일 들어있는 폴더의 상위폴더까지 경로
const dir = path.join(__dirname);

// 키파일의 계정정보 객체 만들기
const keyObject = keythereum.importFromFile(address, dir);
// importFromFile -> 계정정보 만들어주는 함수, 첫번재 인수로 계정address, 두번째 인수로 경로를 받는다

// 복호화해서 개인키 뽑기
const privateKey = keythereum.recover("1", keyObject).toString("hex");
// recover -> 복호화해주는 함수, 첫번째 인수로는 계정 비밀전호, 두번째 인수로 계정정보 객체
console.log("0x" + privateKey);
