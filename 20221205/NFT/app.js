// ERC20 토큰을 사용해봤고 NFT를 발행할때는
// ERC721 토큰을 사용해서 민팅한다.

// ERC20토큰은 같은 토큰끼리 서로 대체가 가능한데
// ERC721 토큰은 각각 토큰마다 고유값, 토큰의 소유자가 명시되어있기 떄문에 서로 대체가 불가능하다

// Remix
// 스마트 컨트렉트를 쉽게 작성하고 배포하게 도와주는 툴

// 트러플 초기화
// npx truffle init
// @remix-project/remixd 설치
// npm i -g @remix-project/remixd
// contracts 폴더로 이동해서
// remixd -s . --remix-ide https://remix.ethereum.org  실행(remix 사이트랑 contracts 폴더랑 연결)
// https://remix.ethereum.org 사이트 접속 defualt_workspace 버튼 누르고 localhost 로 바꿔주면 연결됨

// 오픈제플린 설치
// ERC721 토큰 표준 사용하기 위해서
// npm i openzeppelin-solidity
