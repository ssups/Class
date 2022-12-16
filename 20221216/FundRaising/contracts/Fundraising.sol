// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Fundraising {
    // 목표 금액 상태변수
    uint256 public targetAmount;

    // 컨트렉트의 소유자이자 펀딩의 주최자를 담을 상태변수
    address public owner;
    
    // 펀딩에 참여한 사람들의 기부금액
    // 참여한 사람의 EOA가 key 금액이 value
    mapping(address => uint256) public donations;

    // 누적 총액을 담을 상태변수
    uint256 public raisedAmount  = 0;

    // 데드라인을 담을 상태변수
    // block은 해당 컨트렉트가 배포될때 해당 컨트렉트의 내용을 담고있는 블락의 정보를 담고있는 객체
    uint256 public finishTime = block.timestamp + 2 weeks;

    constructor(uint _targetAmount) {
        targetAmount = _targetAmount;
        owner = msg.sender; // 컨트렉트 배포한(펀딩 주최자) EOA
    }

    // 이더리움을 CA로 전송받을때
    receive() external payable{
        // 데드라인 전에 보내야 실행
        require(block.timestamp < finishTime);

        // 도네이션
        // 누가 얼마를 후원했는지 밉팽 객체에 value를 넣고
        donations[msg.sender] += msg.value;
        // 총 누적금애 value를 더해준다.
        raisedAmount += msg.value;
    }

    // 모금금액 인출하는 함수
    function withdrawDonations() external {
        // 인출하는 주체가 컨트렉트 배포자(펀딩 주최자)인지 확인
        require(msg.sender == owner);
        // 총액이 목표금액과 같거나 큰지 확인
        require(raisedAmount >= targetAmount);
        // 데드라인 시간이 지났는지 확인
        require(block.timestamp > finishTime);

        payable(owner).transfer(raisedAmount);
    }

    // 펀딩마감때까지 목표액에 도달못했을때 환불해주는 함수
    function refund() external{
        // 펀딩시간이 종료되었는지 확인
        require(block.timestamp > finishTime);
        // 목표금액에 도달하지 못했는지 확인해주는 함수
        require(raisedAmount < targetAmount);
        // 함수 호출하는 EOA가 기부한 금액이 있는지 확인
        require(donations[msg.sender] > 0);

        // 환불시킬 금액을 변수에 할당하고
        uint256 toRefund = donations[msg.sender];
        donations[msg.sender] = 0;

        // 참여자에게 기부액 환불
        payable(msg.sender).transfer(toRefund);
    }
}