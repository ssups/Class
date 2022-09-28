import { React, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Join.css";
const Join = ({ userData, setUserData }) => {
    const nav = useNavigate();
    const inputId = useRef();
    const inputNickName = useRef();
    const inputPw = useRef();
    const [joinBtnOff, setJoinBtnOff] = useState(true);
    function cancle() {
        nav("/");
    }
    // 빈칸검사
    function onInput() {
        inputId.current.value !== "" &&
        inputNickName.current.value !== "" &&
        inputPw.current.value !== ""
            ? setJoinBtnOff(current => false)
            : setJoinBtnOff(current => true);
    }
    // 회원가입클릭
    function onClick() {
        let isOverlapped = false;
        userData.forEach(el => {
            if (el.id === inputId.current.value) {
                alert("아이디 중복");
                isOverlapped = true;
            }
            if (el.nick_name === inputNickName.current.value) {
                alert("닉네임 중복");
                isOverlapped = true;
            }
        });
        if (!isOverlapped) {
            addData(
                inputId.current.value,
                inputNickName.current.value,
                inputPw.current.value
            );
        }
    }
    // input칸 리셋
    function reset() {
        inputId.current.value = "";
        inputNickName.current.value = "";
        inputPw.current.value = "";
    }
    // 유저데이타 배열에 인풋값 추가
    function addData(id, nick_name, pw) {
        setUserData(current =>
            current.concat({
                id,
                nick_name,
                pw,
            })
        );
        reset();
        // 로그인페이지로 보내기
        nav("/login");
    }
    // useEffect(() => {
    //     console.log(userData);
    // }, [userData]);
    return (
        <fieldset className="joinWrap">
            <legend>회원가입</legend>
            <div className="joinForm">
                <div className="inputs">
                    <span>
                        아이디:{" "}
                        <input type="text" ref={inputId} onInput={onInput} />
                    </span>
                    <span>
                        닉네임:{" "}
                        <input
                            type="text"
                            ref={inputNickName}
                            onInput={onInput}
                        />
                    </span>
                    <span>
                        비밀번호:{" "}
                        <input
                            type="password"
                            ref={inputPw}
                            onInput={onInput}
                        />
                    </span>
                </div>
                <div className="buttons">
                    <button onClick={onClick} disabled={joinBtnOff}>
                        회원가입
                    </button>
                    <button onClick={cancle}>취소</button>
                </div>
            </div>
        </fieldset>
    );
};

export default Join;
