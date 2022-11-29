// ERC-20 스마트컨트렉트 토큰 발행

// ERC-20 은 이더리움 네트워크에서 표준토큰
// 정해진 규격대로 만들어줘야 한다.

// 토큰의 이름 symbol이라는 변수에 담긴 내용은 토큰의 단위 ETH
// balances 잔액의 내용이 들어있다. (UTXO 같은 느낌)

// balance {
//     address: String;
//     amout: Number;
// }
// token {
//     name: String;
//     symbol: String;
//     balances: balance[];
// }

balances = [
  { address: "0xD36A51529018641e492D6bD3A17d9E665a087675", amount: "100" },
  { address: "주소", amount: "100" },
  { address: "주소", amount: "100" },
];

// 솔리디티의 address 라는 데이터 타입
// 20byte 짜리 데이터 타입이고,
// 40글자(string)로 되어있는 계정의 주소이다.

// mapping
// mapping(string => uint256)
// mapping데이터 타입은 우리가 자바스크립트에서 사용한 객체라고 보면 된다.
// string이 속성명 uint256속성값이 된다.

// mapping(string => uint256) 으로 표현하면
// {
//   "name" : 50
// }

// 선언해서 사용해보면
// mapping(address => uint256) public balance (balance값을 address를 키값으로해서 매핑하겠다는 뜻인듯?)
// 데이터 타입은 mapping(address =< uint256) 객체 형식
// public으로 공개
// 변수명은 balance
// balance를 호출하면
// {
//   "주소" : 1000(잔액),
//   "주소" : 1000(잔액),
//   "주소" : 1000(잔액),
// }

// 컨트렉트에서 인스턴스를 생성할때 constructor 함수에 인수를 추가해서 인스턴스를 생성할수 있다.
// 우리가 인스턴스를 생성할려면 배포하기전에 인수를 전달해주어야한다.

// 배포를 하고나서 트러플 콘솔창에
// 배포한 트랜젝션 해시를 조회하면
// web3.eth.getTransaction("해시값")
// input값에 우리가 전달한 인수(50넣음)을 기준으로 구분값을 표시해 준다..
// 0000000000000000000000000000000000000000000000000000000000000032

// 네트워크에서 컨트렉트를 실행한 사람의 주소를 가져올수있는 방법
// msg.sender(예약어) : 실행시킨 사람의 주소 네트워크 안에서 사용할수있는 변수

// test2.sol 작성후 컴파일하고 2_deploy_Test.js의 내용 수정후 Test2 로
// 배포 진행하고 트러플 콘솔창 열기 (compile이랑 migration 하기)
// Test2.deployed().then(its => it = its)
// it.owner()로 조회하면 배포한 사람의 주소가 뜬다

// 배운걸 토대로 토큰을 생성해보자
// Token.sol 파일을 만들고
// 배포진행한다음에  migration 파일 만들때 이친구는 deply함수의 2번쨰 인수를 넣지 않는다.
// 트러플콘솔창 다시 열고
// Token.deployed().then(its => it = its)
// 이걸로 인스턴스 조회
// it.balanceOf("코인베이스 계정") //총발행량 확인 가능
// it.transfer("보낼계정",보낼량숫자)
// it.balanceOf("받은계정") //받은토큰 확인 가능
// it.address 하면 CA 나오는데 이거 토큰계약주소라서 메마에 등록하면 토큰들고와짐
// 토큰들고올때 메마 네트워크 설정에서 chainID 1337말고 json 파일에있는 netwrokId 넣어줘야함
// 혹은 애초에 가나쉬 열때 ganache-cli --networkId 4447 이렇게 네트워크아이디를 바꿔서 열어주면됨
