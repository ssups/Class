// 전에는 solc라이브러리를 사용할때
// npx solc --bin --abi "sol파일 경로"
// 이렇게 컴파일해서 사용했는데
// 자바스크립트 구문으로 직접 컴파일을 해보자

// 순서

// 1. contract.compile 함수로 abi와 bytecode 값을 받아서 저장하고

// 2. new Client('ws://127.0.0.1:9005')
//    web3 인스턴스 속성값으로 가지고 있는 client를 만들고

// 3. 트랜젝션 객체(txObject 변수로 만들고) txObject 객체의 내용에는 data 키값이 있고
//    data키값의 value는 bytecode의 내용

// 4. contract 인스턴스를 만든다.
//    client는 2번에서 만든 web3인스턴스 속성값을 가지고 만든거 new Client('ws://127.0.0.1:9005')
//    new client.web3.eth.Contract(abi) 함수를 사용해서 abi내용을 가지고 있는 컨트렉트 인스턴스 생성

// 5. contract.deploy 함수를 사용해서 배포 진행
//    deploy함수가 반환해주는게 promise 객체
//    트랜젝션 풀이 처리될때까지 기다려 준다.
//    instance = await contract.deploy(txObject).send({from:"트랜젝션 발생시킬 계정"})
//    트젝 처리가 되면 생성된 CA 주소(고유값)를 가져와서 저장해야하는데
//    CA값은 위에 contract.deploy로 반환받은 값(instance)에 instance.options.address 에 담겨져있음

// 6. 컨트렉트를 조회해서 함수나 상태변수를 불러와서 사용
//    contract address로 조회를 하는데 abi와 contract address 둘다 필요하다
//    new client.web3.eth.Contract 함수로 조회를 하고
//    인수로 첫번째 값이 abi 두번째 값이 contract address
//    함수로 반환받은 값을 가지고 컨트렉트 메소다느 상태변수를 가져오고 사용할수 있다.
