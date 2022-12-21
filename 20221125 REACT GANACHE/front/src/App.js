import "./App.css";
import useWeb3 from "./hooks/useWeb3";
import Counter from "./components/Counter";

function App() {
  const [web3, account] = useWeb3();

  if (!account) return <h1>메타마스크 연결 해주세요</h1>;
  return (
    <div className="App">
      <h2> 계정: {account}</h2>
      <Counter web3={web3} account={account} />
    </div>
  );
}

export default App;

// 프론트는 리액트로 구성하고 메타마스크 연결은 가나쉬 네트워크에 연결하고
// 스마트 컨트렉트 배포는 트러플로 구선할 예정
// npx ganache-cli
// npx truffle init

// 리액트에서 프론트로 스마트컨트렉트 동작시켜서 카운터를 제작
// 더하고 뺄수있는 카운터 기능을 만들고,
// 클라이언트에서 메타마스크로 연결된 계정을 통해서 트랜젝션을 보내고,
//  스마트컨트렉트 코드를 실행시켜 상태변수가 바뀌는걸 프론트에서 확인

// contracts폴더에 Couter.sol 파일 만들어서 contract 내용 추가
// truffle-config.js 내용 수정(가나쉬 네트워크 속성 추가)
// npx truffle compile 로 컨트렉트 코드 컴파일 => build -> contracts 폴더에 만든 컨트렉트 이름의 json 파일 생성됨

// 배포를 하기위해 migrations 폴더에 번호_내용_이름.js 파일 만들어서
// 배포에대한 코드 작성

// 배포 명령어 사용해서 가나쉬 네트워크에 컨트렉트 배포 진행
// npx truffle migration

// 가나쉬에 있는 지갑 프라이빗키 들고와서 메타카스크에 지갑 추가

// 배포 잘됐는지 확인 -> 트러플 콘솔 열어서
// npx truffle console

// 트러플 콘솔창에 Counter.deployed().then(instance => it = instance)
// it.address 쳐서 컨트렉트주소(CA) 받아놓고 ('0xB66Ac9A7785336D058E1FC95791B44a416b4f67f')

// it.current.call()를 작성하면 BN값이 나오는데 Big Number의 약자로
// 자바스크립트에 큰 숫자를 표현할때 사용되는 객체 컨트렉트임
// 사용되는 int가 기본적으로 큰값인 경우가 많아서(1ETH는 10^18 wei) BN으로 가져옴

// it.increament() 함수를 사용하면 즉시 상태가 변한값을 확인할수 있는데
// 이유는 가나쉬로 실행한 로컬의 이더리움 네트워크는 트젝이 발생하면 자동으로 블록을 마이닝해주기 때문이다.

// 프론트 작업

// 스마트 컨트렉트 메타마스크와 연결해서
// 배포 및 실행
// 스마트 컨트렉트 이벤트를 등록하고 백엔드에서 트랜젝션 생성 실행

// 프론트에서 상태변수를 업데이트 해줬고
// 트랜젝션 결과는 eth.TransactionReceipt() 여기 저장되는데 일종의 log로 저장되어있고
// 로그기록을 조회하면 스마트 컨트렉트가 실행됐는지 찾을수 있다.

// 로그데이터를 프론트엔드에 전송하고 프론트엔드에서 이벤트를 listen하게 해서
// 이더리움 네트워크에 배포된 스마트 컨트렉트와 실시간으로 통신이 가능하다.

