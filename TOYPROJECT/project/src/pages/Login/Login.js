import { React, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Login = ({ setIsLogined, userData, setLoginedUserData }) => {
    const nav = useNavigate();
    const inputId = useRef();
    const inputPw = useRef();
    console.log(userData);
    function checkId(id) {
        const matchingData = userData.filter(el => el.id === id)[0];
        matchingData
            ? checkPw(inputPw.current.value, matchingData)
            : alert("아이디없음");
    }
    function checkPw(inputPw, data) {
        inputPw === data.pw ? success(data) : alert("비밀번호 확인하세요");
    }
    function login() {
        checkId(inputId.current.value);
    }
    function success(data) {
        setIsLogined(curruent => !curruent);
        setLoginedUserData(current => data);
        nav("/");
    }
    return (
        <fieldset className="loginWrap">
            <legend>로그인</legend>
            <div className="loginForm">
                <div className="inputs">
                    <span className="id">
                        아이디: <input type="text" ref={inputId} />
                    </span>
                    <span className="pw">
                        비밀번호: <input type="text" ref={inputPw} />
                    </span>
                </div>
                <button onClick={login}>로그인</button>
            </div>
            <Link to="/join" className="joinLink">
                회원가입
            </Link>
        </fieldset>
    );
};

export default Login;
