// 소프트웨어 패키지 구성요소를 
// 전달하기 위한 표준 형식
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

contract HelloWorld {
    string public value; //value 상태 변수 만들고
    // public으로 상태 변수를 만든 경우
    // getValue가 자동으로 생성된다 -> getter 함수가 자동으로 생성.

    constructor(){
        value = "hi";
    }

    // 상태변수 set 함수 -> 상태변수 변경해주는 함수
    function setValue(string memory v) public {
        value = v;
    }
}