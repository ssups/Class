 // SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Token{
    mapping(address => uint256) public balances;
    string public name = "Apple Coin"; // 토큰의 이름
    string public symbol = "APL"; // 토큰단위이름
    uint8 public decimals = 5; //소수점 단위
    uint256 public totalSupply = 10000 * 10 ** decimals; // 총공급량(발행량)

    constructor(){
        balances[msg.sender] = totalSupply;
    }

    function balanceOf(address owner) public view returns(uint256 balance){
        return balances[owner];
    }

    function buyApple(uint amount) public returns(bool success){
        uint value = amount * 100;
        require(balances[msg.sender] >= value);
        balances[msg.sender] -= value;
        // balances[to] += value;
        return true;
    }
}
