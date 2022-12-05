// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract EthSwap{

    // ERC20 타입의 token 변수
    // CA 값을 받을거
    // 데이터 타입을 ERC20으로 선언해준 이유는 컨트렉트끼리 상호작용을 하기 위하여
    // GoonToken.sol이 컨트렉트에 있는 함수를 호출하고싶을때 token 변수를 사용해서 호출할수 있다.
    // 왜냐하면 CA값을 담아놓을거기 때문에
    ERC20 public token;

    // 토큰과 이더의 환율(교환비율) 설정
    uint public rate = 100;

    constructor(ERC20 _token){
        // CA값을 받아와서 담아줄거
        token = _token;
    }

    function getToken() public view returns(address) {
        // 여기에서 반환되는 값은 GoonToken의 CA값, 컨트렉트주소
        return address(token);
    }

    function getSwapBalance() public view returns (uint){
        // 토큰잔액을 보여주는 함수
        return token.balanceOf(msg.sender);
    }

    function getMsgSender() public view returns (address){
        return msg.sender;
    }

    // 토큰 구매 함수
    function buyToken() public payable{
        // msg.value 는 이더전송시킬때 송금한 이더량
        uint256 tokenAmount = msg.value * rate;
        // this는 해당 컨트렉트를 의미한다 this == EthSwap
        // address(this) == 해당 컨트렉트의 CA
        // require에 충족하지 못했을때 에러문구 2번째 인수로 넣어준다 이 문구는 ganache 같은 서버에서 보여진다
        // 에러를 통해 상호작용할라면 따로 에러헨들러 만들어서 동작해야함
        // 외부와 상호작용할 용도는 아니도 컨트렉트 내부에서 코드문제를 확인하기위한 용도로 사용한다.
        // 조건에 부합하지 않으면 에러를 발생시키고 gas를 환불시켜줌.
        require(token.balanceOf(address(this)) >= tokenAmount, "err");
        token.transfer(msg.sender, tokenAmount);
    }

    // 토큰 판매 함수
    function sellToken(uint256 _amount) public payable{
        require(token.balanceOf((msg.sender)) >= _amount);
        uint256 etherAmount = _amount / rate;
        // 요 컨트렉트계정에서 토큰판만큼의 어디를 보내줄거기 때문에
        require(address(this).balance >= etherAmount);
        token.transferFrom(msg.sender, address(this), _amount);
        payable(msg.sender).transfer(etherAmount);
    }
}