import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";

const CountView = ({ count }) => {
    // 저장소의 값을 가져와 보자
    const count2 = useSelector(state => state.count); //reducer 안에있는 state값 불러오는거
    // useSelector 함수를 콜백으로 리듀스 폴더안에 있는 index.js에 작성한 state 값을 받을 수 있다.
    return (
        <div>
            <div> count1: {count}</div>
            <div> count2: {count2}</div>
        </div>
    );
};

export default CountView;
