import React, { useEffect, useState, useRef } from "react";
import FruitsShopContract from "../contracts/FruitsShop.json";
// props로 web3, account 받는 컴포넌트
const FruitsShop = ({ web3, account, tokenBalance, setTokenBalance, setBalance }) => {
  const [apple, setApple] = useState();
  const [grape, setGrape] = useState();
  const [pear, setPear] = useState();
  const [deployed, setDeployed] = useState();
  const [CA, setCA] = useState();
  const buyInputRef = useRef();
  const selectionRef = useRef();
  const price = {
    apple: 1,
    grape: 2,
    pear: 3,
  };

  // 과일갯수 업데이트 함수
  const fruitsAmountUpdate = async () => {
    const currentApple = await deployed.methods.getApple().call({ from: account });
    const currentGrape = await deployed.methods.getGrape().call({ from: account });
    const currentPear = await deployed.methods.getPear().call({ from: account });
    const weiBalance = await web3?.eth.getBalance(account);
    const EthBalance = web3?.utils.fromWei(`${weiBalance}`, "ether");
    const tokenBalnace = await deployed.methods.balanceOf(account).call();
    setApple(currentApple);
    setGrape(currentGrape);
    setPear(currentPear);
    setBalance(EthBalance * 1);
    setTokenBalance(tokenBalnace);
  };

  // 사과구매하기 버튼 실행함수
  const buy = async fruitName => {
    const amount = buyInputRef[fruitName].value;
    const payMethod = selectionRef.current.value;
    switch (fruitName) {
      case "apple":
        if (payMethod === "Eth")
          await deployed.methods.buyApple(amount).send({
            from: account,
            to: CA,
            value: web3.utils.toWei(`${amount * price.apple}`, "ether"),
          });
        if (payMethod === "APL") {
          if (amount * price.apple * 100 > tokenBalance) {
            alert("토큰잔액 부족");
            return;
          }
          await deployed.methods.buyAppleByToken(amount, amount * price.apple * 100).send({
            from: account,
          });
        }
        buyInputRef.apple.value = 1;
        break;
      case "grape":
        await deployed.methods.buyGrape(amount).send({
          from: account,
          to: CA,
          value: web3.utils.toWei(`${amount * price.grape}`, "ether"),
        });
        buyInputRef.grape.value = 1;
        break;
      case "pear":
        await deployed.methods.buyPear(amount).send({
          from: account,
          to: CA,
          value: web3.utils.toWei(`${amount * price.pear}`, "ether"),
        });
        buyInputRef.pear.value = 1;
        break;
      default:
        break;
    }
    fruitsAmountUpdate();
  };

  // 사과 판매하기 버튼 실행함수
  const sell = async fruitName => {
    const priceToWei = web3.utils.toWei(price[fruitName] + "", "ether");
    switch (fruitName) {
      case "apple":
        await deployed.methods.sellApple(priceToWei).send({
          from: account,
          to: CA,
        });
        break;
      case "grape":
        await deployed.methods.sellGrape(priceToWei).send({
          from: account,
          to: CA,
        });
        break;
      case "pear":
        await deployed.methods.sellPear(priceToWei).send({
          from: account,
          to: CA,
        });
        break;
      default:
        break;
    }

    fruitsAmountUpdate();
  };

  useEffect(() => {
    // 즉시실행함수
    (async () => {
      if (!web3) return;
      //  네트워크 아이디
      const networkId = await web3.eth.net.getId();
      // 컨트렉트 조회 인스턴스 객체
      const instance = await new web3.eth.Contract(
        FruitsShopContract.abi,
        // CA값
        FruitsShopContract.networks[networkId].address
      );

      // 인스턴스 객체에서 사과갯수 가져오는 함수 호출
      const currentApple = await instance.methods.getApple().call({ from: account });
      const currentGrape = await instance.methods.getGrape().call({ from: account });
      const currentPear = await instance.methods.getPear().call({ from: account });
      const tokenBalnace = await instance.methods.balanceOf(account).call();
      setApple(currentApple);
      setGrape(currentGrape);
      setPear(currentPear);
      setTokenBalance(tokenBalnace);
      setDeployed(instance);
      setCA(FruitsShopContract.networks[networkId].address);
    })();
  }, [account]);

  // msg.sender값 tx.origin값
  useEffect(() => {
    (async () => {
      console.log(await deployed?.methods.getMsgSender().call());
      console.log(await deployed?.methods.getMsgSender().call({ from: account }));
      console.log(await deployed?.methods.getTxOrigin().call());
    })();
  }, [deployed]);

  return (
    <div className="Wrap">
      <div>
        <div>
          사과한개 가격: {price.apple} Eth, {price.apple * 100} APL
        </div>
        <div>내가 가지고 있는 사과: {apple}개</div>
        <div>
          <input
            type="number"
            ref={input => (buyInputRef.apple = input)}
            min={1}
            defaultValue={1}
          />{" "}
          개
          <select name="" id="" defaultValue={"Eth"} ref={selectionRef}>
            <option value="Eth">Eth</option>
            <option value="APL">APL</option>
          </select>{" "}
          로
          <button onClick={() => buy("apple")} className="buyBtn">
            구매하기
          </button>
        </div>

        <div>사과 판매 가격: {apple * price.apple} Eth</div>
        <button onClick={() => sell("apple")}>사과 전체 판매하기</button>
      </div>
      <div>
        <div>포도한개 가격: {price.grape} Eth</div>
        <div>내가 가지고 있는 포도: {grape}개</div>
        <div>
          <input
            type="number"
            ref={input => (buyInputRef.grape = input)}
            min={1}
            defaultValue={1}
          />{" "}
          개
          <button onClick={() => buy("grape")} className="buyBtn">
            구매하기
          </button>
        </div>

        <div>포도 판매 가격: {grape * price.grape} Eth</div>
        <button onClick={() => sell("grape")}>포도 전체 판매하기</button>
      </div>
      <div>
        <div>배 한개 가격: {price.pear} Eth</div>
        <div>내가 가지고 있는 배: {pear}개</div>
        <div>
          <input type="number" ref={input => (buyInputRef.pear = input)} min={1} defaultValue={1} />{" "}
          개
          <button onClick={() => buy("pear")} className="buyBtn">
            구매하기
          </button>
        </div>

        <div>배 판매 가격: {pear * price.pear} Eth</div>
        <button onClick={() => sell("pear")}>배 전체 판매하기</button>
      </div>
    </div>
  );
};

export default FruitsShop;
