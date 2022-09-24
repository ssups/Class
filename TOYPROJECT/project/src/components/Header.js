import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = ({ isLogined, setIsLogined }) => {
    const location = useLocation();
    const nav = useNavigate();
    function logout() {
        setIsLogined(curruent => !curruent);
        nav(location.pathname);
    }
    return (
        <div className="Header">
            <Link to="/">메인로고</Link>
            {isLogined ? (
                <a onClick={logout}>로그아웃</a>
            ) : (
                <Link to="/login">로그인</Link>
            )}
        </div>
    );
};

export default Header;
