import "./App.css";
import { React, useState, useRef, useEffect } from "react";

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
    const [isBetted, setisBetted] = useState(false);
    const [isComAttack, setIsComAttack] = useState(false);
    const [isUserAttack, setIsUserAttack] = useState(false);
    const [caption, setCaption] = useState("배팅금을 설정해주세요~");
    const [captionColor, setCaptionColor] = useState(0);
    const [comMoney, setComMoney] = useState(10000);
    const [userMoney, setUserMoney] = useState(10000);
    const [userColor, setUserColor] = useState("");
    const [comColor, setComColor] = useState("");
    const [betAmount, setBetAmount] = useState(0);
    // selection은 문자로 표기(rock, sissor, paper) postion은 숫자로 표기(1,2,3)
    const [userSelection, setUserSelection] = useState("selection");
    const [comSelection, setComSelection] = useState("selection");
    const [userposition, setUserposition] = useState(0);
    const [composition, setComPosition] = useState(0);
    // useRef는 특정 DOM 셀렉할수 있게 해주는 Hook으로 주로 사용?
    // 콘솔로 찍어보면 얘가 지금 속해있는 App 컴포넌트 안에있는 모든 자식 요소중 하나라도 리렌더링 되는순간
    // App 컴포넌트가 리렌더 되는순간 그때의 current 값을 계속 뱉어냄
    const selectForBet = useRef();
    const interval = useRef();

    // 캡션색깔 변경
    function changeCaptionColor() {
        setCaptionColor(current => (current % 365) + 1);
    }
    // 랜덤이미지돌리기
    // setInterval을 그냥 써버리면 setInterval로 인해 App컴포넌트가 리렌더링되는데 이때 setInterval이 다시 실행되면서 계속 쌓임(졸라많이실행됨)
    // useEffect를 써서 App컴포넌트가 처음 렌더링 될대만 setInterval이 실행되도록 함
    useEffect(() => {
        interval.current = setInterval(comSelect, 100);
        return () => {
            clearInterval(interval.current);
        };
    }, []);

    // 배팅금설정
    function betMoney(e) {
        const currentBetAmount = selectForBet.current.value * 1;
        if (currentBetAmount > userMoney) {
            alert("소지금보다 배팅금이 많습니다");
            return;
        }
        setBetAmount(currentBetAmount);
        setIsOnGame(true);
        setisBetted(true);
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
        setStage(0);
        setIsOnGame(false);
        setisBetted(false);
        setIsComAttack(false);
        setIsUserAttack(false);
        setCaption("배팅금을 설정해주세요~");
        setUserSelection("selection");
        setComSelection("selection");
        setUserposition(0);
        setComPosition(0);
        setUserColor("");
        setComColor("");
        setCaptionColor(0);
    }
    function resetMoney() {
        setComMoney(10000);
        setUserMoney(10000);
        setBetAmount(0);
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
            // 슬롯 멈추고 게임잠시 정지
            clearInterval(interval.current);
            setIsOnGame(false);
            // 슬롯, 게임 다시 재생 (1초뒤에)
            setTimeout(() => {
                interval.current = setInterval(comSelect, 100);
                setIsOnGame(true);
            }, 500);
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
                        setUserMoney(userMoney + betAmount);
                        // 밑에형식처럼 콜백형식으로 써주면 좋은점은
                        // 한번에 여러개의 setState(useState()에서 업데이트시키는 함수)를 사용하면
                        // 모든 setState를 que에 저장했다가 한번에 리렌더링하는데 이때
                        // 콜백형식으로 써준다면 리렌더링이 순서대로 일어나도록 해준다.
                        // 참고로 setState는 비동기로 동작한다.
                        setComMoney(current => current - betAmount);
                        setTimeout(() => {
                            alert("유저 승리!");
                            reset();
                            if (comMoney - betAmount <= 0) {
                                alert("컴퓨터돈 전부소진 유저 최종 승리");
                                resetMoney();
                            }
                        }, 510);
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
                        setUserMoney(userMoney - betAmount);
                        setComMoney(current => current + betAmount);
                        setTimeout(() => {
                            alert("패배~");
                            reset();
                            if (userMoney - betAmount <= 0) {
                                alert("유저돈 전부소진 컴퓨터 최종 승리");
                                resetMoney();
                            }
                        }, 510);
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
        <div
            className="App"
            onClick={select}
            data-stage={stage}
            onMouseMove={changeCaptionColor}>
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
                <h1 style={{ color: `hsl(${captionColor},100%,45%)` }}>
                    {caption}
                </h1>
                <div>
                    <h3>유저돈: {userMoney}</h3>
                    <h3>
                        배팅금:
                        <select ref={selectForBet} disabled={isBetted}>
                            <option value="1000">1000</option>
                            <option value="2000">2000</option>
                            <option value="3000">3000</option>
                            <option value="5000">5000</option>
                        </select>
                        <button disabled={isBetted} onClick={betMoney}>
                            확인
                        </button>
                    </h3>
                    <h3>컴터돈: {comMoney}</h3>
                </div>
            </div>
            <div className={`computerBoxes isAttacker-${isComAttack}`}>
                <span>컴퓨터</span>
                <div className="boxes">
                    {/* {arr.map((el, index) => (
                        <Box
                            divider={index + 1}
                            key={index}
                            player="computer"
                            selection={comSelection}
                            position={composition}
                            color={comColor}
                            isOnGame={true}
                        />
                    ))} */}
                    <Box
                        divider={4}
                        key={5}
                        player="computer"
                        selection={comSelection}
                        position={composition}
                        color={comColor}
                        isOnGame={true}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
