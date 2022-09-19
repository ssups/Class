import React from "react";

const Block = props => {
    let { data, name, test } = props;
    let result;
    switch (test) {
        case "이겼다":
            result = name === "com" ? "졌다" : test;
            break;
        case "졌다":
            result = name === "com" ? "이겼다" : test;
            break;
        default:
            result = test;
            break;
    }

    return (
        <div className="Block">
            {/* 선택한 이미지를 porps값으로 받아온다 */}

            {/* and 연산자 => 값이 있으면 data.img를 넣어라 (값 없을때 오류뜨는거 방지용) */}
            <img src={data && data.img} alt={data && data.name} />
            <div>{result}</div>
        </div>
    );
};
export default Block;
