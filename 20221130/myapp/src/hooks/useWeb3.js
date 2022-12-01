import React, { useEffect, useState } from "react";
import Web3 from "web3/dist/web3.min";

const useWeb3 = () => {
  // 주소 담을 상태값
  const [account, setAccount] = useState(null);
  // web3 객체담을 상태값
  const [web3, setWeb3] = useState(null);

  const getRequestAccount = async () => {
    // 연결된 계정 주소 가져오기 연결된 계정이 없다면
    // 연결시도 eth_requestAccounts 함수 실행
    const [account] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    return account;
  };

  useEffect(() => {
    // async 즉시실행 함수
    (async () => {
      // 메타마스크가 설치되어있는지 확인하는거 (설치안돼있으면 return 탄다)
      if (!window.ethereum) {
        alert("메타마스크를 설치하세요");
        return;
      }
      // 연결된 주소 가져오고
      const account = await getRequestAccount();
      //   web3 객체 만들어주고
      const web3 = new Web3(window.ethereum);
      setAccount(account);
      setWeb3(web3);
    })();
  }, []);
  return [web3, account, setAccount];
};

export default useWeb3;
