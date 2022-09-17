import { React, useState } from "react";
const Box = data => {
    const { isBomb, isClicked } = data;
    const [state, setstate] = useState(isClicked);
    let [isFailed, setfail] = useState("no");
    function click(e) {
        setstate("true");
        if (e.target.children[0].classList.contains("bomb") === true) {
            setfail("yes");
            const all = document.querySelectorAll(".false");
            all.forEach(el => {
                el.classList.add("true");
            });
            setTimeout(() => {
                alert("실패");
            }, 10);
        }
    }

    return (
        <span className={"box "} onClick={click}>
            <span className={state + " " + isBomb}></span>
        </span>
    );
};

export default Box;
