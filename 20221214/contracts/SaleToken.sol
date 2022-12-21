// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./NftToken.sol";

contract SaleToken {
    // 상태변수인데 NftToken 컨트렉트랑 상호작용을 하기위해 만든 상태변수
    NftToken public Token;

    // 배포한 단계에 상호작용을 하기위해  배포한 NftToken 컨트렉트의 CA를 인수로 받아서 전달해준다.
    constructor(address _tokenAddress) {
        Token = NftToken(_tokenAddress);
    }
    // Token.getTokenRank(1) 이런식으로 상호작용을 하면 된다.

    // Token info 구조체 
    struct TokenInfo {
        uint tokenId;
        uint Rank;
        uint Type;
        uint price;
    }

    // token의 아이디 => price(토큰의 가격);
    mapping(uint => uint) public tokenPrices;

    // 판매 등록 함수
    function SalesToken(uint _tokenId, uint _price) public {
        address tokenOwner = Token.ownerOf(_tokenId); //토큰 소유자 계정

        // 토큰의 소유자를 가져왔을때
        // 소유자가 맞으면 판매 가능
        require(tokenOwner == msg.sender);

        // 판매 가격이 0보다 큰값인지 확인
        require(_price > 0);

        // this는 이 컨트렉트를 가리킨다.
        require(Token.isApprovedForAll(msg.sender, address(this)));
        // 첫번째 인수로 판매자 두번째 인수로 현재 컨트렉트
        // SalesToken()함수를 실행한 사람이 모든 토큰의 권한을 위임했는지 확인
        // 컨트렉트 CA에 체크해주는 함수

        tokenPrices[_tokenId] = _price;

        SaleTokenList.push(_tokenId);
    }

    // 토큰구매함수
    // 이 함수 실행전에 setApprovalForAll 으로 
    function PurchaseToken(uint _tokenId) public payable {
        address tokenOwner = Token.ownerOf(_tokenId); // 토큰 소유자 EOa

        // 판매자가 자신의 토큰을 구매하지 못하게
        require(tokenOwner != msg.sender);

        // 판매중인 토큰만 구매할수있게 체크
        // 여기서 tokenPrices의 값이 0이상인 경우 판매중으로 인식
        require(tokenPrices[_tokenId] > 0);

        // 구매자가 지불한 이더가 판매가격 이상인지 체크
        require(tokenPrices[_tokenId] < msg.value);

        // CA가 토큰판매자에게 이더 전송
        payable(tokenOwner).transfer(msg.value);

        // 토큰 전달을 하고
        Token.transferFrom(tokenOwner, msg.sender, _tokenId);
        //이게 지금 토큰전송하는 함수를 어떻게보면 외부컨트렉트에서 실행하는건데

        tokenPrices[_tokenId] = 0;
        // 판매가격을 0으로 만들면 해당토큰은 판매중이 아닌걸로 된다.
    }

    // 판매 리스트 제거 함수
     function popSaleToken(uint _tokenId) private returns (bool) {
        for(uint i = 0; i< SaleTokenList.length; i++){
            if(SaleTokenList[i] == _tokenId){
                SaleTokenList[i] = SaleTokenList[SaleTokenList.length -1];
                // 세일토큰리스트에 제일 마지막에있는 토큰을 판매취소할려는 토큰위치에 복사해주고
                // 세일토큰리스트 제일 마지막 꺼를 제거해주면 내가원하는 토큰만 배열에서 제거됨
                SaleTokenList.pop();
                return true;
            }
        }
        return false;
     }

    //  전체 판매 리스트 확인 전체 확인 view를 사용
    function getSaleTokenList() public view returns (TokenInfo[] memory){
        // 리스트에 길이가 있을 때
        require(SaleTokenList.length > 0);

        // SaleTokenList 리스트의 길이 만큼 빈값을 가지게 배열을 만듬
        TokenInfo[] memory list = new TokenInfo[](SaleTokenList.length);
        // const arr = new Array(SaleTokenList.length);
        // 이렇게 추가하던 배열

        for(uint i = 0; i< SaleTokenList.length; i++) {
            uint tokenId = SaleTokenList[i];
            uint Rank = Token.getTokenRank(tokenId);
            uint Type = Token.getTokenType(tokenId);
            uint price = tokenPrices[tokenId];

            // list 배열에 만들어진 구조체 담기
            list[i] = TokenInfo(tokenId, Rank, Type, price);
        }
        // [{tokenId : 20, Type : 1, Rank : 2, price : 1000000}];
        return list;
    }

    // 소유하고 있는 NFT리스트 view 함수
    function getOwnerToken(address _tokenOwner) public view returns (TokenInfo[] memory){
        uint balance = Token.balanceOf(_tokenOwner);
        require(balance != 0);
        // balance크기의 빈배열 만들기 list
        TokenInfo[] memory list = new TokenInfo[](balance);

        for (uint i = 0;  i< balance; i++){
            // tokenOfOwnerByIndex : 토큰 소유자의 토큰을 순서대로 가져옴 tokenId
            uint tokenId = Token.tokenOfOwnerByIndex(_tokenOwner, i);
            uint Rank = Token.getTokenRank(tokenId);
            uint Type = Token.getTokenRank(tokenId);
            uint price = tokenPrices[tokenId];

            list[i] = TokenInfo(tokenId,Rank,Type,price);
       }

       return list;
    }

    // 소유하고있는 제일 최신 NFT 보여주는 view 함수 민팅했을때 바로 보여주기 위한 용도로 사용
    function getLatestToken(address _tokenOwner) public view returns (TokenInfo memory){
        uint balance = Token.balanceOf(_tokenOwner);
        uint tokenId = Token.tokenOfOwnerByIndex(_tokenOwner, balance -1);
        uint Rank = Token.getTokenRank(tokenId);
        uint Type = Token.getTokenType(tokenId);
        uint price = tokenPrices[tokenId];

        return TokenInfo(tokenId,Rank,Type,price);
    }

    // 판매중인 NFT의 토큰아이디 값을 담아놓은 상태변수
    uint[] public SaleTokenList;
}