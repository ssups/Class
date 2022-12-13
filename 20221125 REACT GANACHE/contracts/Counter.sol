// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Counter {
    uint256 private  _count;

    // 이벤트 등록하려면 event를 사용해서 (로그를 찍겠다)
    event Count(uint256 count);
    // 이벤트를 이렇게 등록하면 본인이 실행하고 싶을때(언제로그를 찍을지를 정하는거) 작성해주면 된다.

    // view타입은 상태변수를 변경하는게아니라 데이터를 읽기만 하는것
    function current() public view returns(uint256){
        return _count;
    }

    function increment() public {
        _count += 1;
        emit Count(_count);
        // 변한 상태변수의 값이 로그에 찍힌다.
        // 전역변수로 선언된 count의 값이 변하면 프론트에 web3.eth.subscribe('logs',...)이벤트에 로그값으로 받아올수있따.
    }

    function decrement() public {
        _count -= 1;
    }   
}