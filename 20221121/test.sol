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
// 