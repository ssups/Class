import { useEffect, useState } from "react";
import "./App.css";
import FruitsShop from "./components/FruitsShop";
import TokenTrade from "./components/TokenTrade";
import useWeb3 from "./hooks/useWeb3";

function App() {
  // 커스텀훅에서 web3, account 가져오고
  const [web3, account, setAccount] = useWeb3();
  const [balance, setBalance] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);

  useEffect(() => {
    // 지갑바꼇을때 발생시킬 이벤트
    window.ethereum.on("accountsChanged", async () => {
      const [switchedAccount] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(switchedAccount);
    });
    return () => {
      // window.ethereum._events.accountsChanged &&
      //   window.ethereum.removeEventListener("accountsChanged");
      delete window.ethereum._events["accountsChanged"];
    };
  }, []);

  useEffect(() => {
    (async () => {
      const weiBalance = await web3?.eth.getBalance(account);
      const EthBalance = web3?.utils.fromWei(`${weiBalance}`, "ether");
      setBalance(EthBalance * 1);
    })();
  }, [web3, account]);

  if (!account) return <h1>메타마스크를 연결해 주세요</h1>;
  return (
    <div className="App">
      <h1>지갑주소 : {account}</h1>
      <h2>잔액 : {balance?.toFixed(2)} Eth</h2>
      <h2>APL 토큰 잔액: {(tokenBalance / 10 ** 18)?.toFixed(0)} APL</h2>
      <h2 style={{ width: 700, textAlign: "center" }}>과일구매 앱</h2>
      <FruitsShop
        web3={web3}
        account={account}
        tokenBalance={tokenBalance}
        setTokenBalance={setTokenBalance}
        setBalance={setBalance}
      />
      <TokenTrade />
    </div>
  );
}

export default App;
