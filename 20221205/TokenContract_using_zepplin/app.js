// 전에 만든 ERC20 토큰 편하게 만들어보기
// 오픈 제플린을 사용해서 토큰의 표준 인터페이스를 가져와서 사용할수 있다.
// ERC20을 우리가 직접 만들어 봤는데 직접만들어서 사용하는게 아니고
// 설치 받아서  편하게 사용해보자
// 표준 규격이 있따고 했는데 그렇기 떄문에 이미 만들어놓은거 가져다가 사용하면됨.

// 오픈 제플린 설치
// npm i -y
// npm install openzeppelin-solidity
// node_modules 안에 openzepplein 폴더 안에 contracts 폴더 안에 형식 들어가있음

// 트러플 초기화
// npx truffle init
// truffle-config.js 파일 수정

// contracts 폴더에 토큰컨트렉트파일이랑 EthSwap.sol 파일 만들고

// migrations 폴더에 2_deploy_EthSwap.js 만들고 작성

// npx ganache-cli --chainId 7722 --netwrokId 7722
