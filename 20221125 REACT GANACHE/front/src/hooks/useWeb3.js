import React, { useEffect, useState } from "react";
import Web3 from "web3/dist/web3.min";

const useWeb3 = () => {
  // 메타마스크에서 사용하고있는 계정
  const [account, setAccount] = useState(null);
  // 클라이언트랑 메타마스크를 통신시켜줄 web3
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    // async 즉시실행 함수
    (async () => {
      // 메타마스크가 설치되어있는지 확인하는거 (설치안돼있으면 return 탄다)
      if (!window.ethereum) {
        alert("메타마스크를 설치하세요");
        return;
      }

      // 메타마스크에 연결되어있는 계정을 가져옴
      // 메타마스크 연결될때까지 await 상태로 기다림
      // 연결되면 address값에 할당시키고 밑에줄들 실행시킴
      const [address] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      // account값 address 받아온걸로 update
      setAccount(address);
      const web3 = new Web3(window.ethereum);
      setWeb3(web3);
    })();
  }, []);
  return [web3, account];
};

export default useWeb3;
