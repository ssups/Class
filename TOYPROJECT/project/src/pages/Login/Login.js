import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ setIsLogined }) => {
    const nav = useNavigate();

    function login() {
        setIsLogined(curruent => !curruent);
        nav("/");
    }
    return (
        <div>
            Login <button onClick={login}>로그인</button>
        </div>
    );
};

export default Login;
