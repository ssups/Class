import { React, useEffect, useRef, useState } from "react";
// import { debounce } from "lodash";

import "./Main.css";

const Main = () => {
    const main = useRef();
    // const [scrollAmount, setScrollAmount] = useState(0);
    const animationBreak = 800;
    let lastTime = 0;

    useEffect(() => {
        // console.log(sections[1]);
        // console.log(box.current.offsetTop);

        const sections = main.current.children;
        const wheelHandler = e => {
            const currentTime = new Date().getTime();
            const isAnimationEnable = currentTime - lastTime > animationBreak;
            // console.log(isAnimationEnable);
            if (!isAnimationEnable) return;
            if (e.deltaY > 0) {
                console.log(sections[1]);
                // sections[1].scrollIntoView({ behavior: "smooth" });
                e.preventDefault();
                console.log("실행");
                console.log(sections[1].offsetTop - 150);
                main.current.scrollTo({
                    top: sections[1].offsetTop - 150,
                    left: 0,
                    behavior: "smooth",
                });
            } else
                main.current.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "smooth",
                });
            lastTime = currentTime;
        };

        main.current.addEventListener("wheel", wheelHandler);
    }, []); //배열에 아무것도 안넣어주면 최초렌더때만 실행

    return (
        <div className="Main" ref={main}>
            <div>Main</div>
            <div>Main</div>
            <div>Main</div>
            <div>Main</div>
            <div>Main</div>
        </div>
    );
};

export default Main;

const s = "sdfwer";
