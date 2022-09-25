import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = ({ isLogined, setIsLogined, loginedUserData }) => {
    const location = useLocation();
    const nav = useNavigate();
    function logout() {
        setIsLogined(curruent => !curruent);
        nav(location.pathname);
    }
    function write() {
        nav("/posting");
    }
    function clickMyPage() {
        isLogined ? nav("/mypage") : nav("/login");
    }
    return (
        <div className="Header">
            <div className="HeaderContents">
                <span className="logo">
                    <Link to="/">메인로고</Link>
                </span>
                <span className="menu">
                    <a onClick={clickMyPage}>마이페이지</a>
                    <Link to="/board">게시판</Link>
                </span>
                <span className="attributes">
                    {isLogined ? (
                        <>
                            <span className="welcomeMsg">
                                {loginedUserData.nick_name} 님 환영합니다
                            </span>
                            <span className="btns">
                                <a onClick={logout}>로그아웃</a>
                                <a onClick={write}>글쓰기</a>
                            </span>
                        </>
                    ) : (
                        <Link to="/login">로그인</Link>
                    )}
                </span>
            </div>
        </div>
    );
};

export default Header;
