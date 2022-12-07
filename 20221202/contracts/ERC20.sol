//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract ERC20 {
    // 표준토큰 규격
    string public name; // 토큰의 이름
    string public symbol; // 토큰의 단위
    uint public decimals = 18; //소수점 자리

    uint public totalSupply; // 총 발행량
    // 속성명 address 속성값 uint 변수명 balances
    mapping(address => uint) public balances;
    // 객체안의 객체
    // 속성명 address이고 속성값이 객체인데 속성명 address , 속성값 uint인
    // 객체를 가지고 있는 변수명 allowance 
    mapping(address => mapping(address => uint)) public allowance;

    //표현하면
    /*
    const allowance = {
        "3번 계정 주소" {
            "1번계정주소": 100
            "2번계정주소": 200
        },
        "2번계정주소" :{
            "3번계정주소":200
            "4번계정주소":200
            "5번계정주소":200
        }
    }*/
    /* allowance를 사용하는 이유 
    3번계정이 2번계정에게 200개의 토콘의 권한을 위임 양도했다는 뜻
    2번계정도 3번께정에게 200의 토큰의 권한을 위임 하기위해서
    2번계정이 200 토큰이상이 넘지 않는 선에서 3번계정의 토큰을
    다른 사람에게 전송할 수 있다.*/

    // 잔액을 확인하는 함수
    // external은  다른곳에서 불러서 사용해서 접근 가능
    // 정의된 컨트랙트 안에서는 사용할 수 없다.
    function balanceOf(address account) view external returns (uint) {
        return balances[account];
    }

    // 잔액을 전송하는 함수
    function transfer(address recipient, uint amount) external returns (bool){
        balances[msg.sender] -= amount;
        balances[recipient] += amount;
        // Transfer는 이벤트로 
        emit Transfer(msg.sender,recipient, amount);
        return true;
    }

// 토큰 권한을 위임하는 함수
    function approve(address spender , uint amount) external returns (bool){
        allowance[msg.sender][spender] = amount;
        // Approval는 이벤트로
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint amount) external returns (bool){
        require(allowance[sender][msg.sender] >= amount);

        allowance[sender][msg.sender] -= amount;
        balances[sender] -= amount;
        balances[recipient] += amount;
        emit Transfer(sender, recipient, amount);
        return true;

        // sender : 전송하는 토큰의 소유자 계정
        // msg.sender : transferForm 함수를 호출한 계정으로 특정 소유자로 부터 일정량의 토큰을  위임받은 계정
    }

    // internal : 정의된 컨트랙트 내에서 또는 상속받은 자식 컨트랙트에서만 접근 가능
    // private과 비슷하지만 상속받은 자식도 접근 가능하다는 점이 다르다

    // 발행량을 늘려주는 CA로 전송한 계정이 발행자일 경우에 사용할 것
    function mint(uint amount) internal{
        balances[msg.sender] += amount;
        totalSupply += amount;
        // address(0) from 값이 필요없기 때문에 null로 넣어준 것
        emit Transfer(address(0),msg.sender, amount);
    }

    // 토큰 소각
    function burn(uint amount) external {
        balances[msg.sender] -= amount;
        totalSupply -= amount;
        // address(0) to 값이 필요 없어서 null
        emit Transfer(msg.sender, address(0), amount);
    }

    event Transfer(address from, address to, uint value);
    event Approval(address owner, address spender , uint value);
}