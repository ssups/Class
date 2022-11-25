import React, { useEffect, useState } from "react";
import CounterContract from "../contracts/Counter.json";

const Counter = ({ web3, account }) => {
  const [count, setCount] = useState(0);
  const [deployed, setDeployed] = useState(null);

  const increment = async () => {
    // 인수로 트렌젝션 계정을 받을거임
    // 트젝을 발생시킬거
    // 상태변수값을 변경 -> send()함수를 통해서

    const result = await deployed.methods.increment().send({ from: account });
    if (!result) return;
    const current = await deployed.methods.current().call();
    // 바뀐 상태변수값을 가져와서 state값을 update 시킨다.
    setCount(current);
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
      const Deployed = new web3.eth.Contract(
        CounterContract.abi,
        "0xB66Ac9A7785336D058E1FC95791B44a416b4f67f"
      );
      setDeployed(Deployed);

      const count = await Deployed.methods.current().call();
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
