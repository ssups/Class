import { React, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./MyPage.css";

const MyPage = ({ setPostData }) => {
    const nav = useNavigate();
    const [isPwChecked, setIsPwChecked] = useState(false);
    const [modifyBtnOff, setModifyBtnOff] = useState(true);
    const pwForCheck = useRef();
    const inputNickName = useRef();
    const inputPw = useRef();
    const dispatch = useDispatch();
    const userData = useSelector(state => state.userData);
    const loginedUserData = useSelector(state => state.loginedUserData);
    // console.log(userData);
    // 비밀번호 확인
    function checkPw() {
        const pw = pwForCheck.current.value;
        if (!pwForCheck.current.value) {
            alert("비밀번호를 입력하세요");
            return;
        }
        loginedUserData.pw === pw
            ? setIsPwChecked(current => !current)
            : alert("비밀번호 확인하세요");
    }
    // 빈칸검사
    function onInput() {
        inputNickName.current.value !== "" && inputPw.current.value !== ""
            ? setModifyBtnOff(current => false)
            : setModifyBtnOff(current => true);
    }
    // input reset
    function reset() {
        inputNickName.current.value = "";
        inputPw.current.value = "";
    }
    // 회원정보 수정
    function onClick() {
        let isOverlapped = false;
        userData.forEach(el => {
            if (
                el.nick_name === inputNickName.current.value &&
                el.nick_name !== loginedUserData.nick_name
            ) {
                alert("닉네임 중복");
                isOverlapped = true;
            }
        });
        if (!isOverlapped)
            modifyData(inputNickName.current.value, inputPw.current.value);
    }
    // 바꾼정보 적용
    function modifyData(nick_name, pw) {
        dispatch({
            type: "MODIFY_USER_DATA",
            payload: userData.map(eachData =>
                eachData.id === loginedUserData.id
                    ? { id: loginedUserData.id, nick_name, pw }
                    : eachData
            ),
        });
        setPostData(current =>
            current.map(el => {
                if (el.nick_name === loginedUserData.nick_name) {
                    el.nick_name = nick_name;
                }
                return el;
            })
        );
        reset();
        // 로그인 풀기
        dispatch({ type: "LOGOUT" });
        // 로그인페이지로 보내기
        nav("/login");
    }
    // 취소버튼
    function cancle() {
        setIsPwChecked(current => !current);
    }
    return (
        <div className="MyPage">
            {isPwChecked ? (
                <fieldset className="joinWrap">
                    <legend>회원정보수정</legend>
                    <div className="joinForm">
                        <div className="inputs">
                            <span>
                                닉네임:{" "}
                                <input
                                    type="text"
                                    ref={inputNickName}
                                    onInput={onInput}
                                    defaultValue={loginedUserData.nick_name}
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
                            <button onClick={onClick} disabled={modifyBtnOff}>
                                수정완료
                            </button>
                            <button onClick={cancle}>취소</button>
                        </div>
                    </div>
                </fieldset>
            ) : (
                <div className="pwCheckBox">
                    <span>
                        비밀번호 : <input type="password" ref={pwForCheck} />
                        <button onClick={checkPw}>확인</button>
                    </span>
                </div>
            )}
        </div>
    );
};

export default MyPage;
