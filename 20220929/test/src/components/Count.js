import React from "react";
import { useDispatch } from "react-redux";

const Count = ({ count, setCount }) => {
    // useDispatch 함수를 사용하고
    const dispatch = useDispatch();
    // 반환된 dispatch를 사용해서 Action을 던질수 있다
    // dispatch 함수를 사용하는데 인수로 객체를 넣어줘야 한다.
    // 객체의 규칙은 {type, payload}
    // type: 동작시킬 행동의 이름
    // payload: (선택사항, 없어도 무방) 데이터 전달이 필요하면 사용

    const Add = () => {
        dispatch({ type: "ADD" }); // 요기 인수값이 reducer의 action값으로 들어가는듯?
        // 객체자체를 전달하니깐 객체안에 여러값 집어넣어서 한번에 전달 가능한듯
        setCount(current => current + 1);
    };
    const Remove = () => {
        dispatch({ type: "REMOVE" });
        setCount(current => current - 1);
    };

    return (
        <div>
            <button onClick={Add}>+</button>
            <button onClick={Remove}>-</button>
        </div>
    );
};

export default Count;
