// private network
// 가상 사설망 이란 뜻인데
// 회사 조직에서 독립적으로 사용하는 네트워크로 보면 된다.
// geth로 사용할꺼고

// geth 실행
// Looking for peers 이더리움 네튼워크상 다른 노드와 peer를 맺어주기 위해
// peer 맺으면 이더리움 네트워크 상에 있는 데이터들을 로컬에 다운받을수 있다.
// 다운 받은 내용은
// MacOs는 ~/Library/Ethereum (나같은 경우는 finder 위에 옵션창에서 이동 -> 라이브러리 들어가면 있음)
// Linux는 ~/.ethereum

// 기본적으로 chaindata 폴더와 keystore 폴더를 확인해보면
// chaindata 폴더: 블록 헤더 내용, 블록의 바디 트랜젝션 내용이 들어있다.
// keystore 폴더: geth에서 관리하는 계정들의 정보가 들어있다.

// 이런 내용을 geth로 다운 받는 것을 동기화라고 부르고
// full sync, fast sync, light sync 이렇게 3가지가 있고
// full sync: 제네시스 블록부터 지금 현재 블록까지 모든 블록을 동기화
// fast sync: 블록 헤더 정보 동기화, 블록 바디 마지막 트랜젝션 기준
//            -1024개의 트랜젝션 데이터만 동기화
// light sync: 블록 헤더 정보와 마지막 snapshot 동기화
// snapshot: 특정시점에 데이터를 파일이나 이미지로 저장한다고 보면 된다.

// 이렇게 있고 아무 옵션 없이 geth를 실행할 경우
// 디폴트 값이 fast sync가 되고 light sync로 실행하고 싶으면
// ================================================
// geth --syncmode light
// ================================================

// light sync 동기화 할때는 lightchaindata폴더에 값이 저장된다.

// IPC 프라이빗 네트워크를 구축하면서 IPC 개념을 알고가자
// IPC는 프로세스간 통신
// 프로세스끼리 서로 데이터를 전송 수신하는 행위 또는 그 방법을 말하는것

// IPC의 종류
// 메시지 전달, 메모리 공유

// 메시지 전달은 커널이 제공하는 API를 사용해서 커널 공간을 통해서 통신하고
// 소켓 로컬에서도 통신이 가능ㄹ하다.

// 메모리 공유
// 프로세스끼리 공통의 메모리 영역을 공유하고 상호간 통신하는 방법
// 데이터 자체를 공유하도록 지원한다.

// IPC는 실행중인 프로세스 간에 데이터를 주고받는 것
// 프로세스는 할당도니 메모리 내의 정보에만 접근 할수있게 해주고
// 이를 벗어나서 접근할 경우 오류를 발생시키는데
// 안전성을 위해서 운영체제가 자기 프로세스의 메모리에서만 접근하도록
// 하고있기 때문에 우리가 IPC를 사용해서
// 다른 프로세스 간에 데이터를 주고받을수 있게 해야한다.

// geth.ipc 파일을 사용해서 geth와 IPC 통신을 할수있게 된다.

// 터미널을 하나 더 열어서
// 통신을 하는 명령어
// =====================================================
// geth attach (geth.ipc 경로)~/Library/Ethereum/geth.ipc
// =====================================================
// 자바스크립트 콘솔창에 접속됨 go언어로 만들어졌다.
// 자바스크립트로 호출해서 사용할수 있게끔 만들어 놓은것

// personal을 콘솔창에 입력
// 속성과 메서드 등이 쭉 보이게 된다.
// 이것들이 자바스크립트로 호출할수 있게끔 만들어놓은것

// admin
// 1. admin.nodeinfo: 노드의 정보 조회
// 2. admin.nodeinfo.enode : enode 값을 이용해서 peer를 맺는다.
// 3. admin.datadir: admin관련된 데이터의 폴더 경로

// personal
// personal.newAccount: 계정 생성

// eth
// 1. eth.syncing: 동기화 여부 확인(true, false 값으로 구분)
// 2. eth.chainId: 체인 ID 조회
// 3. eth.accounts: 노드에 존재하는 계정 목록 확인
// 4. eth.coinbase: 코인베이스 계정(마이너 계정)

// web3
// web3.fromWei(eth.getBalance(account),"ether") : 웨이를 이더단위로 변환

// private network 구축

// geth를 실행해보면 Chain ID : 1 (mainnet) 이 보이는데
// geth가 실행되고있는 이더리움 메인넷 Chain ID : 1 (mainnet)에 연결된 노드로
// 동기화가 이루어지고 있다.
// private network를 만드는데 geth의 기능은 상뇽하지만 최초블록을 교체해서
// 자체적인 프라이빗 네트워크를 구축할것

// json으로도 제네시스 블록의 속성값을 지정해줄수 있다.

const genesis = {
  // nonce값을 발견할 난이도 설정
  difficulty: "200000",
  // 블록체인 블록당 가스 제한량
  gasLimit: "3100000",
  // 제네시스 블록 생성시 지정한 지갑에 할당된 양의 정보
  alloc: {},
  config: {
    // 블록체인 네트워크 체인 아이디
    chainId: 1234,
    // 이더리움 release 버전
    homesteadBlock: 0,
    // eip는 Ethreum Improvement Proposal를 의미하고
    // 적용할지 여부를 확인할수 있다. 기본값 0
    eip150Block: 0,
    eip155Block: 0,
    // eip는 이더리움 개선안
    // 이더리움 커뮤니티 구성원들이 추진하는 이더리움 암호화폐와
    // 스마트 컨트렉트의 발전을 위해 제안하는것
  },
};

// 터미널 켜서
// cd ~/Library/Ethereum
// 이경로로 만든 json 파일 옮겨줌

// 제네시스 블록 설정값 적용
// geth --datadir node init genesis.json
// 실행 명령어
// geth --datadir node

// Puppeth는 이더리움 노드 배포를 쉽게 도와주는 프로그램
// geth를 빌드해서 실행부터
// make geth로 빌드를 했었고
// make all 빌드를 할거다.
// make all의 명령어를 사용하면 geth 이외에 go ethereum의 모든 파일도 빌드된다.
// 이 make all 빌드를 하면 폴더 안에 Puppeth이 생성이 되는데
// Puppeth를 사용할거고 사용하는 이유는
// 최초블록 속성 설정이나 여러가지 유용한 부분이 많기 때문에
// 초기설정(세팅)을 도와주는 프로그램으로 생각하면 된다.

// 나는 전부 /usr/local/bin 안에 다들어가있음

// puppeth 실행하고 json 파일 생성하면 내가 터미널 킨 위치에 생김 (cd ~/Library/Ethereum 여기에 puppeth_json폴더로 생성시킴)
