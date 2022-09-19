import React, { useEffect, useState } from "react";

const BlockFn = () => {
    const [num, setNum] = useState(0);
    const [num2, setNum2] = useState(0);

    useEffect(() => {
        // 두번째 인수에 빈배열 넣으면 BlockFn 컴포넌트가 렌더될때 최초 한번만 실행되는 함수
        // 즉 componentDidMount 역할을 한다.
        console.log("componentDidMount");
    }, []);

    useEffect(() => {
        // 두번째 인수 배열안 요소를 state값으로 넣으면 해당 state의 값이 업데이트되면 실행되는 함수
        // 즉 componentDidUpdate 역할을 한다.
        // 그런데 살짝 모잘라서 컴포넌트 첫 렌더때도 실행된다. 그래서 조건으로 최초실행을 막아줘야한다.
        console.log("componentDidUpdate");
        console.log(num);
    }, [num, num2]);

    const add = () => {
        setNum(num + 1);
        setNum2(777);
    };

    return (
        <div>
            <button onClick={add}>증가</button>
        </div>
    );
};

export default BlockFn;
