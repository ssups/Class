// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// ERC721 토큰 표준 가져오고
import 'openzeppelin-solidity/contracts/token/ERC721/extensions/ERC721Enumerable.sol';

contract Minting is ERC721{
    // ERC721 생성자 함수 ERC721(_name, _symbol)
    constructor(string memory _name, string memory _symbol) ERC721(_name,  _symbol){
    }
    function _minting(uint _tokenId) public{
        _mint(msg.sender, _tokenId);
        // _tokenId 키값 조회하면 누가 토큰의 소유자인지 확인 가능
        // msg.sender: 토큰을 받는 계정, _tokenId : 토큰의 고유값
    }


    function tokenURI(uint) public override pure returns (string memory){
        // json 파일 경로는 https://app.pinata.cloud/ 여기서 만들기
        return "https://gateway.pinata.cloud/ipfs/QmZ4FLgXcQtL1hYPUfdJG1yP8bFmCiDQxVkwWswVdg3LWk";
        // 반환값은 우리가 만들어서 넣어줄 json 객체
        // pure타입의 함수는 해당함수 밖에있는 값을 읽어올수도 없고 ,변경도 불가능한 독립적인 함수타입이다.
        
        // nft 객체의 내용
        // {
        //     'name': "이름",
        //     "description": "해당 nft에 대한 설명",
        //     "image": "이미지의 경로",

        // }
    }
}
