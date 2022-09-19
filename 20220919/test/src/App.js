import { useState } from "react";
import "./App.css";
// import BlockFn from "./BlockFn";
// import BlockClass from "./BlockClass";
import Block from "./Block";
import { img01, img02, img03 } from "./img";
function App() {
    const select = {
        scissor: {
            name: "가위",
            img: img01,
        },
        rock: {
            name: "바위",
            img: img02,
        },
        paper: {
            name: "보",
            img: img03,
        },
    };

    // 유저가 선택한 값을 담아놓고 업데이트
    // 유저의 선택 값을 담을 useState
    const [userSelect, setUserSelect] = useState(null);
    // 컴퓨터의 랜덤 값을 담을 useState
    const [comSelect, setComSelect] = useState(null);
    // 승패의 값을 담을 useState
    const [result, setResult] = useState(null);
    function userClick(temp) {
        setUserSelect(select[temp]);
        // 컴퓨터 선택값을 위한 배열은 select 객체에서 키값만 뽑아서 만들자
        let arr = Object.keys(select);
        const randNum = Math.floor(Math.random() * 3);
        setComSelect(select[arr[randNum]]);
        // 결과를 가지고 승패를 보여준다.
        let player = select[temp];
        let computer = select[arr[randNum]];
        if (player.name === computer.name) setResult("무승부");
        else {
            switch (player.name) {
                case "가위":
                    setResult(computer.name === "바위" ? "졌다" : "이겼다");
                    break;
                case "바위":
                    setResult(computer.name === "가위" ? "이겼다" : "졌다");
                    break;
                case "보":
                    setResult(computer.name === "바위" ? "이겼다" : "졌다");
                    break;
                default:
                    break;
            }
        }
    }

    // 1. 우리가 만들어놓은 객체의 값이 필요하기 때문에 userClick 함수를 만들었고
    // 그 값을 저장해주는 userSelect변수를 useState 함수를 통해서 만들어줌

    // 2. 버튼을 클릭했을때 그 함수가 실행이 되고 state값이 변하기 때문에 리렌더링 된다.
    // 부모가 리렌더링 됐으니깐 자식 컴포넌트도 리렌더링된다.ㅣ

    // Block에 우리는 userClick을 실행하고 setUserSelect함수로 변경한
    // userSelect 값을 props로 넘겨줬다.

    // Block에서는 props로 넘겨받은 값을 사용해서 img의 경로를 받아서 이미지를 보여줬따.
    // 부모가 리렌더링 됐기때문에 자식도 변한 값이 리렌더링 된것.ㅣ

    return (
        <div className="App">
            <div className="boxes">
                <Block data={userSelect} name="user" test={result} />
                <Block data={comSelect} name="com" test={result} />
            </div>
            <div>
                <button onClick={() => userClick("scissor")}>가위</button>
                <button onClick={() => userClick("rock")}>바위</button>
                <button onClick={() => userClick("paper")}>보</button>
            </div>
            {/* <div>
                <h3>{result}</h3>
            </div> */}
        </div>
    );
}

export default App;
