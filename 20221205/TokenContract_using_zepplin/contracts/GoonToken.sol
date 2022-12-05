// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// import를 하는데 node_modules/openzeppelin-solidity/contracts/token/ERC20 경로에 있는 제플린형식 들고오기
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

// 위에서 import해온 ERC20 컨트렉트 상속받기
contract GoonToken is ERC20{
    string public _name = "GoonToken";
    string public _symbol = "GOT";
    uint public _totalSupply = 10000 * (10 ** decimals());
    // 클래스와 비교하자면 super()를 사용해서 상속받은것과 같음
    // constructor()함수옆에 붙여서
    constructor() ERC20(_name, _symbol){
        // 컨트렉트 배포한사람에게 총 발행량 주고
        _mint(msg.sender, _totalSupply);
    }

}
