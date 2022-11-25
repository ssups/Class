// 트러플을 사용해서 이더리움 디앱 개발을 쉽게 할수있다.
// 트러플은 Dapp 개발을 하는데 도와주는 블록체인 프레임워크이다.
// 블록체인에서 스마트 계약을 컴파일하고 배포할때 복잡한 구조를 추상화 시켜주는 역할을 한다.

// 트러플은 스마트컨트렉트를 쉽게 배포할수있게 도와준다.
// 트러플에서는 web3 라이브러리를 사용한다.

// npm init -y 로 팩제이슨 만들기

// 트러플 설치
// npm i truffle
// 트러플 버전 확인
// npx truffle version

// 트러플 초기값 설치(세팅)
// npx truffle init
// 이때 생성되는 .gitkeep 파일은 원래 깃이 커밋할때 빈폴더는 포함 안시키는데
// .gitkeep 파일이 들어가있는 폴더는 빈폴더라도 커밋할때 포함시켜줌

// 트러플 폴더들
// contracts: 스마트컨트렉트 코드를 작성하는 폴더
// migrations: 배포 관련 코드를 컨트렉트별로 모으는 폴더
//             여기에 속하는 파일들 즉 배포관련 코드를 작성한 파일의 이름은
//             번호(숫자)_내용_컨트렉트이름.js 형식으로 만들어줘야 한다.
// test: 스마트 컨트렉트 테스트 코드 작성하는 폴더
// truffle-config.js: 트러플 환결설정 파일이다. 컴파일하는 솔리디티 버전도 여기에 명시되있음.

// 스마트컨트렉트 코드를 컴파일
// npx truffle compile

// 컴파일된 파일로 스마트 컨트렉트 배포를 해주자
// 어떤 네트워크에 배포를 할지 설정을 해줘야하는데
// 설정파일 truffle-config.js를 수정해서 네트워크 설정을 해주면 된다.

// puppeth 경로가서:
// geth --datadir node --http --http.addr "0.0.0.0" --http.port 9000 --http.corsdomain "*" --http.api "admin,miner,txpool,web3,personal,eth,net" --syncmode full --networkid 12345 --port 30300 --ws --ws.addr "127.0.0.1" --ws.port 9005 --ws.origins "*" --ws.api "admin,eth,debug,miner,miner,net,txpool,personal,web3" --allow-insecure-unlock --unlock "0,1" --password "./node/password.txt"
// geth네트워크 실행
// truffle-config.js 파일에 네트워크에 devleopment 옵션 설정해주기

// migrations 폴더에 배포 관련 코드를 작성한 파일을 만들어주자

// 배포 명령어
// npx truffle migration
// 배포하고나면 build 폴더에 contracts 폴더 생성되면서 json 파일 생성됨

// 배포한 컨트렉트 확인
// 트러플 콘솔창을 사용해서 명령어로 확인
// 트러플 콘솔창 실행 명령어
// npx truffle console

// 배포한 컨트렉트 CA 확인 (트러플콘솔창에서)
// HelloWorld.address

// 배포된 스마트컨트렉트 트러플콘솔에서 실행
// HelloWorld.deployed().then(instance => hello = instance)
// hello 라는 변수에 배포된 HelloWrold 컨트렉트 인스턴스값 할당
// hello.address => CA
// hello.value.call() => value값(상태변수) 호출

// setValue 함수를 호출후 실행해서 트젝 발생시키고
// 마이닝으로 블록캐서 트젝 처리한뒤에 확인
// hello.setValue('변경값')
// 마이닝
// hello.value.call()
