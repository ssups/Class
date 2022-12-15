// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "../node_modules/openzeppelin-solidity/contracts/access/Ownable.sol";
// Ownable.sol 은 상속만받으면 배포진행할때 owner라는 변수에 컨트렉트 배포자의 EOA address가 할당되어있다.
import "../node_modules/openzeppelin-solidity/contracts/utils/Strings.sol";
// Strings.sol은 uint를 형변환할때 바로 형변환이 되지 않아서 uint를 바이트로 변환한다음 문자열로 반환해주는 함수를 사용할수 있다.
// 이건 컨트렉트가아니라 library

contract NftToken is ERC721Enumerable, Ownable{
    // NFT 발행량을 제한할 상태변수
    // 상수를 사용할건데 솔리디티에서 상수는 constant를 타입에 붙여서 선언
    uint constant public MAX_TOKEN_COUNT = 1000;

    // mint_price는 NFT민팅시 지불할 이더 미팅의 가격을 할당해줌
    uint public mint_price = 1 ether;

    string public metadataURI;

    constructor (string memory _name, string memory _symbol, string memory _metadataURI) ERC721(_name, _symbol) {
        metadataURI = _metadataURI;
    } // ERC721은 Constract 컨트렉트 인수로 받은건 ERC721의 constructor 인수

    // token 구조체 생성
    struct TokenData{

        uint Rank;
        uint Type;
    }

    // uint 키값은 토큰의 ID가 될것
    mapping(uint => TokenData) public TokenDatas;

    // 어떤 타입의 토큰이 몇개나 발행되었는지 확인하기 위한 상태변수
    uint [4][4] public tokenCount;

    function mintToken() public payable{
        // mintToken을 호출하면 이더를 지급하게 만들고, CA에게 이더를 보내서 NFT를 구매한다.

        // 보낸잔액이 mint_price보다 큰지 확인
        require(msg.value > mint_price);
        // MAX_TOKEN_COUNT(최대발행량) 총발행량보다 큰지 확인
        require(MAX_TOKEN_COUNT > totalSupply()); // totalSupply함수는 ERC721Enumerable 컨트렉트에 있는함수

        // 총발행량에 1을 더해서 토큰아이디 변수에 담아둠
        uint tokenId = ERC721Enumerable.totalSupply() + 1;
        // tokenId에 맞춰서 Rank랑 Type을 랜덤생성해서 TokenData로 저장
        TokenData memory random = getRandomTokenData(msg.sender, tokenId); //랜덤데이터 생성
        // 총 발행량의 +1 더해진 토큰 아이디
        TokenDatas[tokenId] = random;

        // 랜덤으로 생성한 Rank와 Type을 가진 Token 갯수가 몇개인지 확인하기 위한 상태변수
        tokenCount[TokenDatas[tokenId].Rank-1][TokenDatas[tokenId].Type-1] +=1;

        // CA => 컨트렉트 배포자 계정에 지급받은 이더를 전송해준다.
        payable(Ownable.owner()).transfer(msg.value);

        _mint(msg.sender, tokenId);
    }

    function getRandomTokenData(address _owner, uint _tokenId) private pure returns(TokenData memory){
        // 솔리디티에서는 랜덤함수가 없기떄문에
        // 특정한 값을 해싱해서 나머지 연산으로 랜덤값을 구해야한다.

        // abi.encodePacked(_owner, _tokenId); // 타입상관없이 넣은 인수값들을 합쳐서 string 타입으로 리턴해주는 메서드
        uint randomNum = uint(keccak256(abi.encodePacked(_owner, _tokenId))) % 100 ; // 나머지연산으로 뒤에 두자리값만 빼옴
        // keccak256 -> 문자열을 32바이트로 변환해준다.

        // 토큰 데이터를 저장할 변수
        TokenData memory data;

        if(randomNum < 5){
            if(randomNum == 1){
                data.Rank = 4;
                data.Type = 4;
            }
            else if(randomNum == 2){
                data.Rank = 4;
                data.Type = 3;
            }
            else if(randomNum == 3){
                data.Rank = 4;
                data.Type = 2;
            }
            else {
                data.Rank = 4;
                data.Type = 1;
            }
        }
        else if(randomNum < 13){
            if(randomNum < 7){
                data.Rank = 3;
                data.Type = 4;
            }
            else if(randomNum < 9){
                data.Rank = 3;
                data.Type = 3;
            }
            else if(randomNum < 11){
                data.Rank = 3;
                data.Type = 2;
            }
            else {
                data.Rank = 3;
                data.Type = 1;
            }
        }
        else if(randomNum < 37){
            if(randomNum < 19){
                data.Rank = 2;
                data.Type = 4;
            }
            else if(randomNum < 25){
                data.Rank = 2;
                data.Type = 3;
            }
            else if(randomNum < 31){
                data.Rank = 2;
                data.Type = 2;
            }
            else {
                data.Rank = 2;
                data.Type = 1;
            }
        }
        else {
            if(randomNum < 52){
                data.Rank = 1;
                data.Type = 4;
            }
            else if(randomNum < 68){
                data.Rank = 1;
                data.Type = 3;
            }
            else if(randomNum < 84){
                data.Rank = 1;
                data.Type = 2;
            }
            else {
                data.Rank = 1;
                data.Type = 1;
            }
        }
        return data;
    }

    function tokenURI (uint _tokenId) public override view returns (string memory) {
        // Rank와 Type으로 json 파일의 경로를 만들자 
        // metatURI : nft의 토큰값에 매칭되는 앞부분 URI를 나타내는 상태변수
        //            baseURI이라고 생각하면 된다. 앞부분에 붙는 주소
        // uint에서 바로 문자열로 형변환이 불가능하기 때문에
        // uint에서 bytes로 변환하고 문자열로 형변환 해준다.
        // Strings.toString 은 String 컨터렉트에서 들고온 함수
        string memory Rank = Strings.toString(TokenDatas[_tokenId].Rank);
        string memory Type = Strings.toString(TokenDatas[_tokenId].Type);

        // http://localhost:3000/metadata/1/3.json 이런 형태로 만들어줄것
        // http://localhost:3000 여기부분을 metadataURI 라고부르고
        // /metadata/1/3.json 여기부분을 tokenURI 라고 부르는듯
        return string(abi.encodePacked(metadataURI, "/", Rank, "/", Type, ".json"));
    }

    // metadataURI를 수정해야 할때 사용할 함수
    // 컨트렉트 배포한 사람만(owner) 호출할수 있는 함수.
    // onlyOwner 제어자 넣어주는데 이건 Ownable.sol에서 들거온거
    function setMetadataURI(string memory _uri) public onlyOwner {
        metadataURI = _uri;
    }

    // TokenData의 Rank를 조회하는 함수
    function getTokenRank(uint _tokenId) public view returns(uint){
        return TokenDatas[_tokenId].Rank;
    }

    // TokenData의 Type을 조회하는 함수
    function getTokenType(uint _tokenId) public view returns(uint){
        return TokenDatas[_tokenId].Type;
    }

    // 배열 전체내용을 조회하는 함수
    // 솔리디티에서 배열을 getter로 전체 조회하는건 불가능한데 
    // 배열 전체를 returngownsms view함수를 만들어주면 된다.

    function getTokenCount() public view returns (uint[4][4] memory){
        return tokenCount;
    }
}

