import "./App.css";
// useRef는 특정 DOM 셀렉할수 있게 해주는 Hook
import { React, useState, useRef } from "react";

function Box(data) {
    const { position, player, selection, divider, color, isOnGame } = data;
    let classForImg, datasetForPos, colorForSelectedBox;
    // 박스 구분시킬 class 및 attribute 설정
    switch (divider) {
        case 1:
            classForImg = "rock choose";
            break;
        case 2:
            classForImg = "sissor choose";
            break;
        case 3:
            classForImg = "paper choose";
            break;
        default: //셀렉트 박스
            classForImg = selection;
            datasetForPos = position;
            colorForSelectedBox = { backgroundColor: color };
            break;
    }

    return (
        <div
            data-divider={divider}
            data-position={datasetForPos}
            className={`box ${classForImg} ${player} isOnGame-${isOnGame}`}
            style={colorForSelectedBox}></div>
    );
}

function App() {
    const arr = Array(4).fill();
    const [stage, setStage] = useState(0);
    const [isOnGame, setIsOnGame] = useState(false);
    const [isComAttack, setIsComAttack] = useState(false);
    const [isUserAttack, setIsUserAttack] = useState(false);
    const [caption, setCaption] = useState("배팅금을 설정해주세요~");
    const [comMoney, setComMoney] = useState(10000);
    const [userMoney, setUserMoney] = useState(10000);
    const [userColor, setUserColor] = useState("none");
    const [comColor, setComColor] = useState("none");
    const [betAmount, setBetAmount] = useState("0");
    // selection은 문자로 표기(rock, sissor, paper) postion은 숫자로 표기(1,2,3)
    const [userSelection, setUserSelection] = useState("selection");
    const [comSelection, setComSelection] = useState("selection");
    const [userposition, setUserposition] = useState(0);
    const [composition, setComPosition] = useState(0);
    const selectForBet = useRef();

    // 배팅금설정
    function betMoney(e) {
        setBetAmount(selectForBet.current.value * 1);
        setIsOnGame(true);
        setCaption("가위 바위~ 보");
    }
    // 컴퓨터 랜덤포지션
    function comSelect() {
        const comPosition = Math.floor(Math.random() * 3 + 1);
        const comSelection =
            comPosition === 1 ? "rock" : comPosition === 2 ? "sissor" : "paper";
        setComPosition(comPosition);
        setComSelection(comSelection);
        return comPosition;
    }
    // 가위바위보 결과값
    function return_RSP_result(userPosition, comPosition) {
        // 비겼으면 0 유저가 이겼으면 1 컴퓨터가 이겼으면 2
        let result;
        result = userPosition === comPosition ? 0 : returnElseResult();
        function returnElseResult() {
            const elseResult =
                userPosition === 1
                    ? comPosition === 2
                        ? 1
                        : 2
                    : userPosition === 2
                    ? comPosition === 1
                        ? 2
                        : 1
                    : comPosition === 1
                    ? 1
                    : 2;
            return elseResult;
        }
        return result;
    }
    // 리셋
    function reset() {
        setUserSelection("selection");
        setComSelection("selection");
        setUserposition(0);
        setComPosition(0);
        setStage(0);
        setUserColor("");
        setComColor("");
        setIsOnGame(false);
        setCaption("배팅금을 설정해주세요~");
        setIsComAttack(false);
        setIsUserAttack(false);
    }
    // 가위바위보 고르기
    function select(e) {
        const boxClassLi = e.target.classList;
        if (
            boxClassLi.contains("choose") &&
            boxClassLi.contains("user") &&
            isOnGame
        ) {
            const selectedPos = e.target.dataset.divider * 1;
            const userSelection = boxClassLi[1];
            const comPosition = comSelect();
            const RSP_result = return_RSP_result(selectedPos, comPosition);
            setUserSelection(userSelection);
            setUserposition(selectedPos);
            let colorCount = Math.floor(Math.random() * 12 + 1) * 30;
            setUserColor(`hsl(${colorCount},100%,50%)`);
            colorCount = Math.floor(Math.random() * 12 + 1) * 30;
            setComColor(`hsl(${colorCount},100%,50%)`);
            setIsComAttack(
                RSP_result === 1 ? false : RSP_result === 2 ? true : false
            );
            setIsUserAttack(
                RSP_result === 1 ? true : RSP_result === 2 ? false : false
            );
            let stage =
                e.target.parentNode.parentNode.parentNode.dataset.stage * 1;
            //stage 0은 가위바위보 1은 묵찌빠(유저공격) 2는 묵찌빠(컴터공격)
            switch (stage) {
                case 0:
                    setStage(RSP_result);
                    setCaption(
                        RSP_result === 1
                            ? "유저 공격! 묵~찌!"
                            : RSP_result === 2
                            ? "컴퓨터 공격! 묵~찌!"
                            : "다시! 가위 바위 보~"
                    );
                    break;
                case 1:
                    if (RSP_result === 0) {
                        setTimeout(() => {
                            alert("유저 승리!");
                            setUserMoney(userMoney + betAmount);
                            setComMoney(current => current - betAmount);
                            reset();
                        }, 10);
                    } else {
                        setStage(RSP_result);
                        setCaption(
                            RSP_result === 1
                                ? "유저 공격! 묵~찌!"
                                : "컴퓨터 공격! 묵~찌!"
                        );
                    }
                    break;
                case 2:
                    if (RSP_result === 0) {
                        console.log(betAmount);
                        setTimeout(() => {
                            alert("패배~");
                            setUserMoney(userMoney - betAmount);
                            setComMoney(current => current + betAmount);
                            reset();
                        }, 10);
                    } else {
                        setStage(RSP_result);
                        setCaption(
                            RSP_result === 1
                                ? "유저 공격! 묵~찌!"
                                : "컴퓨터 공격! 묵~찌!"
                        );
                    }
                    break;
                default:
                    break;
            }
        }
    }

    return (
        <div className="App" onClick={select} data-stage={stage}>
            <div className={`userBoxes isAttacker-${isUserAttack}`}>
                <span>유저</span>
                <div className="boxes">
                    {arr.map((el, index) => (
                        <Box
                            divider={index + 1}
                            key={index}
                            player="user"
                            selection={userSelection}
                            position={userposition}
                            color={userColor}
                            isOnGame={isOnGame}
                        />
                    ))}
                </div>
            </div>
            <div className="textDom">
                <h1>{caption}</h1>
                <div>
                    <h3>컴터돈: {comMoney}</h3>
                    <h3>
                        배팅금:
                        <select ref={selectForBet} disabled={isOnGame}>
                            <option value="1000">1000</option>
                            <option value="2000">2000</option>
                            <option value="3000">3000</option>
                            <option value="5000">5000</option>
                        </select>
                        <button disabled={isOnGame} onClick={betMoney}>
                            확인
                        </button>
                    </h3>
                    <h3>유저돈: {userMoney}</h3>
                </div>
            </div>
            <div className={`computerBoxes isAttacker-${isComAttack}`}>
                <span>컴퓨터</span>
                <div className="boxes">
                    {arr.map((el, index) => (
                        <Box
                            divider={index + 1}
                            key={index}
                            player="computer"
                            selection={comSelection}
                            position={composition}
                            color={comColor}
                            isOnGame={isOnGame}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
