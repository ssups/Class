// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Voting{
    string[] public candidateList;
    mapping(string => uint8) public votesReceived;

    // votesReceived = {
    //     "후보 이름(string)" : 0(uint8),
    //     "후보 이름" : 2,
    //     "후보 이름" : 3,
    // }

    constructor(string[] memory candidateNames){
        // candidateList 초기값 배열 전달
        // constructor 인수값 받을려면 migrations 
        // 폴더안의 파일에 deployer.deploy 메서드 두번째 인수에 원하는값 넣어줘야함
        candidateList = candidateNames;
    }

    // 후보자 표 갯수 확인
    function totalVotesFor(string memory candidate) public view returns(uint8){
        require(validCandidate((candidate)));
        // 검증을 마친 후보자의 표 갯수 반환
        return votesReceived[candidate];
    }

    function voteForCandidate(string memory candidate) public {
        // 있는 후보자인지 확인하고
        require(validCandidate(candidate));
        votesReceived[candidate] += 1 ;
    }

    // 후보자리스트에 있는 후보인지 확인 검증
    function validCandidate(string memory candidate) private view returns (bool){
        // candidateList 후보자 리스트들을 순회하면서 일치하는 후보자가 있는지 확인해주는 함수
        for (uint256 i = 0; i< candidateList.length; i++){
            // keccak256() 이 메서드로 string값을 해싱해서 16진수로 바꾼다음 해시값을 비교한다.
            // 스마트 컨트렉트에서 문자열을 비교할수가 없어서 keccak256함수로 값을 해싱해서 비교한다.(해시값 비교)
            if(keccak256(abi.encodePacked(candidateList[i])) == keccak256(abi.encodePacked(candidate)))
            {
                return true;
            }
        }
        return false;
    }
}