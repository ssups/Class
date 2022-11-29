 // SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Test2{
        uint256 public value;
        address public owner;

        constructor(uint256 v){
            value = v;
            owner = msg.sender; // 처음에 배포할때 실행한 사람의 EOA
        }

        // msg.sender
        // 이후 컨트렉트 실행시킨 사람의 계정 EOA
}