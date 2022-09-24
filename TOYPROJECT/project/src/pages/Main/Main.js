import { React, useEffect, useRef, useState } from "react";
// import { debounce } from "lodash";

import "./Main.css";

const Main = () => {
    const main = useRef();
    const [scrollY, setScrollY] = useState(0);
    function slide(e) {
        // console.log("실행");
        // console.log(e.target.onwheel);
        // console.log(main.onwheel);
        // const moveAmount = e.target.offsetHeight;
        // const isScrollUp = e.deltaY > 0 ? true : false;
        // setScrollY(current =>
        //     isScrollUp ? current + moveAmount : current - moveAmount
        // );
        setScrollY(window.scrollY);
    }
    useEffect(() => {
        console.log(scrollY);
        // window.scrollTo({ top: scrollY, behavior: "smooth" });
        window.scrollIntoView({ top: scrollY, behavior: "smooth" });
    }, [scrollY]);

    return (
        <div className="Main" ref={main} onWheel={slide}>
            <div>Main</div>
            <div>Main</div>
            <div>Main</div>
            <div>Main</div>
            <div>Main</div>
        </div>
    );
};

export default Main;
