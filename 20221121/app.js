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

// josn 파일 가지고 geth 생성하기
// geth --datadir node init "josn경로" -> 이걸로 노드 폴더 생성
// geth --datadir node 로 실행하기

// web3 통신하고
// IPC를 사용해서 로컬에 실행시킨 geth 프라이빗 네트워크를
// 블록체인 네트워크에서 메타마스크나 다른 PC도 통신할려면 설정이 필요함
// geth를 실행할때 옵션을 설정해주면 된다.

// 설정 명령어
// --http.addr"0.0.0.0" -> 모든 ip허용
// --http.port 8000 ->사용할 포트를 8000으로 설정
// --http.corsdomain"*"  ->cors설정 모든 도메인 허용
// --http.api"admin,txpool,web3" -> 외부에서 어떤 모듈을 사용할수 있게 설정할것인지
// --syncmode -> 동기화 모드 full
// --networkId ->체인아이디와 동일한값 이력해주면 된다. 네트워크 아이디

// 실행 명령어
// 위에서 --datadir node init로 생성한 node 폴더가 있는 경로에서
// geth --datadir ./myDataDir --networkid 12345 console 2 --rpc --rpcport 9000 --rpcaddr 127.0.0.1 혹은
// geth --networkid 12345 console 2 --rpc --rpcport 9000 --rpcaddr 127.0.0.1 혹은
// geth --datadir node --http --http.addr "0.0.0.0" --http.port 9000 --http.corsdomain "*" --http.api "admin,miner,txpool,web3,personal,eth,net" --syncmode full --networkid 12345
// 스냅샷 오류뜨면 뒤에 --snapshot=false 이것도 달아주기
// 그담에 터미널 하나 더 열어서
// geth attach http://127.0.0.1:9000 실행

// 프라이빗 네트워크에서 통신할수있는 상태가 된거고
// nodejs나 메타마스크에서 프라이빗 네트워크에 통신 하는것이 가능한 상태

// npm ini -y
// 테스트코드 작성으로 jest 사용
// npm i jest
// 통신을 해야하니깐 web3설치
// npm i web3

// 코인베이스 계정(최초 계정)으로 채굴하기 (geth attach http://127.0.0.1:9000 실행한 창에서 하는거)

// 코인베이스 계정을 마이너로 설정
// miner.setEtherbase(eth.accounts[0] or eth.coinbase)

// 마이닝 시작
// miner.start(1); start(인수로 들어가는 숫자는 스레드 갯수)
// 스레드갯수가 많은건 일해주는 일력이 많다는 뜻임

// 마이닝 스탑
// miner.stop()

// 코인베이스 계정이 채굴한 잔고를 확인해보자
// eth.getBalance(eth.accounts[0] or eth.coinbase)
// web3.fromWei(eth.getBalance(eth.coinbase),"ether") 단위변경

// 코인 베이스 계정의 잔고에서 트랜젝션을 발생시켜서 잔고를 발송시켜 보자
// eth.sendTransaction({from: eth.accounts[0], to: eth.accounts[1], value: web3.toWei(10,"ether")})
// 일단 계정이 비번으로 잠겨있어서 안보내짐

// 계정 잠금 해제하고 실행하려면 geth 열때 설정값 하나 더 넣어줘야함 --allow-insecure-unlock
// geth --datadir node --http --allow-insecure-unlock --http.addr "0.0.0.0" --http.port 9000 --http.corsdomain "*" --http.api "admin,miner,txpool,web3,personal,eth,net" --syncmode full --networkid 12345
// 다시 열고
// personal.unlockAccount(eth.coinbase) 치고 비밀번호 입력해서 계정 풀어주고 (비번 1으로 설정함)
// 다시 보내기
// eth.sendTransaction({from: eth.coinbase, to: eth.accounts[1], value: web3.toWei(10,"ether")})
// 전송중인 트젝 볼려면 txpool 치면 status값에 나와있음
// 트젝 pending 상태에서 넘어갈려면 마이닝을 실행해야함.

// 특정 계정 (0,1번 계정) unlock 시켜주기
// 비밀번호 적어놓은 txt 파일 만들어주기(터미널에서 echo 로 만들어야함)
// geth --datadir node --http --http.addr "0.0.0.0" --http.port 9000 --http.corsdomain "*" --http.api "admin,miner,txpool,web3,personal,eth,net" --syncmode full --networkid 12345 --port 30300 --ws --ws.addr "127.0.0.1" --ws.port 9005 --ws.origins "*" --ws.api "admin,eth,debug,miner,miner,net,txpool,personal,web3" --allow-insecure-unlock --unlock "0,1" --password "./node/password.txt"

// geth attach 한 자바스크립트 콘솔창에
// bytecode = "0x뒤에 솔리디티로 컴파일한 bin 파일의 내용을 붙여넣어 준다." (bytecode 변수에 값 할당한거)
// abi = 솔리디티로 컴파일한 abi파일의 내용을 붙여넣어준다.

// 트랜젝션 객체를 만들어준다
// from 키값과 data 키값으로 객체를 생성해준다.
// txObject = {from: eth.coinbase, data: bytecode}
// eth.sendTransaction(인수로 위에서 만든 트랜젝션 객체(txObject) 넣기)

// 트랜젝션 확인하기
// eth.getTransaction(트랜젝션의 해쉬값(send transaction 하고나면 뜨는 문자열) 넣기) (해쉬값 "0xf659439fc518f58408f2745e856346269da48a2de213ae7283a0b7a5b00c42db")

// contract 변수에 eth.contract(위의 abi 값)을 할당하고 -> contract = eth.contract(abi)
// 만들어진 contract 가 컨트랙트 객체가 된다.
// contract.at() at매서드를 사용해서 스마트컨트렉트 코드에 접근이 가능하다.

// contractAddress값은 eth.getTransactionReceipt(트젝 해쉬값)한 값을 할당해주기 => contractAddress = eth.getTransactionReceipt(해쉬값)
// instance 변수에 contract.at(contractAddress)값 할당
