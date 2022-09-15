import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root")); // 최초의 전체를 감싸는 dom 하나는 들고와줘야함

root.render(
    // 최초로 만든 html dom인 root dom 안에 render로 다른 컴포넌트들을 계속해서 넣어준다
    // React.StrictMode 오류나 로그를 띄워주는 아이 (엄격모드?) , 콘솔도 2번 찍어줌

    <App />
);
reportWebVitals();
