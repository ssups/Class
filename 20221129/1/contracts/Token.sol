 // SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Token{
    mapping(address => uint256) public balances;
    // address(타입): 속성명(키값), uint256(타입) 속성값(벨류값), balances: 변수명(객체 이름)
    // 여기에서 상태변수 이름을 규격에 맞게 작성해줘야 한다.
    string public name = "Seop Coin"; // 토큰의 이름
    string public symbol = "SEP"; // 토큰단위이름
    uint8 public decimals = 18; //소수점 단위
    uint256 public totalSupply = 10000 * 10 ** decimals; // 총공급량(발행량)
    // 처음컨트렉트를 배포함 사람이 가지고있게됨.

    constructor(){
        balances[msg.sender] = totalSupply;
    }

    // 계정주소넣으면 잔액확인할수있는 함수
    function balanceOf(address owner) public view returns(uint256 balance){
        // 인수로 들어올값이나 return 으로 반환될값을 사용하기 위해서는 
        // uint256처럼 타입선언 뒤에 원하는 변수명을 적어주면된다.
        // 조회할 사람의 주소 owner
        return balances[owner];
    }

    // 토큰 전송할수있는 함수
    // function transfer(address to, uint256 value) public returns(bool success){
    //     // require() 함수의 매개변수가 true 이면 실행 false면 종료
    //     require(balances[msg.sender] >= value);
    //     // msg.sender는 해당 컨트렉트를 실행시킨사람의 주소가 들어감
    //     balances[msg.sender] -= value;
    //     balances[to] += value;
    //     return true;
    // }

    function transfer(address from, address to, uint256 value) public returns(bool success){
        require(balances[from] >= value);
        balances[from] -= value;
        // 이렇게 그냥 value값 보내버리면 자릿수가 10**(-18)로 보내진다 토큰단위가 10의18승 소숫점단위로 생성했기때문
        // 그래서 만약의 자연수단위로 보내고싶으면 -=value * 10 ** 18 이렇게 적어주면 된다.
        balances[to] += value;
        return true;
    }

    // CA 0x797eC6A47c78c8142b8322c509ffe5c366071A69
}