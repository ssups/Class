import React, { useEffect, useRef, useState } from "react";

const TokenTrade = () => {
  const [isEthBase, setIsEthBase] = useState(true);
  const [tradeAmount, setTradeAmount] = useState(0.1);

  function onChange(e) {
    setTradeAmount(e.target.value);
  }

  //   function tradeToken(){

  //   }

  useEffect(() => {
    setTradeAmount(isEthBase ? 0.1 : 10);
  }, [isEthBase]);
  return (
    <div
      style={{
        width: "700px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1> TokenTrade</h1>
      <div>
        <button
          onClick={() => {
            setIsEthBase(current => !current);
          }}
        >
          {isEthBase ? "토큰을 이더로" : "이더를 토큰으로"}
        </button>
        <button style={{ marginLeft: "20px" }}>교환</button>
      </div>
      <div>
        <input
          type="number"
          min={0}
          disabled={!isEthBase}
          onChange={onChange}
          step={0.1}
          value={isEthBase ? tradeAmount : tradeAmount / 100}
        />
        ETH
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>{isEthBase ? "⬇️" : "⬆️"}</div>
      <div>
        <input
          type="number"
          min={0}
          disabled={isEthBase}
          onChange={onChange}
          step={10}
          value={isEthBase ? tradeAmount * 100 : tradeAmount}
        />
        APL
      </div>
    </div>
  );
};

export default TokenTrade;
