import React, { useEffect, useState } from "react";
import CounterContract from "../contracts/Counter.json";
import axios from "axios";

const Counter = ({ web3, account }) => {
  const [count, setCount] = useState(0);
  const [deployed, setDeployed] = useState(null);

  const increment = async () => {
    // 인수로 트렌젝션 계정을 받을거임
    // 트젝을 발생시킬거
    // 상태변수값을 변경 -> send()함수를 통해서

    // const result = await deployed.methods.increment().send({ from: account });
    // if (!result) return;
    // const current = await deployed.methods.current().call();
    // // 바뀐 상태변수값을 가져와서 state값을 update 시킨다.
    // setCount(current);

    // axios로 백에 계정주소를 토대로 데이터 요청을 보냄
    const res = await axios.post("http://127.0.0.1:4000/api/increment", {
      from: account,
    });
    // 백에서 받은 트젝객체로 트젝 발생
    await web3.eth.sendTransaction(res.data);
  };
  const decrement = async () => {
    const result = await deployed.methods.decrement().send({ from: account });
    if (!result) return;
    const current = await deployed.methods.current().call();
    // 바뀐 상태변수값을 가져와서 state값을 update 시킨다.
    setCount(current);
  };

  useEffect(() => {
    (async () => {
      if (deployed) return;
      // abi와 CA가 필요한데
      // CounterContract.json 안에 abi가 있고
      // CA는 truffle 콘솔창에서 it.address (여기서 it은 생성한 instance값 it변수에 할당한거) 해서 가져옴
      // CA : '0xB66Ac9A7785336D058E1FC95791B44a416b4f67f'
      const networkId = await web3.eth.net.getId(); //네트워크 아이디 가져오기
      //   console.log(networkId);
      // 해당파일에 networks값이 들어갈려면 npx truffle migration 해줘야함
      const CA = CounterContract.networks[networkId].address; //CA 가져오기
      const { abi } = CounterContract;

      const Deployed = new web3.eth.Contract(abi, CA); //abi랑 CA 활용해서 컨트렉트 호출
      const count = await Deployed.methods.current().call();

      // 이벤트 연결
      // eth.subscribe() 인수 두개 들어감
      // 첫번째는 연결하려는 이벤트 이름? 'logs'
      // 두번째는 어느 컨트렉트안에있는 로그를 호출할것인가. (객체로 해서 address 키값에 CA 벨류값으로 너음)
      // subscrbie 이벤트를 연결시켜주는 함수
      // logs 이벤트가 실행될때마다 on 함수로 이벤트를 받는다.
      web3.eth.subscribe("logs", { adress: CA }).on("data", log => {
        // params에 어떤형태로 파싱할것인지 넣어줌
        // type은 솔리디티쪽에서 선언한 타입으로 작성
        // name은 그냥 받을이름 정해준거
        const params = [{ type: "uint256", name: "count" }];
        // decodeLog 함수로 변환을 해서 value에 담고
        const value = web3.eth.abi.decodeLog(params, log.data); //object르 ㄹ반환함
        // emit한 데이터가 여러개면 반화값의 형태는 object이고
        // 여러개의 데이터가 있을경우 인덱스나 지정한 name으로 구분하면 된다.
        setCount(value.count);
      });

      setDeployed(Deployed);
      setCount(count);
    })();
  }, []);

  return (
    <div>
      <h1>카운트 : {count}</h1>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
};

export default Counter;
