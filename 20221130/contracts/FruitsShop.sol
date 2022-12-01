// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract FruitsShop {
    // address 속성명, uint 속성값, myApple 변수명의 객체
    mapping(address => uint) myApple;
    // myApple = {
    // 계정주소 : 몇개(숫자),
    // 계정주소 : 몇개(숫자)
    // }

    // payable 속성이 있을때 CA는 ETH를 받을수 있다.
    // 트랜젝션 객체에 value값을 ETH로 전달할수 있다.
    // 사과 구매 함수
    mapping(address => uint) myGrape;
    mapping(address => uint) myPear;
    mapping(address => uint256) public balances;
    string public name = "Apple Coin";
    string public symbol = "APL"; 
    uint8 public decimals = 18; 
    uint256 public totalSupply = 10000 * 10 ** decimals; 

    constructor(){
        balances[msg.sender] = totalSupply / 2;
        balances[address(this)] = totalSupply / 2;
    }
    
    function balanceOf(address owner) public view returns(uint256 ){
        // 이함수 없으면 메타마스크에서 토큰 갯수 조회 안됨
        return balances[owner];
    }
 
    // 사과구매 함수

    function buyApple(uint amount) public payable {
        myApple[msg.sender] += amount;
    }
    function buyGrape(uint amount) public payable {
        myGrape[msg.sender] += amount;
    }
    function buyPear(uint amount) public payable {
        myPear[msg.sender] += amount;
    }

    function buyAppleByToken(uint amount, uint price) public returns(bool isSuccess){
        uint tokenAmount = price * 10 ** 18;
        // require(balances[msg.sender] >= tokenAmount);
        require(balances[msg.sender] >= tokenAmount, "not enough balace"); // 요 메세지는 가나쉬열어논곳에 뜬다
        // if(balances[msg.sender] >= tokenAmount){
        //     revert('not enough balance');
        // }
        myApple[msg.sender] += amount;
        balances[msg.sender] -= tokenAmount;
        // address(this) => 컨트렉트주소 가져와짐
        balances[address(this)] += tokenAmount;
        isSuccess = true;
        return isSuccess;
    } 

    function sellApple(uint applePrice) public payable{
        uint256 refund = myApple[msg.sender] * applePrice;
        myApple[msg.sender] = 0;
        // payable 함수의 인수로 주소를 전달해준다.
        // 전달한 주소의 계정에 돈을 보내준다.
        // 보내주는 돈은 사과의 갯수
        payable(msg.sender).transfer(refund);
    }
    function sellGrape(uint grapePrice) public payable{
        uint256 refund = myGrape[msg.sender] * grapePrice;
        myGrape[msg.sender] = 0;
        payable(msg.sender).transfer(refund);
    }
    function sellPear(uint pearPrice) public payable{
        uint256 refund = myPear[msg.sender] * pearPrice;
        myPear[msg.sender] = 0;
        payable(msg.sender).transfer(refund);
    }

    // 가지고있는 사과 확인 함수
    function getApple() view public returns (uint){
        return myApple[msg.sender];
    }
    function getGrape() view public returns (uint){
        return myGrape[msg.sender];
    }
    function getPear() view public returns (uint){
        return myPear[msg.sender];
    }

    // 코인교환 함수
    // function switchCoin(){}

    function getMsgSender() view public returns (address){
        return msg.sender;
    }
    // function getTxOrigin() view public returns (address){
    //     return tx.origin;
    // }
    function getTxOrigin() view public returns (address){
        return address(this);
    }
    


}
