import React from "react";

const Date = data => {
    const { date, weekend } = data;
    return (
        <span className={"box " + weekend}>
            <h3
                className="date"
                onClick={e => {
                    const memo = prompt("메모를 입력하세요");
                    e.target.querySelector("h4").innerHTML = memo;
                }}>
                {date}일<h4> </h4>
            </h3>
        </span>
    );
};

export default Date;
