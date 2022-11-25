// 솔리디티 버전
pragma solidity ^0.8.15; //버전

// Helloworld 컨트렉트
contract HelloWrold{
    string text;
    constructor() {
      text = "Hello World!";
    }

    function getText() public view returns(string memory) {
        return text;
    }
    function setText(string memory value) public {
        text = value;
    }
}

// 솔리디티코드 컴파일 라이브러리 설치
// npm i solc

// 컴파일 명령어
// npx solc --bin --abi [파일경로]
// 실행시키면 abi 파일이랑 bin파일 생성됨

// abi 파일은 스마트컨트렉트 안에 매개변수나 함수들을 json형식으로 나타낸 리스트
// 함수를 호출하거나 데이터를 호출해서 받을수 있다.
// 실제로 스마트 컨트렉트 안에서는 바이트 코드로 변환되어서 담긴다.abi

// bin 파일에는 컴파일된 바이트 코드 내용이 담겨있다. 

// EOA, CA(contract address) 이렇게 두가지가 있는데
// EOA는 개인키를 가지고 트랜젝션을 생성하고 서명하는것이다.abi
// CA는 개인키가 없고 트랜젝션 응답으로만 트랜젝션을 실행할수 있다.abi

// CA안에 스마트컨트렉트 내용이 담겨져 있다.
// CA에 있는 코드 해시값을 통해서 스마트컨트렉트 코드에 접근이 가능하다.   
// CA라는건 스마트 컨트렉트가 배포되어있을때 생긴다.
// 스마트컨트렉트를 배포해서 생긴 CA를 조회해서 contractAddress를 사용
// CA에 있는 정보를 가지고 조회가 가능하다.

// Contract Address는 스마트 컨트렉트 안에 작성된 함수나 변수를 호출해서 값을 가져올때
// 사용하고 스마트 컨트렉트에 접근하기 위해서는 CA 값이 있어야 한다.

